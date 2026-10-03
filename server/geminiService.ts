/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from '@google/genai';
import { TeacherRequest, GeneratedResource } from '../src/types';
import { validateAndRepairGeneratedOutput } from './validator';
import { generateMockResource } from '../src/services/mockGenerator';
import { logServerRequest } from './logger';

// Selected standard model per gemini-api guidelines
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

let genAIInstance: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!genAIInstance) {
    genAIInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIInstance;
}

/**
 * Common system instruction adhering to NEP 2020 & NCF-SE 2023 pedagogical guidelines
 */
const SYSTEM_INSTRUCTION = `You are Subjects2Skills Teacher Studio, a planning engine for Indian K-12 educators.
You produce concise, competency-based classroom materials aligned with NEP 2020 and NCF-SE 2023 principles.

CRITICAL RULES:
1. All curricular suggestions must be labeled: "Suggested — teacher review required".
2. Never claim official endorsement, official CBSE/NCERT certification, or government approval.
3. Keep the entire response under 900 words. Use short, practical bullets. No verbose education jargon.
4. STRICT LIMITS:
   - Maximum 3 learning outcomes (observable verbs).
   - Maximum 3 prior-learning check prompts.
   - Maximum 3 tasks per differentiation band (support, core, extension).
   - Maximum 3 teacher questions (recall, reasoning, transfer).
   - Maximum 3 rubric criteria with 4 levels (Beginning, Developing, Secure, Extending).
5. Ground all activities in low-cost, locally available everyday Indian materials (chalkboard, steel spoons, earthen pots, paper slips, courtyard sunlight, water cups).
6. Always include a 100% offline, zero-device, low-tech alternative.
7. NEVER ask for or collect student personal data (no names, marks, roll numbers, photos, phone numbers).
8. Ensure classroom safety: no boiling water, no toxic chemicals, no open fires.`;

// Schema definition for Lesson Plan
const lessonPlanSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    suggestedCurricularGoal: { type: Type.STRING },
    suggestedCompetency: { type: Type.STRING },
    learningOutcomes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    priorLearningCheck: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    learningSequence: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.STRING },
          duration: { type: Type.STRING },
          teacherAction: { type: Type.STRING },
          studentAction: { type: Type.STRING },
        },
        required: ['step', 'duration', 'teacherAction', 'studentAction'],
      },
    },
    experientialActivity: { type: Type.STRING },
    differentiatedTasks: {
      type: Type.OBJECT,
      properties: {
        support: { type: Type.ARRAY, items: { type: Type.STRING } },
        core: { type: Type.ARRAY, items: { type: Type.STRING } },
        extension: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['support', 'core', 'extension'],
    },
    questioningPrompts: {
      type: Type.OBJECT,
      properties: {
        recall: { type: Type.STRING },
        reasoning: { type: Type.STRING },
        transfer: { type: Type.STRING },
      },
      required: ['recall', 'reasoning', 'transfer'],
    },
    formativeAssessment: {
      type: Type.OBJECT,
      properties: {
        observationChecklistItem: { type: Type.STRING },
        exitTicketQuestion: { type: Type.STRING },
        feedbackSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['observationChecklistItem', 'exitTicketQuestion'],
    },
    rubric: {
      type: Type.OBJECT,
      properties: {
        competency: { type: Type.STRING },
        criteria: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              criterion: { type: Type.STRING },
              beginning: { type: Type.STRING },
              developing: { type: Type.STRING },
              secure: { type: Type.STRING },
              extending: { type: Type.STRING },
            },
            required: ['criterion', 'beginning', 'developing', 'secure', 'extending'],
          },
        },
      },
      required: ['competency', 'criteria'],
    },
    lowTechAlternative: { type: Type.STRING },
    teacherReflectionPrompt: { type: Type.STRING },
    safetyOrInclusionNote: { type: Type.STRING },
  },
  required: [
    'title',
    'suggestedCurricularGoal',
    'suggestedCompetency',
    'learningOutcomes',
    'priorLearningCheck',
    'learningSequence',
    'experientialActivity',
    'differentiatedTasks',
    'questioningPrompts',
    'formativeAssessment',
    'rubric',
    'lowTechAlternative',
    'teacherReflectionPrompt',
    'safetyOrInclusionNote',
  ],
};

// Schema definition for Worksheet
const worksheetSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    learningOutcome: { type: Type.STRING },
    studentTasks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          taskNumber: { type: Type.INTEGER },
          instruction: { type: Type.STRING },
          sampleAnswer: { type: Type.STRING },
        },
        required: ['taskNumber', 'instruction', 'sampleAnswer'],
      },
    },
    differentiatedGuidance: {
      type: Type.OBJECT,
      properties: {
        support: { type: Type.STRING },
        core: { type: Type.STRING },
        extension: { type: Type.STRING },
      },
      required: ['support', 'core', 'extension'],
    },
    lowTechNote: { type: Type.STRING },
  },
  required: ['title', 'learningOutcome', 'studentTasks', 'differentiatedGuidance', 'lowTechNote'],
};

// Schema definition for Formative Assessment
const assessmentSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    learningOutcome: { type: Type.STRING },
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          itemNumber: { type: Type.INTEGER },
          question: { type: Type.STRING },
          evaluationGuide: { type: Type.STRING },
        },
        required: ['itemNumber', 'question', 'evaluationGuide'],
      },
    },
    observationChecklist: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    exitTicketPrompt: { type: Type.STRING },
    feedbackSuggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
  required: ['title', 'learningOutcome', 'items', 'observationChecklist', 'exitTicketPrompt'],
};

// Schema definition for Rubric
const rubricSchema = {
  type: Type.OBJECT,
  properties: {
    competency: { type: Type.STRING },
    criteria: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          criterion: { type: Type.STRING },
          beginning: { type: Type.STRING },
          developing: { type: Type.STRING },
          secure: { type: Type.STRING },
          extending: { type: Type.STRING },
        },
        required: ['criterion', 'beginning', 'developing', 'secure', 'extending'],
      },
    },
  },
  required: ['competency', 'criteria'],
};

// Schema definition for Project Brief
const projectBriefSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    drivingQuestion: { type: Type.STRING },
    finalProduct: { type: Type.STRING },
    milestones: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          milestoneNumber: { type: Type.INTEGER },
          name: { type: Type.STRING },
          deliverable: { type: Type.STRING },
          duration: { type: Type.STRING },
        },
        required: ['milestoneNumber', 'name', 'deliverable', 'duration'],
      },
    },
    crossSubjectLinks: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    evidenceOfLearning: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    rubric: rubricSchema,
  },
  required: ['title', 'drivingQuestion', 'finalProduct', 'milestones', 'crossSubjectLinks', 'evidenceOfLearning', 'rubric'],
};

/**
 * Generate full classroom resource using Gemini Structured Outputs, with fallback to local mock
 */
export async function generateResourceWithGemini(
  req: TeacherRequest
): Promise<{ resource: GeneratedResource; usedFallback: boolean; fallbackReason?: string }> {
  const startTime = Date.now();
  const ai = getGenAI();

  if (!ai) {
    const fallback = generateMockResource(req);
    logServerRequest({
      timestamp: new Date().toISOString(),
      stage: req.stage,
      grade: req.grade,
      subject: req.subject,
      duration: req.duration,
      resourceType: req.desiredResource,
      action: 'generate_full',
      status: 'fallback',
      latencyMs: Date.now() - startTime,
      model: 'local-mock',
      errorReason: 'GEMINI_API_KEY missing or not configured',
    });
    return { resource: fallback, usedFallback: true, fallbackReason: 'API key not configured. Generated via local offline engine.' };
  }

  let targetSchema: any = lessonPlanSchema;
  if (req.desiredResource === 'Worksheet') targetSchema = worksheetSchema;
  if (req.desiredResource === 'Formative Assessment') targetSchema = assessmentSchema;
  if (req.desiredResource === 'Rubric') targetSchema = rubricSchema;
  if (req.desiredResource === 'Project Brief') targetSchema = projectBriefSchema;

  const prompt = `Generate a ${req.desiredResource} for an Indian classroom:
School Stage: ${req.stage}
Grade: ${req.grade}
Subject: ${req.subject}
Topic: ${req.topic}
Duration: ${req.duration} minutes
Teaching Language: ${req.language || 'English'}
Class Size: ${req.classSize || '35-45'}
Materials Available: ${req.materials || 'Chalkboard, student notebooks'}
Internet Access: ${req.internetAccess || 'None'}
Learner Profile: ${req.learnerProfile || 'Mixed levels'}
Local Context / Real-life Application: ${req.localContext || 'Everyday Indian household or community context'}
Custom Curricular Goal / Focus: ${req.customGoalOrCompetency || 'Standard NCF-SE competency'}`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: targetSchema,
      },
    });

    const text = response.text?.trim() || '';
    if (!text) {
      throw new Error('Empty response from model');
    }

    const rawJson = JSON.parse(text);
    const validated = validateAndRepairGeneratedOutput(rawJson, req);

    if (validated.isValid && validated.repairedData) {
      logServerRequest({
        timestamp: new Date().toISOString(),
        stage: req.stage,
        grade: req.grade,
        subject: req.subject,
        duration: req.duration,
        resourceType: req.desiredResource,
        action: 'generate_full',
        status: validated.wasRepaired ? 'repaired' : 'success',
        latencyMs: Date.now() - startTime,
        model: MODEL_NAME,
      });

      return { resource: validated.repairedData, usedFallback: false };
    }

    throw new Error('Validation failed after repair');
  } catch (err: any) {
    const latency = Date.now() - startTime;
    const errorReason = err?.message || 'Model call failed';

    logServerRequest({
      timestamp: new Date().toISOString(),
      stage: req.stage,
      grade: req.grade,
      subject: req.subject,
      duration: req.duration,
      resourceType: req.desiredResource,
      action: 'generate_full',
      status: 'fallback',
      latencyMs: latency,
      model: MODEL_NAME,
      errorReason,
    });

    // Fallback gracefully to high-quality deterministic generator
    const fallbackResource = generateMockResource(req);
    return {
      resource: fallbackResource,
      usedFallback: true,
      fallbackReason: `Gemini service notice (${errorReason}). Used reliable local offline engine.`,
    };
  }
}

/**
 * Regenerate a specific section using Gemini Structured Output, with fallback
 */
export async function regenerateSectionWithGemini(
  sectionKey: string,
  request: TeacherRequest,
  currentValue?: any
): Promise<{ updatedContent: any; usedFallback: boolean; reason?: string }> {
  const startTime = Date.now();
  const ai = getGenAI();

  if (!ai) {
    return { updatedContent: null, usedFallback: true, reason: 'Gemini not configured' };
  }

  const prompt = `Regenerate ONLY the section "${sectionKey}" for:
Grade ${request.grade} ${request.subject}, Topic: "${request.topic}", Stage: ${request.stage}.
Provide a fresh, safe, practical Indian classroom variation.
Previous value: ${JSON.stringify(currentValue || '')}

Return as JSON object: { "result": "..." } or { "result": ["..."] } if it requires bullets.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            result: {
              type: Array.isArray(currentValue) ? Type.ARRAY : Type.STRING,
              items: Array.isArray(currentValue) ? { type: Type.STRING } : undefined,
            },
          },
          required: ['result'],
        },
      },
    });

    const text = response.text?.trim() || '';
    const parsed = JSON.parse(text);

    logServerRequest({
      timestamp: new Date().toISOString(),
      stage: request.stage,
      grade: request.grade,
      subject: request.subject,
      action: 'regenerate_section',
      sectionKey,
      status: 'success',
      latencyMs: Date.now() - startTime,
      model: MODEL_NAME,
    });

    return { updatedContent: parsed.result, usedFallback: false };
  } catch (err: any) {
    logServerRequest({
      timestamp: new Date().toISOString(),
      stage: request.stage,
      grade: request.grade,
      subject: request.subject,
      action: 'regenerate_section',
      sectionKey,
      status: 'fallback',
      latencyMs: Date.now() - startTime,
      model: MODEL_NAME,
      errorReason: err?.message,
    });

    return { updatedContent: null, usedFallback: true, reason: err?.message };
  }
}
