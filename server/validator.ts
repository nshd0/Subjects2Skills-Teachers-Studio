/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TeacherRequest, GeneratedResource, LessonPlanData, ResourceMetadata } from '../src/types';

export interface ValidationResult<T> {
  isValid: boolean;
  errors: string[];
  repairedData?: T;
  wasRepaired: boolean;
}

/**
 * Validate incoming teacher request before calling model
 */
export function validateTeacherRequest(body: any): { isValid: boolean; error?: string; request?: TeacherRequest } {
  if (!body || typeof body !== 'object') {
    return { isValid: false, error: 'Invalid JSON request payload.' };
  }

  const { stage, grade, subject, topic, duration, desiredResource } = body;

  const validStages = ['Foundational', 'Preparatory', 'Middle', 'Secondary'];
  if (!validStages.includes(stage)) {
    return { isValid: false, error: `Invalid stage. Must be one of: ${validStages.join(', ')}` };
  }

  const gradeNum = parseInt(grade, 10);
  if (isNaN(gradeNum) || gradeNum < 1 || gradeNum > 12) {
    return { isValid: false, error: 'Grade must be a valid number between 1 and 12.' };
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    return { isValid: false, error: 'Subject is required.' };
  }

  if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
    return { isValid: false, error: 'Topic is required.' };
  }

  const validDurations = ['30', '40', '45', '60', '90'];
  if (!validDurations.includes(String(duration))) {
    return { isValid: false, error: `Duration must be one of: ${validDurations.join(', ')}` };
  }

  const validResources = ['Lesson Plan', 'Worksheet', 'Formative Assessment', 'Rubric', 'Project Brief'];
  if (!validResources.includes(desiredResource)) {
    return { isValid: false, error: `Resource must be one of: ${validResources.join(', ')}` };
  }

  const cleanRequest: TeacherRequest = {
    stage,
    grade: String(gradeNum),
    subject: subject.trim().substring(0, 100),
    topic: topic.trim().substring(0, 150),
    duration: String(duration) as any,
    desiredResource: desiredResource as any,
    language: ['English', 'Hindi', 'Bilingual'].includes(body.language) ? body.language : 'English',
    classSize: typeof body.classSize === 'string' ? body.classSize.trim().substring(0, 50) : '',
    materials: typeof body.materials === 'string' ? body.materials.trim().substring(0, 200) : '',
    internetAccess: ['None', 'Limited', 'Available'].includes(body.internetAccess) ? body.internetAccess : 'None',
    learnerProfile: ['Mixed levels', 'Support needed', 'Advanced learners', 'Inclusive classroom'].includes(body.learnerProfile)
      ? body.learnerProfile
      : 'Mixed levels',
    localContext: typeof body.localContext === 'string' ? body.localContext.trim().substring(0, 200) : '',
    customGoalOrCompetency: typeof body.customGoalOrCompetency === 'string' ? body.customGoalOrCompetency.trim().substring(0, 250) : '',
  };

  return { isValid: true, request: cleanRequest };
}

/**
 * Audit and sanitize generated text to remove unverified endorsements and student data requests
 */
function sanitizeProse(text: string): { text: string; altered: boolean } {
  let altered = false;
  let result = text;

  // Patterns implying official endorsement or official certification
  const bannedEndorsements = [
    /\b(official approval|NCERT certified|CBSE approved|government recommended|Ministry-mandated|official NCF competency|nationally prescribed)\b/gi,
    /\b(officially endorsed by|official CBSE certification|approved by NCERT|CBSE-certified|NCERT-endorsed|Ministry of Education certified)\b/gi,
    /\b(official government syllabus code|official CBSE code)\b/gi,
  ];

  for (const pattern of bannedEndorsements) {
    if (pattern.test(result)) {
      result = result.replace(pattern, 'Suggested — teacher review required.');
      altered = true;
    }
  }

  // Check and scrub any student personal data requests
  const studentDataPatterns = [
    /\b(record student phone number|collect student address|enter student photo|collect student Aadhaar|student home contact|student personal data|student roll number|student marks|student phone numbers)\b/gi,
  ];

  for (const pattern of studentDataPatterns) {
    if (pattern.test(result)) {
      result = result.replace(pattern, 'anonymous student reflection');
      altered = true;
    }
  }

  // Safety checks for dangerous laboratory instructions in basic classrooms
  const unsafePatterns = [
    /\b(boiling water|boil water)\b/gi,
    /\b(concentrated acid|hydrochloric acid|sulfuric acid)\b/gi,
    /\b(open flame with spirit lamp|unsupervised candle)\b/gi,
  ];

  for (const pattern of unsafePatterns) {
    if (pattern.test(result)) {
      if (pattern.source.includes('boil')) {
        result = result.replace(pattern, 'warm water (safe to touch, below 45°C)');
      } else {
        result = result.replace(pattern, 'safe classroom substitute (e.g., vinegar/lemon juice or water)');
      }
      altered = true;
    }
  }

  return { text: result, altered };
}

/**
 * Compact Output Validator & Repair Engine
 */
export function validateAndRepairGeneratedOutput(
  rawOutput: any,
  request: TeacherRequest
): ValidationResult<GeneratedResource> {
  const errors: string[] = [];
  let wasRepaired = false;

  const resourceId = `res_gemini_${Date.now()}`;
  const createdAt = new Date().toISOString();

  const metadata: ResourceMetadata = {
    id: resourceId,
    generationEngine: 'gemini_structured_output',
    engineLabel: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
    generatedAt: createdAt,
    teacherReviewRequired: true,
    curriculumMappingStatus: 'suggested_unverified',
  };

  // 1. LESSON PLAN VALIDATION
  if (request.desiredResource === 'Lesson Plan') {
    if (!rawOutput || typeof rawOutput !== 'object') {
      return { isValid: false, errors: ['Output is not an object'], wasRepaired: false };
    }

    const lp = rawOutput.lessonPlan || rawOutput;

    // Enforce limits:
    // - max 3 learning outcomes
    let learningOutcomes: string[] = Array.isArray(lp.learningOutcomes) ? lp.learningOutcomes : [];
    if (learningOutcomes.length > 3) {
      learningOutcomes = learningOutcomes.slice(0, 3);
      wasRepaired = true;
    }
    if (learningOutcomes.length === 0) {
      learningOutcomes = [`Observe and describe core aspects of ${request.topic} using everyday examples.`];
      wasRepaired = true;
    }

    // - max 3 prior learning prompts
    let priorLearningCheck: string[] = Array.isArray(lp.priorLearningCheck) ? lp.priorLearningCheck : [];
    if (priorLearningCheck.length > 3) {
      priorLearningCheck = priorLearningCheck.slice(0, 3);
      wasRepaired = true;
    }
    if (priorLearningCheck.length === 0) {
      priorLearningCheck = [`What is one everyday experience you have had that relates to ${request.topic}?`];
      wasRepaired = true;
    }

    // - 5E sequence
    const defaultSteps = ['Engage', 'Explore', 'Explain', 'Apply', 'Reflect'] as const;
    let learningSequence = Array.isArray(lp.learningSequence) ? lp.learningSequence : [];
    if (learningSequence.length < 5) {
      learningSequence = defaultSteps.map((step) => {
        const found = learningSequence.find((s: any) => s && s.step === step);
        if (found) return found;
        return {
          step,
          duration: step === 'Engage' || step === 'Reflect' ? '5 min' : '10 min',
          teacherAction: `Facilitates ${step.toLowerCase()} phase with practical ${request.topic} prompts.`,
          studentAction: `Engages actively in ${step.toLowerCase()} tasks in pairs or notebooks.`,
        };
      });
      wasRepaired = true;
    }

    // - Differentiated tasks (max 3 per band)
    const diff = lp.differentiatedTasks || {};
    let support = Array.isArray(diff.support) ? diff.support.slice(0, 3) : ['Guided sentence starters and peer pairing.'];
    let core = Array.isArray(diff.core) ? diff.core.slice(0, 3) : [`Complete standard ${request.topic} questions in notebooks.`];
    let extension = Array.isArray(diff.extension) ? diff.extension.slice(0, 3) : [`Formulate an inquiry question investigating ${request.topic}.`];

    // - Questioning prompts
    const q = lp.questioningPrompts || {};
    const questioningPrompts = {
      recall: q.recall || `What is the basic definition of ${request.topic}?`,
      reasoning: q.reasoning || `Why does this happen under these conditions?`,
      transfer: q.transfer || `How can someone apply this in domestic or community life?`,
    };

    // - Formative assessment
    const fa = lp.formativeAssessment || {};
    const formativeAssessment = {
      observationChecklistItem: fa.observationChecklistItem || `Student explains the central concept in their own words.`,
      exitTicketQuestion: fa.exitTicketQuestion || `In one sentence, what did you observe about ${request.topic} today?`,
      feedbackSuggestions: Array.isArray(fa.feedbackSuggestions) ? fa.feedbackSuggestions.slice(0, 2) : ['Affirm conceptual reasoning before technical terms.'],
    };

    // - Rubric (max 3 criteria)
    const rub = lp.rubric || {};
    let criteria = Array.isArray(rub.criteria) ? rub.criteria.slice(0, 3) : [];
    if (criteria.length === 0) {
      criteria = [
        {
          id: 'crit-1',
          criterion: 'Conceptual Understanding',
          beginning: 'Partial recall with teacher assistance.',
          developing: 'Explains basics with occasional gaps.',
          secure: 'Accurately explains core principles.',
          extending: 'Transfers concept to unfamiliar scenarios.',
        },
      ];
      wasRepaired = true;
    }

    // Sanitize prose fields
    const sTitle = sanitizeProse(lp.title || `${request.subject}: ${request.topic} (Grade ${request.grade})`);
    const sGoal = sanitizeProse(lp.suggestedCurricularGoal || `Suggested Curricular Goal: Develops understanding of ${request.topic}.`);
    const sComp = sanitizeProse(lp.suggestedCompetency || `Suggested Competency: Investigates and explains ${request.topic}.`);
    const sExp = sanitizeProse(lp.experientialActivity || `Hands-on inquiry station using simple classroom materials.`);
    const sLowTech = sanitizeProse(lp.lowTechAlternative || `100% Offline Chalkboard Alternative: Uses blackboard sketches and student notebooks.`);
    const sReflect = sanitizeProse(lp.teacherReflectionPrompt || `Did the pacing allow all student pairs to test their hypotheses?`);
    const sSafety = sanitizeProse(lp.safetyOrInclusionNote || `Ensure safe handling of materials and pair students for inclusive peer support.`);

    if (sTitle.altered || sGoal.altered || sComp.altered || sExp.altered) wasRepaired = true;

    const repairedLP: LessonPlanData = {
      title: sTitle.text,
      contextSummary: `${request.stage} Stage · Grade ${request.grade} · ${request.subject} · ${request.duration} Mins · ${request.language || 'English'} · Materials: ${request.materials || 'Chalkboard, student notebooks'}`,
      suggestedCurricularGoal: sGoal.text.startsWith('Suggested') ? sGoal.text : `Suggested Curricular Goal: ${sGoal.text}`,
      suggestedCompetency: sComp.text.startsWith('Suggested') ? sComp.text : `Suggested Competency: ${sComp.text}`,
      learningOutcomes: learningOutcomes.map((l) => sanitizeProse(l).text),
      priorLearningCheck: priorLearningCheck.map((p) => sanitizeProse(p).text),
      learningSequence: learningSequence.map((s: any) => ({
        step: s.step,
        duration: s.duration || '10 min',
        teacherAction: sanitizeProse(s.teacherAction || '').text,
        studentAction: sanitizeProse(s.studentAction || '').text,
      })),
      experientialActivity: sExp.text,
      differentiatedTasks: {
        support: support.map((t: string) => sanitizeProse(t).text),
        core: core.map((t: string) => sanitizeProse(t).text),
        extension: extension.map((t: string) => sanitizeProse(t).text),
      },
      questioningPrompts: {
        recall: sanitizeProse(questioningPrompts.recall).text,
        reasoning: sanitizeProse(questioningPrompts.reasoning).text,
        transfer: sanitizeProse(questioningPrompts.transfer).text,
      },
      formativeAssessment: {
        observationChecklistItem: sanitizeProse(formativeAssessment.observationChecklistItem).text,
        exitTicketQuestion: sanitizeProse(formativeAssessment.exitTicketQuestion).text,
        feedbackSuggestions: formativeAssessment.feedbackSuggestions.map((f: string) => sanitizeProse(f).text),
      },
      rubric: {
        competency: sanitizeProse(rub.competency || `Demonstrates understanding of ${request.topic}`).text,
        criteria: criteria.map((c: any, idx: number) => ({
          id: c.id || `crit-${idx + 1}`,
          criterion: sanitizeProse(c.criterion || `Criterion ${idx + 1}`).text,
          beginning: sanitizeProse(c.beginning || 'Beginning level').text,
          developing: sanitizeProse(c.developing || 'Developing level').text,
          secure: sanitizeProse(c.secure || 'Secure level').text,
          extending: sanitizeProse(c.extending || 'Extending level').text,
        })),
      },
      lowTechAlternative: sLowTech.text,
      teacherReflectionPrompt: sReflect.text,
      safetyOrInclusionNote: sSafety.text,
    };

    return {
      isValid: true,
      errors,
      wasRepaired,
      repairedData: {
        id: resourceId,
        createdAt,
        request,
        resourceType: 'Lesson Plan',
        metadata,
        lessonPlan: repairedLP,
      },
    };
  }

  // 2. WORKSHEET
  if (request.desiredResource === 'Worksheet') {
    const ws = rawOutput.worksheet || rawOutput;
    let tasks = Array.isArray(ws.studentTasks) ? ws.studentTasks.slice(0, 5) : [];
    if (tasks.length === 0) {
      tasks = [
        { taskNumber: 1, instruction: `State the core definition of ${request.topic}.`, sampleAnswer: 'Sample key definition.' },
      ];
      wasRepaired = true;
    }

    return {
      isValid: true,
      errors,
      wasRepaired,
      repairedData: {
        id: resourceId,
        createdAt,
        request,
        resourceType: 'Worksheet',
        metadata,
        worksheet: {
          title: sanitizeProse(ws.title || `Practice Worksheet: ${request.topic}`).text,
          learningOutcome: sanitizeProse(ws.learningOutcome || `Demonstrate understanding of ${request.topic}`).text,
          studentTasks: tasks.map((t: any, i: number) => ({
            taskNumber: i + 1,
            instruction: sanitizeProse(t.instruction || `Task ${i + 1}`).text,
            sampleAnswer: sanitizeProse(t.sampleAnswer || 'Model answer').text,
          })),
          differentiatedGuidance: {
            support: sanitizeProse(ws.differentiatedGuidance?.support || 'Provide sentence frames and vocabulary bank.').text,
            core: sanitizeProse(ws.differentiatedGuidance?.core || 'Complete standard questions in notebooks.').text,
            extension: sanitizeProse(ws.differentiatedGuidance?.extension || 'Add a real-life cross-curricular connection.').text,
          },
          lowTechNote: sanitizeProse(ws.lowTechNote || 'Can be written on the blackboard for notebook transcription.').text,
        },
      },
    };
  }

  // 3. FORMATIVE ASSESSMENT
  if (request.desiredResource === 'Formative Assessment') {
    const as = rawOutput.assessment || rawOutput;
    let items = Array.isArray(as.items) ? as.items.slice(0, 5) : [];
    if (items.length === 0) {
      items = [
        { itemNumber: 1, question: `Diagnostic item on ${request.topic}`, evaluationGuide: 'Checks prior readiness' },
      ];
      wasRepaired = true;
    }

    return {
      isValid: true,
      errors,
      wasRepaired,
      repairedData: {
        id: resourceId,
        createdAt,
        request,
        resourceType: 'Formative Assessment',
        metadata,
        assessment: {
          title: sanitizeProse(as.title || `Formative Assessment: ${request.topic}`).text,
          learningOutcome: sanitizeProse(as.learningOutcome || `Assess grasp of ${request.topic}`).text,
          items: items.map((it: any, i: number) => ({
            itemNumber: i + 1,
            question: sanitizeProse(it.question || `Diagnostic item ${i + 1}`).text,
            evaluationGuide: sanitizeProse(it.evaluationGuide || 'Evaluation rubric').text,
          })),
          observationChecklist: (Array.isArray(as.observationChecklist) ? as.observationChecklist : ['Active reasoning']).map(
            (c: string) => sanitizeProse(c).text
          ),
          exitTicketPrompt: sanitizeProse(as.exitTicketPrompt || 'Write 1 key learning on your slate.').text,
          feedbackSuggestions: (Array.isArray(as.feedbackSuggestions) ? as.feedbackSuggestions : ['Affirm peer explanations.']).map(
            (f: string) => sanitizeProse(f).text
          ),
        },
      },
    };
  }

  // 4. RUBRIC
  if (request.desiredResource === 'Rubric') {
    const rub = rawOutput.rubric || rawOutput;
    let criteria = Array.isArray(rub.criteria) ? rub.criteria.slice(0, 3) : [];
    if (criteria.length === 0) {
      criteria = [
        {
          id: 'crit-1',
          criterion: 'Conceptual Understanding',
          beginning: 'Partial recall with assistance',
          developing: 'Explains basics with occasional gaps',
          secure: 'Accurately explains core concepts',
          extending: 'Transfers concept to new problems',
        },
      ];
      wasRepaired = true;
    }

    return {
      isValid: true,
      errors,
      wasRepaired,
      repairedData: {
        id: resourceId,
        createdAt,
        request,
        resourceType: 'Rubric',
        metadata,
        rubric: {
          competency: sanitizeProse(rub.competency || `Demonstrates competence in ${request.topic}`).text,
          criteria: criteria.map((c: any, idx: number) => ({
            id: c.id || `crit-${idx + 1}`,
            criterion: sanitizeProse(c.criterion || `Criterion ${idx + 1}`).text,
            beginning: sanitizeProse(c.beginning || 'Beginning level').text,
            developing: sanitizeProse(c.developing || 'Developing level').text,
            secure: sanitizeProse(c.secure || 'Secure level').text,
            extending: sanitizeProse(c.extending || 'Extending level').text,
          })),
        },
      },
    };
  }

  // 5. PROJECT BRIEF
  const pb = rawOutput.projectBrief || rawOutput;
  let milestones = Array.isArray(pb.milestones) ? pb.milestones.slice(0, 5) : [];
  if (milestones.length === 0) {
    milestones = [
      { milestoneNumber: 1, name: 'Inquiry & Plan', deliverable: 'Mind map', duration: '1 Period' },
      { milestoneNumber: 2, name: 'Investigation', deliverable: 'Field log', duration: '2 Periods' },
    ];
    wasRepaired = true;
  }

  return {
    isValid: true,
    errors,
    wasRepaired,
    repairedData: {
      id: resourceId,
      createdAt,
      request,
      resourceType: 'Project Brief',
      metadata,
      projectBrief: {
        title: sanitizeProse(pb.title || `Inquiry Project: ${request.topic}`).text,
        drivingQuestion: sanitizeProse(pb.drivingQuestion || `How does ${request.topic} solve everyday challenges?`).text,
        finalProduct: sanitizeProse(pb.finalProduct || 'Student illustrated guide or model').text,
        milestones: milestones.map((m: any, i: number) => ({
          milestoneNumber: i + 1,
          name: sanitizeProse(m.name || `Milestone ${i + 1}`).text,
          deliverable: sanitizeProse(m.deliverable || 'Student artifact').text,
          duration: m.duration || '1 Period',
        })),
        crossSubjectLinks: (Array.isArray(pb.crossSubjectLinks) ? pb.crossSubjectLinks : ['Mathematics: Data measurement']).map(
          (l: string) => sanitizeProse(l).text
        ),
        evidenceOfLearning: (Array.isArray(pb.evidenceOfLearning) ? pb.evidenceOfLearning : ['Design notebook']).map((e: string) =>
          sanitizeProse(e).text
        ),
        rubric: {
          competency: sanitizeProse(pb.rubric?.competency || `Applies ${request.topic} in project inquiries`).text,
          criteria: (Array.isArray(pb.rubric?.criteria) ? pb.rubric.criteria.slice(0, 3) : []).map((c: any, idx: number) => ({
            id: c.id || `crit-${idx + 1}`,
            criterion: sanitizeProse(c.criterion || `Criterion ${idx + 1}`).text,
            beginning: sanitizeProse(c.beginning || 'Beginning level').text,
            developing: sanitizeProse(c.developing || 'Developing level').text,
            secure: sanitizeProse(c.secure || 'Secure level').text,
            extending: sanitizeProse(c.extending || 'Extending level').text,
          })),
        },
      },
    },
  };
}
