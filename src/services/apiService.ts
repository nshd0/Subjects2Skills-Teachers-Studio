/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TeacherRequest, GeneratedResource } from '../types';
import { generateMockResource, sectionVariants } from './mockGenerator';

export const FALLBACK_NOTICE = 'AI customisation is temporarily unavailable. Showing the local rule-based template.';

export interface GenerationResponse {
  resource: GeneratedResource;
  usedFallback: boolean;
  statusType: 'gemini_success' | 'local_fallback' | 'api_unavailable' | 'malformed_response';
  notice?: string;
}

/**
 * Generate resource via server-side Gemini structured output API
 * with automatic fallback to local deterministic generator
 */
export async function requestResourceGeneration(req: TeacherRequest): Promise<GenerationResponse> {
  try {
    const res = await fetch('/api/generate-resource', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });

    if (!res.ok) {
      const fallbackResource = generateMockResource(req);
      return {
        resource: fallbackResource,
        usedFallback: true,
        statusType: 'api_unavailable',
        notice: FALLBACK_NOTICE,
      };
    }

    const data = await res.json();
    if (!data || !data.resource) {
      const fallbackResource = generateMockResource(req);
      return {
        resource: fallbackResource,
        usedFallback: true,
        statusType: 'malformed_response',
        notice: FALLBACK_NOTICE,
      };
    }

    return {
      resource: data.resource,
      usedFallback: Boolean(data.usedFallback),
      statusType: data.usedFallback ? 'local_fallback' : 'gemini_success',
      notice: data.usedFallback ? FALLBACK_NOTICE : (data.fallbackReason || undefined),
    };
  } catch {
    // Network or server failure
    const fallbackResource = generateMockResource(req);
    return {
      resource: fallbackResource,
      usedFallback: true,
      statusType: 'api_unavailable',
      notice: FALLBACK_NOTICE,
    };
  }
}

/**
 * Regenerate a single section via server Gemini API with fallback to local variants
 */
export async function requestSectionRegeneration(
  sectionKey: string,
  request: TeacherRequest,
  currentValue?: any,
  fallbackIndex = 0
): Promise<{ updatedContent: any; usedFallback: boolean }> {
  try {
    const res = await fetch('/api/regenerate-section', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sectionKey,
        request,
        currentValue,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.updatedContent && !data.usedFallback) {
        return { updatedContent: data.updatedContent, usedFallback: false };
      }
    }
  } catch {
    // Silently fall through to local variants
  }

  // Fallback to rotating local mock variant pool
  const list = sectionVariants[sectionKey] || [];
  if (list.length > 0) {
    const nextIdx = (fallbackIndex + 1) % list.length;
    return { updatedContent: list[nextIdx], usedFallback: true };
  }

  return { updatedContent: currentValue, usedFallback: true };
}
