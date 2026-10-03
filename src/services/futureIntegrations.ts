/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TeacherRequest, GeneratedResource } from '../types';

/**
 * FUTURE-READY ARCHITECTURE PLACEHOLDERS
 * 
 * In this MVP proof-of-concept, generation is handled locally and deterministically.
 * These interfaces and service stubs are pre-architected for production integrations:
 * 1. Gemini structured JSON output with schema validation
 * 2. Firebase Authentication (Auth tokens & teacher profile)
 * 3. Firestore saved resources & offline cache
 * 4. PDF/DOCX server-side rendering
 * 5. Google Classroom / Google Docs export
 * 6. Regional language generation (NCERT regional curricula)
 * 7. Curriculum knowledge base vector store
 * 8. Pre- and post-assessment skill mapping
 */

export interface GeminiStructuredGenerationConfig {
  modelName: 'gemini-2.5-flash' | 'gemini-2.5-pro';
  temperature: number;
  responseMimeType: 'application/json';
  responseSchema?: Record<string, unknown>;
}

export interface FirebasePersistenceAdapter {
  saveResource(userId: string, resource: GeneratedResource): Promise<{ resourceId: string; timestamp: number }>;
  listTeacherResources(userId: string): Promise<GeneratedResource[]>;
  deleteResource(userId: string, resourceId: string): Promise<boolean>;
}

export interface DocumentExportService {
  exportToGoogleDocs(resource: GeneratedResource, accessToken: string): Promise<{ documentUrl: string }>;
  exportToDocx(resource: GeneratedResource): Promise<Blob>;
  exportToPdf(resource: GeneratedResource): Promise<Blob>;
}

export interface CurriculumKnowledgeBase {
  lookupCompetencies(stage: string, subject: string, topic: string): Promise<Array<{ code: string; text: string; source: string }>>;
  searchLearningOutcomes(grade: string, subject: string, keywords: string[]): Promise<string[]>;
}

export interface SkillMappingEngine {
  mapPreAssessmentToPrerequisites(topic: string, grade: string): Promise<string[]>;
  trackSkillMastery(studentCohortId: string, competencyId: string, rubricLevel: number): Promise<void>;
}

/**
 * Service placeholder for Gemini API structured output (future activation)
 */
export class GeminiGeneratorService {
  static isAvailable(): boolean {
    return false; // Disabled in MVP PoC per specifications
  }

  static async generateResource(req: TeacherRequest, _config?: Partial<GeminiStructuredGenerationConfig>): Promise<GeneratedResource> {
    throw new Error('Gemini live generation is disabled in this MVP PoC. Local mock generator is active.');
  }
}

/**
 * Service placeholder for Google Workspace / Cloud exports (future activation)
 */
export class CloudExportService {
  static isAvailable(): boolean {
    return false; // Disabled in MVP PoC
  }

  static async exportToClassroom(_resource: GeneratedResource): Promise<void> {
    throw new Error('Google Classroom export is planned for Phase 2.');
  }
}
