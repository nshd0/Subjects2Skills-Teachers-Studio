/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  TeacherRequest,
  GeneratedResource,
  LessonPlanData,
  WorksheetData,
  AssessmentData,
  RubricData,
  ProjectBriefData,
  LearningSequenceStep,
  DifferentiatedTasks,
  QuestioningPrompts,
} from '../types';

/**
 * High-quality completed mock output for Quick Example:
 * Stage: Middle, Grade: 7, Subject: Science, Topic: Heat Transfer, Duration: 40m
 */
const quickExampleLessonPlan: LessonPlanData = {
  title: 'Heat Transfer in Everyday Objects: Conduction, Convection & Radiation',
  contextSummary: 'Grade 7 Science · 40 Minutes · Middle Stage · Bilingual (Hindi/English) · No Internet · Materials: Steel spoon, cup of warm water, paper, chalkboard',
  suggestedCurricularGoal: 'CG-SCI-04: Understands how thermal energy transfers through different media and impacts everyday materials and weather phenomena.',
  suggestedCompetency: 'C-SCI-4.2: Investigates experimentally the transfer of heat by conduction, convection, and radiation in domestic and natural situations.',
  learningOutcomes: [
    'Observe and describe heat conduction through a steel spoon vs. a wooden pencil in warm water.',
    'Distinguish between conductors and insulators using locally available classroom items.',
    'Explain one domestic application of heat transfer (e.g., cooking vessels with wooden/plastic handles).'
  ],
  priorLearningCheck: [
    'What happens when you leave a steel spoon in hot dal or chai for 2 minutes?',
    'Why does a stone slab feel colder to barefoot touch in winter than a jute mat?',
    'How does warmth from an outdoor winter fire or sunlight reach your face without touching it?'
  ],
  learningSequence: [
    {
      step: 'Engage',
      duration: '5 min',
      teacherAction: 'Place a steel spoon and a wooden pencil into a cup of warm water at teacher desk. Ask two students to predict which tip will feel warm first.',
      studentAction: 'Observe, turn to neighbor, and write a 1-sentence prediction on their notebook slate.'
    },
    {
      step: 'Explore',
      duration: '10 min',
      teacherAction: 'Invite 3 student volunteers (rotating) to touch the exposed ends safely. Draw a simple heat-flow arrow on the chalkboard from water to spoon tip.',
      studentAction: 'Volunteers report sensation. Class sketches two columns in notebook: "Gains warmth fast" vs "Remains cool".'
    },
    {
      step: 'Explain',
      duration: '10 min',
      teacherAction: 'Define conduction in bilingual terms (heat moving particle-to-particle without movement of the medium itself). Contrast with convection (hot water rising) and radiation (sunlight warming earth).',
      studentAction: 'Note key terms in personal bilingual glossaries: Conduction (चालन), Convection (संवहन), Radiation (विकिरण).'
    },
    {
      step: 'Apply',
      duration: '10 min',
      teacherAction: 'Present 3 domestic puzzles on chalkboard: (1) Pressure cooker handle, (2) Stainless steel thali, (3) Clay matka / earthen pot.',
      studentAction: 'Work in pairs to classify each object as conductor or insulator and state why that material was chosen.'
    },
    {
      step: 'Reflect',
      duration: '5 min',
      teacherAction: 'Ask exit question: "If you want tea to stay warm longer without a lid, would you pour it in a metal glass or an earthen kulhad?"',
      studentAction: 'Write answer and 1-line reason on exit slip to hand to teacher at door.'
    }
  ],
  experientialActivity: 'Hands-on Spoon & Water Touch Probe: In small groups of 4, students submerge a metal spoon and a plastic pen/wooden ruler into warm water (not boiling). They monitor the temperature change along the handle at 30-second intervals to verify heat transmission.',
  differentiatedTasks: {
    support: [
      'Sort 4 pictured objects (iron nail, plastic scale, copper wire, dry twig) into Conductors and Insulators with a partner.',
      'Complete sentence stem: "Heat travels fastest through ______ because ______."'
    ],
    core: [
      'Sketch a frying pan and label where conduction is desirable (base) and where an insulator is essential (handle).',
      'Explain in 3 lines why birds fluff their feathers on cold mornings in northern India.'
    ],
    extension: [
      'Design a prototype "zero-electricity tiffin warmer" using scrap cloth, newspaper, and cardboard.',
      'Compare why traditional earthen clay homes in Rajasthan remain cooler during daytime compared to concrete roofs.'
    ]
  },
  questioningPrompts: {
    recall: 'What are three common materials in our classroom that conduct heat rapidly?',
    reasoning: 'Why does an empty steel tiffin get hot quickly in the sun while a wooden desk does not?',
    transfer: 'How do village roof designs (thatch vs tin sheets) exploit the principles of heat conduction and radiation?'
  },
  formativeAssessment: {
    observationChecklistItem: 'Student can distinguish at least two conductors from insulators and articulate that heat moves from higher to lower temperature.',
    exitTicketQuestion: 'Why is the outer body of an electric kettle plastic or bakelite, but its heating element base is metallic alloy?',
    feedbackSuggestions: [
      'For learners confusing temperature with heat: re-anchor with the "spoon tip" tangible experience.',
      'Affirm students who use bilingual daily-life analogies (tawa, kadai, pressure cooker).'
    ]
  },
  rubric: {
    competency: 'Investigates and classifies materials by thermal conductivity and explains real-life applications.',
    criteria: [
      {
        id: 'crit-1',
        criterion: 'Experimental Observation',
        beginning: 'Identifies hot and cold but cannot identify which material conducted heat.',
        developing: 'Recognizes that metal spoon warmed up faster than wood with teacher guidance.',
        secure: 'Independently records temperature difference and correctly labels conductor vs insulator.',
        extending: 'Systematically compares conduction rates across 3+ materials and records observations accurately.'
      },
      {
        id: 'crit-2',
        criterion: 'Scientific Explanation',
        beginning: 'Uses vague terms like "it just gets hot" without referencing heat flow direction.',
        developing: 'Explains heat transfer but confuses conduction with convection.',
        secure: 'Clearly articulates that thermal energy travels from hot water to spoon handle by conduction.',
        extending: 'Explains molecular transfer mechanism and contrasts conduction with radiation accurately.'
      },
      {
        id: 'crit-3',
        criterion: 'Real-world Application',
        beginning: 'Cannot connect classroom test to kitchen cookware handles.',
        developing: 'Identifies one cooking utensil with a heat-resistant handle.',
        secure: 'Explains why kitchen utensils pair conductive cooking surfaces with insulating handles.',
        extending: 'Analyzes architectural thermal insulation (mud walls, double glazing) using heat transfer principles.'
      }
    ]
  },
  lowTechAlternative: '100% Offline Chalk-and-Hands Activity: Use sunlight patch on the classroom floor and a shadow patch. Have students place palms on both stone floor areas to feel conduction and radiation without any lab apparatus.',
  teacherReflectionPrompt: 'Did students struggle more with the scientific vocabulary or the physical concept? In the next period, will we need an extra 5 minutes on convection currents using incense smoke or chalk dust?',
  safetyOrInclusionNote: 'Water must be lukewarm/warm to touch (below 45°C), never boiling. Ensure students with visual or tactile sensitivities can pair with a peer partner for touch observations.'
};

/**
 * Section regeneration variants pool
 */
export const sectionVariants: Record<string, string[]> = {
  suggestedCurricularGoal: [
    'CG-SCI-04: Understands how thermal energy transfers through different media and impacts everyday materials and weather phenomena.',
    'CG-SCI-02: Develops scientific inquiry skills through hands-on observation of everyday physical phenomena.',
    'CG-SCI-06: Relates principles of physical sciences to sustainable local living and appropriate technology choices.'
  ],
  suggestedCompetency: [
    'C-SCI-4.2: Investigates experimentally the transfer of heat by conduction, convection, and radiation in domestic and natural situations.',
    'C-SCI-4.1: Classifies natural and manufactured materials based on physical properties including thermal conductivity.',
    'C-SCI-4.5: Applies concepts of heat insulation to solve everyday household energy conservation challenges.'
  ],
  experientialActivity: [
    'Hands-on Spoon & Water Touch Probe: In small groups of 4, students submerge a metal spoon and a plastic pen/wooden ruler into warm water. They monitor the temperature change along the handle at 30-second intervals to verify heat transmission.',
    'Chalkboard Heat Map Relay: Students test items from their school bags (compass divider, pencil, eraser, steel ruler) in warm water and record them in an interactive chalkboard grid under "Fast Heat Conductor" vs "Thermal Insulator".',
    'Butter/Wax Melting Demonstration: Teacher places small dots of wax or butter on equidistant points along a metal ruler and a wooden chopstick over warm water, letting students observe which drops slide first.'
  ],
  lowTechAlternative: [
    '100% Offline Chalk-and-Hands Activity: Use sunlight patch on the classroom floor and a shadow patch. Have students place palms on both stone floor areas to feel conduction and radiation without any lab apparatus.',
    'Two-Cup Temperature Hold: Fill one clay kulhad / paper cup and one stainless steel glass with warm tap water. Have learners cup their hands around the sides at 1-minute intervals to compare surface temperature.',
    'Shadow and Sunlight Floor Grid: Draw a two-zone grid on courtyard ground with chalk. Students place their notebooks, metal pencil boxes, and cotton handkerchiefs in the sun for 10 minutes, then feel the difference.'
  ],
  teacherReflectionPrompt: [
    'Did students struggle more with the scientific vocabulary or the physical concept? In the next period, will we need an extra 5 minutes on convection currents using chalk dust?',
    'Were all student pairs able to participate equally in the tactile touch observation, or did confident students dominate the materials?',
    'How effectively did the bilingual terminology (चालन / संवहन) bridge conceptual understanding for first-generation school goers?'
  ],
  safetyOrInclusionNote: [
    'Water must be lukewarm/warm to touch (below 45°C), never boiling. Ensure students with visual or tactile sensitivities can pair with a peer partner for touch observations.',
    'Ensure no glass vessels are used; stainless steel or thick plastic cups only. Assign clear group roles to maintain order in crowded classrooms.',
    'For students with sensory sensitivities, provide optional cotton gloves or allow peer verbal reporting of temperature differences.'
  ]
};

/**
 * Dynamic generator based on form parameters
 */
export function generateMockResource(req: TeacherRequest): GeneratedResource {
  const isQuickExample = 
    req.grade === '7' && 
    req.subject.toLowerCase().includes('sci') && 
    req.topic.toLowerCase().includes('heat');

  const id = `res_${Date.now()}`;
  const createdAt = new Date().toISOString();

  if (req.desiredResource === 'Lesson Plan') {
    const lessonPlan: LessonPlanData = isQuickExample 
      ? JSON.parse(JSON.stringify(quickExampleLessonPlan))
      : buildGenericLessonPlan(req);
    
    // Customize context summary to match request
    lessonPlan.contextSummary = `${req.stage} Stage · Grade ${req.grade} · ${req.subject} · ${req.duration} Mins · ${req.language || 'English'} · Internet: ${req.internetAccess || 'None'}`;
    
    return {
      id,
      createdAt,
      request: req,
      resourceType: 'Lesson Plan',
      lessonPlan
    };
  }

  if (req.desiredResource === 'Worksheet') {
    const worksheet: WorksheetData = isQuickExample
      ? {
          title: `Grade 7 Science Worksheet: Thermal Conductivity & Heat Flow`,
          learningOutcome: 'Identify conductors vs insulators in domestic contexts and trace the direction of heat conduction.',
          studentTasks: [
            {
              taskNumber: 1,
              instruction: 'Circle the item that conducts heat fastest: (A) Wooden comb (B) Steel spoon (C) Cotton towel (D) Rubber eraser.',
              sampleAnswer: 'Answer: (B) Steel spoon. Metals have free electrons that transfer thermal kinetic energy rapidly.'
            },
            {
              taskNumber: 2,
              instruction: 'Fill in the blank: Heat always moves naturally from an object at ________ temperature to an object at ________ temperature.',
              sampleAnswer: 'Answer: higher (warmer); lower (cooler).'
            },
            {
              taskNumber: 3,
              instruction: 'Why do cooking pans in your kitchen have wooden, bakelite, or silicone handles?',
              sampleAnswer: 'Sample response: Cooking pans are metal to conduct heat into food, but handles are insulators so cooks can hold them without burning their hands.'
            },
            {
              taskNumber: 4,
              instruction: 'Classify these 4 household items: (1) Iron tawa, (2) Clay diya, (3) Copper vessel, (4) Woolen blanket into Conductors and Insulators.',
              sampleAnswer: 'Conductors: Iron tawa, Copper vessel. Insulators: Clay diya, Woolen blanket.'
            },
            {
              taskNumber: 5,
              instruction: 'Explain why two thin cotton bedsheets kept over each other keep you warmer in winter than one thick sheet.',
              sampleAnswer: 'Sample response: Air is trapped between the two layers, and trapped air is a poor conductor of heat (thermal insulator).'
            }
          ],
          differentiatedGuidance: {
            support: 'Provide a word bank: [Conductor, Insulator, Warm, Cool, Metal, Wood] and pictorial clues for tasks 1-3.',
            core: 'Complete all 5 tasks independently in student exercise book.',
            extension: 'Draw an annotated diagram of a thermos flask showing how it prevents conduction, convection, and radiation.'
          },
          lowTechNote: 'Can be written on the blackboard for students to copy directly into notebooks, requiring zero photocopies.'
        }
      : buildGenericWorksheet(req);

    return {
      id,
      createdAt,
      request: req,
      resourceType: 'Worksheet',
      worksheet
    };
  }

  if (req.desiredResource === 'Formative Assessment') {
    const assessment: AssessmentData = isQuickExample
      ? {
          title: `Grade 7 Formative Assessment Pack: Heat Transfer Diagnostic`,
          learningOutcome: 'Examine understanding of heat conduction mechanisms and evaluate diagnostic misconceptions.',
          items: [
            {
              itemNumber: 1,
              question: 'Diagnostic Check: "Does a woolen sweater give off heat on its own?" Explain your answer.',
              evaluationGuide: 'Misconception indicator: Students saying "yes, it generates heat" do not realize wool simply traps body heat as an insulator.'
            },
            {
              itemNumber: 2,
              question: 'Quick Prompt: What will happen to the temperature of a metal key placed in an ice-water glass after 5 minutes?',
              evaluationGuide: 'Correct answer explains heat leaves the key into cold water until thermal equilibrium is reached.'
            },
            {
              itemNumber: 3,
              question: 'Observation Task: Student touches both the wooden leg and the metal screw of their classroom desk. Which feels colder and why?',
              evaluationGuide: 'Both are at same room temperature; the metal feels colder because it conducts heat away from the finger faster.'
            },
            {
              itemNumber: 4,
              question: 'Short Application: Give two reasons why clay pots (matkas) keep drinking water cool during Indian summers.',
              evaluationGuide: 'Evaluates understanding of porous seepage and evaporative cooling (convection/latent heat).'
            },
            {
              itemNumber: 5,
              question: 'Exit Ticket: Name one conductor and one insulator you used before leaving home this morning.',
              evaluationGuide: 'Student connects classroom science to personal lived experience.'
            }
          ],
          observationChecklist: [
            'Differentiates between feeling warm and generating heat.',
            'Correctly identifies direction of heat flow (hot to cold).',
            'Connects material properties to practical function in tools.'
          ],
          exitTicketPrompt: 'On a slip of paper: "Write one thing that surprised you today about how heat moves."',
          feedbackSuggestions: [
            'Immediate verbal feedback: Praise students who articulate "heat moves away from my finger".',
            'Peer review: Have pairs exchange exit slips to verify whether their partner named an insulator or conductor.'
          ]
        }
      : buildGenericAssessment(req);

    return {
      id,
      createdAt,
      request: req,
      resourceType: 'Formative Assessment',
      assessment
    };
  }

  if (req.desiredResource === 'Rubric') {
    const rubric: RubricData = isQuickExample
      ? quickExampleLessonPlan.rubric
      : buildGenericRubric(req);

    return {
      id,
      createdAt,
      request: req,
      resourceType: 'Rubric',
      rubric
    };
  }

  // Project Brief
  const projectBrief: ProjectBriefData = isQuickExample
    ? {
        title: `Grade 7 Science Project Brief: The Low-Cost Classroom Cool/Warm Box Challenge`,
        drivingQuestion: 'How can we design an eco-friendly food or water container that maintains temperature without electricity?',
        finalProduct: 'A functioning prototype insulated container built using upcycled classroom materials, accompanied by a 1-page temperature log and presentation poster.',
        milestones: [
          {
            milestoneNumber: 1,
            name: 'Material Exploration & Testing',
            deliverable: 'Thermal test table evaluating 4 scrap materials (jute, newspaper, bubble wrap, dry leaves).',
            duration: 'Day 1–2 (2 periods)'
          },
          {
            milestoneNumber: 2,
            name: 'Prototype Construction',
            deliverable: 'Fabricated container housing a standard steel glass or tiffin box.',
            duration: 'Day 3–4 (2 periods)'
          },
          {
            milestoneNumber: 3,
            name: 'Thermal Performance Logging',
            deliverable: 'Line graph tracking water temperature at 0, 15, 30, and 60 minutes.',
            duration: 'Day 5 (1 period)'
          },
          {
            milestoneNumber: 4,
            name: 'Community Exhibition & Reflection',
            deliverable: '2-minute oral presentation demonstrating why their insulation design worked.',
            duration: 'Day 6 (1 period)'
          }
        ],
        crossSubjectLinks: [
          'Mathematics: Data collection, recording intervals, plotting time-temperature line graphs.',
          'Social Studies: Traditional climate-resilient architecture and indigenous storage containers across Indian states.',
          'Art & Work Education: Structural craft, joinery, neat labeling, and zero-waste upcycling.'
        ],
        evidenceOfLearning: [
          'Completed design notebook with labeled cross-sectional diagram of the insulated box.',
          'Empirical temperature comparison data sheet comparing uninsulated vs insulated vessel.',
          'Student self-reflection on collaborative problem-solving.'
        ],
        rubric: quickExampleLessonPlan.rubric
      }
    : buildGenericProjectBrief(req);

  return {
    id,
    createdAt,
    request: req,
    resourceType: 'Project Brief',
    projectBrief
  };
}

/**
 * Generic Lesson Plan builder for any requested subject/grade/topic
 */
function buildGenericLessonPlan(req: TeacherRequest): LessonPlanData {
  return {
    title: `${req.subject}: ${req.topic} (Grade ${req.grade})`,
    contextSummary: `${req.stage} Stage · Grade ${req.grade} · ${req.subject} · ${req.duration} Mins · ${req.language || 'English'} · Materials: ${req.materials || 'Chalkboard, student notebooks, everyday classroom items'}`,
    suggestedCurricularGoal: req.customGoalOrCompetency 
      ? req.customGoalOrCompetency 
      : `CG-${req.stage.substring(0, 3).toUpperCase()}-${req.grade}: Develops fundamental conceptual understanding and procedural fluency in ${req.subject} through inquiry and real-world connection.`,
    suggestedCompetency: `C-${req.subject.substring(0, 3).toUpperCase()}-${req.grade}.1: Observes, analyzes, and explains patterns, concepts, and applications in ${req.topic} using contextual evidence.`,
    learningOutcomes: [
      `Identify and describe core concepts of ${req.topic} using familiar daily-life examples.`,
      `Demonstrate understanding by solving a practical classroom puzzle or inquiry task in pairs.`,
      `Reflect on how ${req.topic} connects to local community or domestic practices.`
    ],
    priorLearningCheck: [
      `What everyday experience have you had that connects to ${req.topic}?`,
      `What is one thing we learned last week that might help us investigate this topic?`,
      `Can anyone share a local word or story related to this idea?`
    ],
    learningSequence: [
      {
        step: 'Engage',
        duration: '5 min',
        teacherAction: `Present a concrete mystery object, prompt, or local story related to ${req.topic}. Ask for initial student predictions.`,
        studentAction: 'Listen actively, discuss with desk partner for 60 seconds, and share 2 initial ideas.'
      },
      {
        step: 'Explore',
        duration: '10 min',
        teacherAction: `Distribute or display hands-on prompts for ${req.topic}. Circulate to prompt observation without giving away answers.`,
        studentAction: 'Examine items or problem prompt in pairs. Record 3 specific observations in notebooks.'
      },
      {
        step: 'Explain',
        duration: '10 min',
        teacherAction: `Synthesize student observations on chalkboard. Introduce formal terminology and foundational concepts for ${req.topic}.`,
        studentAction: 'Contribute findings from pair discussions. Copy structured mind map or notes into notebooks.'
      },
      {
        step: 'Apply',
        duration: '10 min',
        teacherAction: `Assign a contextual problem or classification exercise based on ${req.topic} tailored to class profile.`,
        studentAction: 'Work independently or in pairs to complete the challenge. Check work with neighboring peer.'
      },
      {
        step: 'Reflect',
        duration: '5 min',
        teacherAction: 'Facilitate a rapid 1-minute reflection and write the exit-ticket question on the chalkboard.',
        studentAction: 'Complete exit-ticket response in notebook and self-rate confidence (thumbs up / sideways).'
      }
    ],
    experientialActivity: `Collaborative Problem Station: Students work in groups of 3–4 with simple classroom items to model, classify, or solve a localized scenario reflecting ${req.topic}.`,
    differentiatedTasks: {
      support: [
        `Complete a guided visual organizer with sentence starters for ${req.topic}.`,
        'Identify 2 concrete examples with peer partner support.'
      ],
      core: [
        `Solve standard analytical questions and write a 3-sentence summary of ${req.topic}.`,
        'Illustrate the primary concept with a labeled diagram or flowchart.'
      ],
      extension: [
        `Formulate a "what if" question investigating an edge case or advanced application of ${req.topic}.`,
        'Create a peer teaching card or quiz prompt for the rest of the class.'
      ]
    },
    questioningPrompts: {
      recall: `What is the primary definition or key rule of ${req.topic}?`,
      reasoning: `Why does this outcome occur under these specific conditions? What is the cause?`,
      transfer: `How could an artisan, farmer, shopkeeper, or student use this knowledge in daily life?`
    },
    formativeAssessment: {
      observationChecklistItem: `Student can explain the central concept of ${req.topic} in their own words without reading directly from the textbook.`,
      exitTicketQuestion: `In one sentence, explain how ${req.topic} impacts something you see or use every day.`,
      feedbackSuggestions: [
        'Notice students who grasp the intuition before the technical terminology and affirm their thinking.',
        'Use targeted questioning to guide students with misconceptions towards self-correction.'
      ]
    },
    rubric: buildGenericRubric(req),
    lowTechAlternative: `Zero-Cost Chalkboard & Peer Think-Pair-Share: The entire lesson can be conducted with blackboard sketches, student notebooks, and oral discussions without paper printouts or digital tools.`,
    teacherReflectionPrompt: `Did the balance between teacher guidance and student inquiry suit today's lesson duration? Which students needed more scaffolding?`,
    safetyOrInclusionNote: `Ensure accessible physical arrangement for peer pairing. Provide bilingual verbal support for students developing language proficiency.`
  };
}

/**
 * Generic Worksheet builder
 */
function buildGenericWorksheet(req: TeacherRequest): WorksheetData {
  return {
    title: `Grade ${req.grade} ${req.subject} Practice Worksheet: ${req.topic}`,
    learningOutcome: `Apply core principles of ${req.topic} to solve standard problems and classify real-world situations.`,
    studentTasks: [
      {
        taskNumber: 1,
        instruction: `Recall & Identify: In your own words, state the core definition of ${req.topic}.`,
        sampleAnswer: `Model student response defining ${req.topic} with at least one accurate technical keyword.`
      },
      {
        taskNumber: 2,
        instruction: `Classification: List 3 local examples that illustrate this concept and 1 non-example.`,
        sampleAnswer: `3 valid examples from domestic/school life, and 1 contrasting counter-example.`
      },
      {
        taskNumber: 3,
        instruction: `Problem Solving: Work through the given scenario applying rules of ${req.topic}.`,
        sampleAnswer: `Step-by-step resolution showing clear mathematical or conceptual reasoning.`
      },
      {
        taskNumber: 4,
        instruction: `Analysis & Reasoning: Why is this concept important in designing everyday tools or understanding natural processes?`,
        sampleAnswer: `Thoughtful 2-line explanation linking concept to utility or natural behavior.`
      },
      {
        taskNumber: 5,
        instruction: `Creative Application: Create one challenge question on this topic for your classmate.`,
        sampleAnswer: `Well-posed inquiry question with its corresponding answer key.`
      }
    ],
    differentiatedGuidance: {
      support: 'Include a vocabulary helper box and provide sentence templates for tasks 1 and 2.',
      core: 'Complete tasks 1 through 5 with standard criteria and clear handwriting.',
      extension: 'Add a real-world case study or cross-disciplinary connection to task 4.'
    },
    lowTechNote: 'Can be dictated or transcribed directly onto the chalkboard for students to copy into their standard notebooks.'
  };
}

/**
 * Generic Assessment builder
 */
function buildGenericAssessment(req: TeacherRequest): AssessmentData {
  return {
    title: `Diagnostic & Formative Assessment: ${req.subject} - ${req.topic}`,
    learningOutcome: `Diagnose learner readiness, identify common misconceptions, and verify mastery of ${req.topic}.`,
    items: [
      {
        itemNumber: 1,
        question: `Diagnostic Item: What is your intuitive understanding of ${req.topic}?`,
        evaluationGuide: 'Check for foundational baseline knowledge and prior misconceptions.'
      },
      {
        itemNumber: 2,
        question: `Concept Check: Identify the key distinction between core variables in ${req.topic}.`,
        evaluationGuide: 'Correct answer names the differential property accurately.'
      },
      {
        itemNumber: 3,
        question: `Application Prompt: Solve a short real-life problem based on ${req.topic}.`,
        evaluationGuide: 'Assesses whether the student can apply the formula or concept beyond textbook definitions.'
      },
      {
        itemNumber: 4,
        question: `Reasoning Question: Explain why an unexpected result occurred in the scenario.`,
        evaluationGuide: 'Measures depth of cause-and-effect reasoning.'
      },
      {
        itemNumber: 5,
        question: `Exit Reflection: Rate your clarity on this topic from 1 to 5 and note what remains unclear.`,
        evaluationGuide: 'Formative feedback tool for teacher instructional planning.'
      }
    ],
    observationChecklist: [
      `Active engagement in problem-solving discussions.`,
      `Accurate use of subject terminology in spoken or written responses.`,
      `Ability to explain reasoning to a peer.`
    ],
    exitTicketPrompt: `On a slip of paper: "One thing I learned today, and one question I still have."`,
    feedbackSuggestions: [
      'Provide affirmative specific feedback rather than generic marks.',
      'Group students needing support for a 5-minute targeted review during the next session.'
    ]
  };
}

/**
 * Generic Rubric builder
 */
function buildGenericRubric(req: TeacherRequest): RubricData {
  return {
    competency: `Demonstrates conceptual understanding and practical application of ${req.topic} in ${req.subject}.`,
    criteria: [
      {
        id: 'crit-gen-1',
        criterion: 'Conceptual Knowledge',
        beginning: `Recalls isolated terms but shows confusion about fundamental principles of ${req.topic}.`,
        developing: `Defines ${req.topic} with partial accuracy; requires teacher prompts to recall key facts.`,
        secure: `Accurately explains core concepts of ${req.topic} using correct terminology and examples.`,
        extending: `Integrates multiple concepts, articulates nuanced insights, and identifies underlying principles.`
      },
      {
        id: 'crit-gen-2',
        criterion: 'Application & Inquiry',
        beginning: `Struggles to apply concept to unfamiliar examples without step-by-step guidance.`,
        developing: `Solves straightforward standard textbook problems with occasional calculation or logic errors.`,
        secure: `Independently applies principles of ${req.topic} to solve novel classroom and domestic scenarios.`,
        extending: `Devises creative problem-solving approaches and justifies choices with sound reasoning.`
      },
      {
        id: 'crit-gen-3',
        criterion: 'Communication & Reasoning',
        beginning: `Gives one-word answers; unable to explain why an answer was reached.`,
        developing: `Explains answers verbally with support, but written responses lack structural clarity.`,
        secure: `Clearly articulates reasoning using diagrams, appropriate symbols, and coherent sentences.`,
        extending: `Critically evaluates alternate explanations and presents compelling evidence-based conclusions.`
      }
    ]
  };
}

/**
 * Generic Project Brief builder
 */
function buildGenericProjectBrief(req: TeacherRequest): ProjectBriefData {
  return {
    title: `Curiosity to Capability: ${req.topic} Community Inquiry Project`,
    drivingQuestion: `How can we use our knowledge of ${req.topic} to address a genuine need in our school or neighbourhood?`,
    finalProduct: `A student-made working model, illustrated field report, or actionable community guide demonstrating ${req.topic}.`,
    milestones: [
      {
        milestoneNumber: 1,
        name: 'Inquiry & Problem Definition',
        deliverable: 'Mind map and 3 core research questions brainstormed in teams.',
        duration: '1–2 Periods'
      },
      {
        milestoneNumber: 2,
        name: 'Investigation & Data Collection',
        deliverable: 'Field notes, interview records, or experiment logbook with observations.',
        duration: '2–3 Periods'
      },
      {
        milestoneNumber: 3,
        name: 'Artifact Creation & Testing',
        deliverable: 'Draft prototype or model prepared from recycled/low-cost materials.',
        duration: '2 Periods'
      },
      {
        milestoneNumber: 4,
        name: 'Exhibition & Peer Assessment',
        deliverable: 'Classroom showcase with 3-minute oral presentations and peer rubric evaluation.',
        duration: '1 Period'
      }
    ],
    crossSubjectLinks: [
      `Language: Structured presentation, concise reporting, and vocabulary enrichment.`,
      `Mathematics: Data measurement, scale estimation, and tabulation.`,
      `Art / Craft: Visual communication, model construction, and spatial design.`
    ],
    evidenceOfLearning: [
      'Project inquiry portfolio containing student notes and progress drafts.',
      'Physical artifact or illustrated board showcasing the practical solution.',
      'Self-evaluation and peer feedback forms completed using the 4-level rubric.'
    ],
    rubric: buildGenericRubric(req)
  };
}

/**
 * Helper to format a resource as clean text for clipboard / download
 */
export function formatResourceAsText(resource: GeneratedResource): string {
  const req = resource.request;
  const divider = '============================================================';
  const subDivider = '------------------------------------------------------------';

  let text = `SUBJECTS2SKILLS TEACHER STUDIO
From syllabus coverage to student capability
Aligned with NEP 2020 & NCF-SE 2023 Principles
Suggested — teacher review required. Independent teacher planning tool.
${divider}\n\n`;

  text += `RESOURCE TYPE: ${resource.resourceType.toUpperCase()}\n`;
  text += `STAGE: ${req.stage} Stage | GRADE: ${req.grade} | SUBJECT: ${req.subject}\n`;
  text += `TOPIC: ${req.topic} | DURATION: ${req.duration} Minutes\n`;
  if (req.language) text += `TEACHING LANGUAGE: ${req.language}\n`;
  if (req.materials) text += `MATERIALS: ${req.materials}\n`;
  if (req.internetAccess) text += `INTERNET ACCESS: ${req.internetAccess}\n`;
  text += `GENERATED ON: ${new Date(resource.createdAt).toLocaleDateString()}\n\n`;

  if (resource.lessonPlan) {
    const lp = resource.lessonPlan;
    text += `${divider}\nLESSON PLAN: ${lp.title}\n${divider}\n\n`;
    text += `CONTEXT SUMMARY:\n${lp.contextSummary}\n\n`;
    text += `SUGGESTED CURRICULAR GOAL (Teacher review required):\n${lp.suggestedCurricularGoal}\n\n`;
    text += `SUGGESTED COMPETENCY (Teacher review required):\n${lp.suggestedCompetency}\n\n`;
    text += `SUGGESTED LEARNING OUTCOMES:\n${lp.learningOutcomes.map((lo, i) => `${i + 1}. ${lo}`).join('\n')}\n\n`;
    text += `PRIOR-LEARNING CHECK:\n${lp.priorLearningCheck.map((p, i) => `* ${p}`).join('\n')}\n\n`;
    text += `${subDivider}\nLEARNING SEQUENCE (5E FRAMEWORK):\n${subDivider}\n`;
    lp.learningSequence.forEach(s => {
      text += `[${s.step.toUpperCase()} - ${s.duration}]\n`;
      text += `Teacher Action: ${s.teacherAction}\n`;
      text += `Student Action: ${s.studentAction}\n\n`;
    });
    text += `EXPERIENTIAL ACTIVITY:\n${lp.experientialActivity}\n\n`;
    text += `DIFFERENTIATED TASKS:\n`;
    text += `Support:\n${lp.differentiatedTasks.support.map(t => `  - ${t}`).join('\n')}\n`;
    text += `Core:\n${lp.differentiatedTasks.core.map(t => `  - ${t}`).join('\n')}\n`;
    text += `Extension:\n${lp.differentiatedTasks.extension.map(t => `  - ${t}`).join('\n')}\n\n`;
    text += `TEACHER QUESTIONING PROMPTS:\n`;
    text += `Recall: ${lp.questioningPrompts.recall}\n`;
    text += `Reasoning: ${lp.questioningPrompts.reasoning}\n`;
    text += `Transfer: ${lp.questioningPrompts.transfer}\n\n`;
    text += `FORMATIVE ASSESSMENT:\n`;
    text += `Observation Item: ${lp.formativeAssessment.observationChecklistItem}\n`;
    text += `Exit Ticket: ${lp.formativeAssessment.exitTicketQuestion}\n\n`;
    text += `COMPACT 4-LEVEL RUBRIC:\nCompetency: ${lp.rubric.competency}\n`;
    lp.rubric.criteria.forEach((c, i) => {
      text += `Criterion ${i + 1}: ${c.criterion}\n`;
      text += `  - Beginning: ${c.beginning}\n`;
      text += `  - Developing: ${c.developing}\n`;
      text += `  - Secure: ${c.secure}\n`;
      text += `  - Extending: ${c.extending}\n`;
    });
    text += `\nLOW-TECH / NO-INTERNET ALTERNATIVE:\n${lp.lowTechAlternative}\n\n`;
    text += `TEACHER REFLECTION PROMPT:\n${lp.teacherReflectionPrompt}\n\n`;
    text += `SAFETY & INCLUSION NOTE:\n${lp.safetyOrInclusionNote}\n\n`;
  } else if (resource.worksheet) {
    const ws = resource.worksheet;
    text += `${divider}\nWORKSHEET: ${ws.title}\n${divider}\n\n`;
    text += `LEARNING OUTCOME:\n${ws.learningOutcome}\n\n`;
    text += `STUDENT TASKS:\n`;
    ws.studentTasks.forEach(t => {
      text += `Task ${t.taskNumber}: ${t.instruction}\n`;
      text += `Answer Guide: ${t.sampleAnswer}\n\n`;
    });
    text += `DIFFERENTIATION GUIDANCE:\n`;
    text += `Support: ${ws.differentiatedGuidance.support}\n`;
    text += `Core: ${ws.differentiatedGuidance.core}\n`;
    text += `Extension: ${ws.differentiatedGuidance.extension}\n\n`;
    text += `LOW-TECH NOTE:\n${ws.lowTechNote}\n\n`;
  } else if (resource.assessment) {
    const as = resource.assessment;
    text += `${divider}\nFORMATIVE ASSESSMENT PACK: ${as.title}\n${divider}\n\n`;
    text += `LEARNING OUTCOME:\n${as.learningOutcome}\n\n`;
    text += `DIAGNOSTIC & FORMATIVE ITEMS:\n`;
    as.items.forEach(item => {
      text += `Item ${item.itemNumber}: ${item.question}\n`;
      text += `Evaluation Guide: ${item.evaluationGuide}\n\n`;
    });
    text += `OBSERVATION CHECKLIST:\n${as.observationChecklist.map(c => `[ ] ${c}`).join('\n')}\n\n`;
    text += `EXIT TICKET PROMPT:\n${as.exitTicketPrompt}\n\n`;
    text += `FEEDBACK SUGGESTIONS:\n${as.feedbackSuggestions.map(f => `* ${f}`).join('\n')}\n\n`;
  } else if (resource.rubric) {
    const rb = resource.rubric;
    text += `${divider}\nCOMPETENCY-BASED RUBRIC\n${divider}\n\n`;
    text += `COMPETENCY: ${rb.competency}\n\n`;
    rb.criteria.forEach((c, i) => {
      text += `CRITERION ${i + 1}: ${c.criterion}\n`;
      text += `  Beginning (Level 1): ${c.beginning}\n`;
      text += `  Developing (Level 2): ${c.developing}\n`;
      text += `  Secure (Level 3): ${c.secure}\n`;
      text += `  Extending (Level 4): ${c.extending}\n\n`;
    });
  } else if (resource.projectBrief) {
    const pb = resource.projectBrief;
    text += `${divider}\nPROJECT BRIEF: ${pb.title}\n${divider}\n\n`;
    text += `DRIVING QUESTION:\n${pb.drivingQuestion}\n\n`;
    text += `FINAL PRODUCT:\n${pb.finalProduct}\n\n`;
    text += `MILESTONES:\n`;
    pb.milestones.forEach(m => {
      text += `Milestone ${m.milestoneNumber}: ${m.name} (${m.duration})\n`;
      text += `Deliverable: ${m.deliverable}\n\n`;
    });
    text += `CROSS-SUBJECT LINKS:\n${pb.crossSubjectLinks.map(l => `* ${l}`).join('\n')}\n\n`;
    text += `EVIDENCE OF LEARNING:\n${pb.evidenceOfLearning.map(e => `* ${e}`).join('\n')}\n\n`;
  }

  text += `${divider}\nNotice: Suggested curriculum materials are draft educator aids and require teacher review prior to classroom implementation. Not affiliated with CBSE/NCERT.`;

  return text;
}
