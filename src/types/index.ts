/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SchoolStage = 'Foundational' | 'Preparatory' | 'Middle' | 'Secondary';

export type DesiredResource = 
  | 'Lesson Plan' 
  | 'Worksheet' 
  | 'Formative Assessment' 
  | 'Rubric' 
  | 'Project Brief';

export type LessonDuration = '30' | '40' | '45' | '60' | '90';

export type TeachingLanguage = 'English' | 'Hindi' | 'Bilingual';

export type InternetAccess = 'None' | 'Limited' | 'Available';

export type LearnerProfile = 'Mixed levels' | 'Support needed' | 'Advanced learners' | 'Inclusive classroom';

export interface TeacherRequest {
  stage: SchoolStage;
  grade: string;
  subject: string;
  topic: string;
  duration: LessonDuration;
  desiredResource: DesiredResource;
  // Optional classroom context
  language?: TeachingLanguage;
  classSize?: string;
  materials?: string;
  internetAccess?: InternetAccess;
  learnerProfile?: LearnerProfile;
  localContext?: string;
  customGoalOrCompetency?: string;
}

export interface RubricCriterion {
  id: string;
  criterion: string;
  beginning: string;
  developing: string;
  secure: string;
  extending: string;
}

export interface RubricData {
  competency: string;
  criteria: RubricCriterion[];
}

export interface LearningSequenceStep {
  step: 'Engage' | 'Explore' | 'Explain' | 'Apply' | 'Reflect';
  duration: string;
  teacherAction: string;
  studentAction: string;
  variantId?: number;
}

export interface DifferentiatedTasks {
  support: string[];
  core: string[];
  extension: string[];
}

export interface QuestioningPrompts {
  recall: string;
  reasoning: string;
  transfer: string;
}

export interface FormativeAssessmentData {
  observationChecklistItem: string;
  exitTicketQuestion: string;
  sampleQuestions?: Array<{ question: string; answerGuide: string }>;
  feedbackSuggestions?: string[];
}

export interface LessonPlanData {
  title: string;
  contextSummary: string;
  suggestedCurricularGoal: string;
  suggestedCompetency: string;
  learningOutcomes: string[];
  priorLearningCheck: string[];
  learningSequence: LearningSequenceStep[];
  experientialActivity: string;
  differentiatedTasks: DifferentiatedTasks;
  questioningPrompts: QuestioningPrompts;
  formativeAssessment: FormativeAssessmentData;
  rubric: RubricData;
  lowTechAlternative: string;
  teacherReflectionPrompt: string;
  safetyOrInclusionNote: string;
}

export interface WorksheetData {
  title: string;
  learningOutcome: string;
  studentTasks: Array<{ taskNumber: number; instruction: string; sampleAnswer: string }>;
  differentiatedGuidance: {
    support: string;
    core: string;
    extension: string;
  };
  lowTechNote: string;
}

export interface AssessmentData {
  title: string;
  learningOutcome: string;
  items: Array<{ itemNumber: number; question: string; evaluationGuide: string }>;
  observationChecklist: string[];
  exitTicketPrompt: string;
  feedbackSuggestions: string[];
}

export interface ProjectBriefData {
  title: string;
  drivingQuestion: string;
  finalProduct: string;
  milestones: Array<{ milestoneNumber: number; name: string; deliverable: string; duration: string }>;
  crossSubjectLinks: string[];
  evidenceOfLearning: string[];
  rubric: RubricData;
}

export interface ResourceMetadata {
  id: string;
  generationEngine: 'gemini_structured_output' | 'local_deterministic_engine';
  engineLabel: string;
  generatedAt: string;
  teacherReviewRequired: boolean;
  curriculumMappingStatus: 'suggested_unverified';
}

export interface GeneratedResource {
  id: string;
  createdAt: string;
  request: TeacherRequest;
  resourceType: DesiredResource;
  metadata?: ResourceMetadata;
  lessonPlan?: LessonPlanData;
  worksheet?: WorksheetData;
  assessment?: AssessmentData;
  rubric?: RubricData;
  projectBrief?: ProjectBriefData;
}

export interface ToolkitItem {
  id: string;
  title: string;
  stage: SchoolStage | 'All Stages';
  format: string;
  description: string;
  sampleContent: {
    overview: string;
    keyCheckpoints: string[];
    classroomSnippet: string;
    teacherTip: string;
  };
}

export interface FeedbackData {
  role: 'Teacher' | 'Coordinator' | 'School Leader' | 'Other';
  mostUsefulFeature: string;
  whatWasMissing: string;
  wouldUseAgain: 'Yes' | 'No' | 'Maybe';
  email?: string;
}
