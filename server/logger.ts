/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RequestLogEntry {
  timestamp: string;
  stage?: string;
  grade?: string;
  subject?: string;
  duration?: string;
  resourceType?: string;
  action: 'generate_full' | 'regenerate_section';
  sectionKey?: string;
  status: 'success' | 'repaired' | 'fallback' | 'error';
  latencyMs: number;
  model: string;
  errorReason?: string;
}

/**
 * Privacy-safe logger that strictly avoids logging:
 * - Teacher-entered topic text
 * - Freeform prompt notes
 * - Personal names or emails
 * - Student data or generated outputs
 */
export function logServerRequest(entry: RequestLogEntry) {
  const logMessage = JSON.stringify({
    tag: 'Subjects2Skills_Telemetry',
    timestamp: entry.timestamp,
    stage: entry.stage || 'N/A',
    grade: entry.grade || 'N/A',
    subject: entry.subject || 'N/A',
    duration: entry.duration || 'N/A',
    resourceType: entry.resourceType || 'N/A',
    action: entry.action,
    sectionKey: entry.sectionKey || 'none',
    status: entry.status,
    latencyMs: entry.latencyMs,
    model: entry.model,
    errorReason: entry.errorReason || null,
  });

  console.log(`[AUDIT_LOG] ${logMessage}`);
}
