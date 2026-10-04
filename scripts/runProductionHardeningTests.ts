/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { validateTeacherRequest, validateAndRepairGeneratedOutput } from '../server/validator';
import { generateMockResource } from '../src/services/mockGenerator';
import { isRetriableError, FALLBACK_NOTICE, RETRY_DELAYS_MS } from '../server/geminiService';
import { TeacherRequest, SchoolStage, DesiredResource } from '../src/types';

interface TestResult {
  category: string;
  testName: string;
  passed: boolean;
  details?: string;
}

const results: TestResult[] = [];

function assert(category: string, testName: string, condition: boolean, details?: string) {
  results.push({ category, testName, passed: condition, details });
  const mark = condition ? 'PASS' : 'FAIL';
  console.log(`[${mark}] ${category} :: ${testName}${details ? ` (${details})` : ''}`);
}

console.log('================================================================');
console.log('SUBJECTS2SKILLS PRODUCTION-READINESS HARDENING VERIFICATION TEST');
console.log('================================================================\n');

// -------------------------------------------------------------
// 1. ALL FIVE RESOURCE TYPES
// -------------------------------------------------------------
const resourceTypes: DesiredResource[] = [
  'Lesson Plan',
  'Worksheet',
  'Formative Assessment',
  'Rubric',
  'Project Brief',
];

for (const rt of resourceTypes) {
  const req: TeacherRequest = {
    stage: 'Middle',
    grade: '7',
    subject: 'Science',
    topic: 'Heat Transfer',
    duration: '40',
    desiredResource: rt,
  };
  const val = validateTeacherRequest(req);
  const gen = generateMockResource(req);
  assert(
    'Resource Types',
    `Generates valid structured ${rt}`,
    val.isValid && gen.resourceType === rt && Boolean(gen.metadata?.id),
    `Metadata Engine: ${gen.metadata?.engineLabel}`
  );
}

// -------------------------------------------------------------
// 2. ALL FOUR SCHOOL STAGES
// -------------------------------------------------------------
const stages: Array<{ stage: SchoolStage; grade: string }> = [
  { stage: 'Foundational', grade: '2' },
  { stage: 'Preparatory', grade: '5' },
  { stage: 'Middle', grade: '7' },
  { stage: 'Secondary', grade: '10' },
];

for (const s of stages) {
  const req: TeacherRequest = {
    stage: s.stage,
    grade: s.grade,
    subject: 'Mathematics',
    topic: 'Geometric Shapes',
    duration: '40',
    desiredResource: 'Lesson Plan',
  };
  const val = validateTeacherRequest(req);
  const gen = generateMockResource(req);
  assert(
    'School Stages',
    `Validates and structures ${s.stage} Stage (Grade ${s.grade})`,
    val.isValid && gen.request.stage === s.stage,
    `Stage: ${gen.request.stage}`
  );
}

// -------------------------------------------------------------
// 3. MALFORMED JSON REPAIR
// -------------------------------------------------------------
const malformedRaw = {
  // Missing required lesson plan fields; invalid arrays
  lessonPlan: {
    title: 'Minimal Draft without sequences',
    learningOutcomes: null,
    learningSequence: [],
    differentiatedTasks: {},
  },
};
const dummyReq: TeacherRequest = {
  stage: 'Middle',
  grade: '7',
  subject: 'Science',
  topic: 'Light',
  duration: '40',
  desiredResource: 'Lesson Plan',
};
const repairRes = validateAndRepairGeneratedOutput(malformedRaw, dummyReq);
assert(
  'Malformed JSON',
  'Repairs missing 5E steps and null arrays cleanly',
  repairRes.isValid &&
    repairRes.wasRepaired &&
    (repairRes.repairedData?.lessonPlan?.learningSequence.length ?? 0) === 5 &&
    (repairRes.repairedData?.lessonPlan?.learningOutcomes.length ?? 0) >= 1,
  `Sequence Steps: ${repairRes.repairedData?.lessonPlan?.learningSequence.length}`
);

// -------------------------------------------------------------
// 4. RETRY HANDLING & ERROR CODES (401, 403, 429, 500, 503)
// -------------------------------------------------------------
assert(
  'Retry Policy',
  '401 Unauthenticated is NON-RETRIABLE',
  isRetriableError({ status: 401, message: 'API key unauthenticated' }) === false
);
assert(
  'Retry Policy',
  '403 Permission Denied is NON-RETRIABLE',
  isRetriableError({ status: 403, message: 'Forbidden resource' }) === false
);
assert(
  'Retry Policy',
  '400 Invalid Argument is NON-RETRIABLE',
  isRetriableError({ status: 400, message: 'Invalid payload' }) === false
);
assert(
  'Retry Policy',
  '429 Resource Exhausted is RETRIABLE',
  isRetriableError({ status: 429, message: 'Rate limit exceeded' }) === true
);
assert(
  'Retry Policy',
  '500 Internal Server Error is RETRIABLE',
  isRetriableError({ status: 500, message: 'Internal server error' }) === true
);
assert(
  'Retry Policy',
  '503 High Demand / Unavailable is RETRIABLE',
  isRetriableError({ status: 503, message: 'Service unavailable' }) === true
);
assert(
  'Retry Policy',
  'Retry delays bounded to 500ms and 1000ms (max 2 retries)',
  RETRY_DELAYS_MS.length === 2 && RETRY_DELAYS_MS[0] === 500 && RETRY_DELAYS_MS[1] === 1000
);

// -------------------------------------------------------------
// 5. UNSAFE ACTIVITY REPAIR
// -------------------------------------------------------------
const unsafeRaw = {
  lessonPlan: {
    title: 'Demonstration with boiling water and concentrated acid',
    learningOutcomes: ['Observe boiling water reactions'],
    learningSequence: [
      { step: 'Engage', duration: '5m', teacherAction: 'Heat boiling water on table', studentAction: 'Stand close' },
    ],
  },
};
const unsafeRepaired = validateAndRepairGeneratedOutput(unsafeRaw, dummyReq);
const proseChecked = JSON.stringify(unsafeRepaired.repairedData?.lessonPlan || {});
assert(
  'Safety Repair',
  'Replaces boiling water with warm water (<=45C)',
  !proseChecked.toLowerCase().includes('boiling water') &&
    proseChecked.includes('warm water (safe to touch, below 45°C)')
);
assert(
  'Safety Repair',
  'Replaces concentrated acid with safe classroom substitute',
  !proseChecked.toLowerCase().includes('concentrated acid') &&
    proseChecked.includes('safe classroom substitute')
);

// -------------------------------------------------------------
// 6. STUDENT PERSONAL DATA REMOVAL
// -------------------------------------------------------------
const privacyRaw = {
  lessonPlan: {
    title: 'Clean Title',
    experientialActivity: 'Teacher will record student phone number and collect student Aadhaar for survey.',
  },
};
const privacyRepaired = validateAndRepairGeneratedOutput(privacyRaw, dummyReq);
const privacyStr = privacyRepaired.repairedData?.lessonPlan?.experientialActivity || '';
assert(
  'Privacy Protection',
  'Scrubs student phone numbers and Aadhaar requests',
  !privacyStr.includes('student phone number') &&
    !privacyStr.includes('student Aadhaar') &&
    privacyStr.includes('anonymous student reflection')
);

// -------------------------------------------------------------
// 7. ENDORSEMENT PURGE
// -------------------------------------------------------------
const endorsementTerms = [
  'official approval',
  'NCERT certified',
  'CBSE approved',
  'government recommended',
  'Ministry-mandated',
  'official NCF competency',
  'nationally prescribed',
];

for (const term of endorsementTerms) {
  const mockWithEndorsement = {
    lessonPlan: {
      title: `Plan under ${term} from board`,
      suggestedCurricularGoal: `This has ${term} guidelines`,
    },
  };
  const scrubbed = validateAndRepairGeneratedOutput(mockWithEndorsement, dummyReq);
  const outTitle = scrubbed.repairedData?.lessonPlan?.title || '';
  const outGoal = scrubbed.repairedData?.lessonPlan?.suggestedCurricularGoal || '';
  const bothScrubbed =
    !outTitle.toLowerCase().includes(term.toLowerCase()) &&
    !outGoal.toLowerCase().includes(term.toLowerCase()) &&
    (outTitle.includes('Suggested — teacher review required.') ||
      outGoal.includes('Suggested — teacher review required.'));
  assert('Endorsement Purge', `Replaces "${term}" with "Suggested — teacher review required."`, bothScrubbed);
}

// -------------------------------------------------------------
// 8. CONTENT, WORD AND ARRAY LIMITS
// -------------------------------------------------------------
const oversizedRaw = {
  lessonPlan: {
    learningOutcomes: ['Outcome 1', 'Outcome 2', 'Outcome 3', 'Outcome 4', 'Outcome 5', 'Outcome 6'],
    priorLearningCheck: ['Prompt 1', 'Prompt 2', 'Prompt 3', 'Prompt 4'],
    differentiatedTasks: {
      support: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
      core: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
      extension: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
    },
    rubric: {
      criteria: [
        { id: '1', criterion: 'Crit 1', beginning: 'B', developing: 'D', secure: 'S', extending: 'E' },
        { id: '2', criterion: 'Crit 2', beginning: 'B', developing: 'D', secure: 'S', extending: 'E' },
        { id: '3', criterion: 'Crit 3', beginning: 'B', developing: 'D', secure: 'S', extending: 'E' },
        { id: '4', criterion: 'Crit 4', beginning: 'B', developing: 'D', secure: 'S', extending: 'E' },
      ],
    },
  },
};
const limitRepaired = validateAndRepairGeneratedOutput(oversizedRaw, dummyReq);
const lp = limitRepaired.repairedData?.lessonPlan;
assert(
  'Content Limits',
  'Learning outcomes capped to max 3',
  (lp?.learningOutcomes.length ?? 0) === 3
);
assert(
  'Content Limits',
  'Prior learning prompts capped to max 3',
  (lp?.priorLearningCheck.length ?? 0) === 3
);
assert(
  'Content Limits',
  'Differentiated tasks capped to max 3 per level',
  (lp?.differentiatedTasks.support.length ?? 0) === 3 &&
    (lp?.differentiatedTasks.core.length ?? 0) === 3 &&
    (lp?.differentiatedTasks.extension.length ?? 0) === 3
);
assert(
  'Content Limits',
  'Rubric criteria capped to max 3',
  (lp?.rubric.criteria.length ?? 0) === 3
);

// Estimate word count
const entireProse = JSON.stringify(lp || {});
const wordCount = entireProse.split(/\s+/).length;
assert(
  'Content Limits',
  'Total lesson plan size remains under 900 words',
  wordCount < 900,
  `Estimated words: ${wordCount}`
);

// -------------------------------------------------------------
// 9. RESOURCE METADATA & FALLBACK NOTICE AUDIT
// -------------------------------------------------------------
assert(
  'Resource Metadata',
  'Repaired data includes complete ResourceMetadata with non-personal ID',
  Boolean(limitRepaired.repairedData?.metadata?.id) &&
    limitRepaired.repairedData?.metadata?.teacherReviewRequired === true &&
    limitRepaired.repairedData?.metadata?.curriculumMappingStatus === 'suggested_unverified'
);
assert(
  'Fallback Notice',
  'Exact fallback notice string matches specification',
  FALLBACK_NOTICE === 'AI customisation is temporarily unavailable. Showing the local rule-based template.'
);

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
const total = results.length;
const passed = results.filter((r) => r.passed).length;
const failed = total - passed;

console.log('\n================================================================');
console.log(`TEST RUN SUMMARY: ${passed} / ${total} CHECKS PASSED (${failed} failures)`);
console.log('================================================================');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
