/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ToolkitItem } from '../types';

export const toolkitItems: ToolkitItem[] = [
  {
    id: 'workflow-manual',
    title: 'K–12 Teacher Workflow Manual',
    stage: 'All Stages',
    format: 'Guide & Quick Checklist (3 pages)',
    description: 'A 5-step daily routine for transitioning from syllabus chapter delivery to competency demonstration in 40-minute periods.',
    sampleContent: {
      overview: 'This manual codifies the transition from rote textbook lecturing to competency-based instruction within normal Indian classroom constraints.',
      keyCheckpoints: [
        '5-minute anchor: Begin every period with a tangible dilemma or local question, not definitions.',
        'No student sits passive for >12 minutes: Intersperse brief pair tasks or notebook responses.',
        'Visible competency check: Conclude with an observable exit signal (ticket, slate gesture, thumbs).'
      ],
      classroomSnippet: 'Teacher Script: "Before opening our textbooks today, observe this glass of water on my desk. Who can predict why drops form on the outside in July but not in April?"',
      teacherTip: 'Keep a small box of scrap slips by the door. Exit tickets take 90 seconds to review and guide your next lesson starter.'
    }
  },
  {
    id: 'foundational-checklists',
    title: 'Foundational Stage Checklists',
    stage: 'Foundational',
    format: 'Observational Rubric Grid',
    description: 'Panchakosha-aligned observational checklists for Grades 1–2 tracking early literacy, numeracy, and physical coordination.',
    sampleContent: {
      overview: 'Holistic child development observation guide structured across physical (Annamaya), vitality (Pranamaya), and intellectual (Vijnanamaya) dimensions.',
      keyCheckpoints: [
        'Phonemic play: Identifies initial sounds in spoken mother tongue and simple English words.',
        'Number sense: Subitizes up to 5 objects without counting one-by-one.',
        'Social harmony: Shares chalk, crayons, and waits turns in circle time activities.'
      ],
      classroomSnippet: 'Sample Activity: "Counting Seeds in Tamarind Pods" — children sort, compare pairs, and practice cardinality through tactile touch.',
      teacherTip: 'Do not test pencil-paper skills for Foundational stage; record observations unobtrusively during free play.'
    }
  },
  {
    id: 'preparatory-planner',
    title: 'Preparatory Stage Lesson Planner',
    stage: 'Preparatory',
    format: 'Modular 45-Min Planning Template',
    description: 'Activity-based inquiry planner for Grades 3–5 bridging concrete play into foundational reading, math, and environmental awareness.',
    sampleContent: {
      overview: 'Designed for Grades 3–5, this template emphasizes guided exploration, vocabulary building in bilingual classrooms, and student peer talk.',
      keyCheckpoints: [
        'Connect local environment (Paryavaran) directly to the textbook topic.',
        'Balance oral verbalization with simple pictorial drawing and structured writing.',
        'Use peer partner reading (Jodi mein padhna) to support diverse language readiness.'
      ],
      classroomSnippet: 'Classroom Prompt: "Ask your grandparent or neighbour how water was stored 40 years ago in your town. Compare with your tap today."',
      teacherTip: 'Provide graphic organizers with simple boxes to reduce writing anxiety in multi-grade classrooms.'
    }
  },
  {
    id: 'middle-inquiry-planner',
    title: 'Middle Stage Inquiry Planner',
    stage: 'Middle',
    format: '5E Inquiry Framework Sheet',
    description: 'Structured 5E (Engage, Explore, Explain, Apply, Reflect) inquiry planner for Grades 6–8 science, math, and social sciences.',
    sampleContent: {
      overview: 'Structured pedagogical blueprint for Grades 6–8 fostering critical thinking, experimentation with zero-cost apparatus, and dialectical debate.',
      keyCheckpoints: [
        'Engage: Puzzling phenomenon or counter-intuitive demonstration.',
        'Explore: Student-led data logging or classification in teams.',
        'Explain: Student hypotheses first; teacher formal terminology second.',
        'Apply: Domestic or local community scenario problem.',
        'Reflect: Metacognitive self-assessment on what was easy vs challenging.'
      ],
      classroomSnippet: 'Exploration Challenge: "Using only your wooden scale, eraser, and compass point, construct a balanced lever and find the center of mass."',
      teacherTip: 'Rotate group roles (Materials Manager, Timer, Reporter) weekly so all students practice diverse leadership skills.'
    }
  },
  {
    id: 'secondary-project-planner',
    title: 'Secondary Stage Project Planner',
    stage: 'Secondary',
    format: 'Multi-Week Project Scaffold',
    description: 'Authentic project-based blueprint for Grades 9–12 connecting board syllabus standards to community problems and research inquiry.',
    sampleContent: {
      overview: 'Enables high school teachers to conduct multidisciplinary projects that fulfill internal assessment criteria without compromising syllabus pacing.',
      keyCheckpoints: [
        'Driving question rooted in local community (e.g. soil salinity, local traffic, oral histories).',
        'Staged deliverables prevent end-of-term panic submissions.',
        'Explicit alignment with Board internal assessment guidelines.'
      ],
      classroomSnippet: 'Driving Question: "How can our school audit and reduce single-use plastic consumption across 600 students by 30% this term?"',
      teacherTip: 'Schedule two in-class milestone checkpoints. Never assign an entire project to be completed exclusively at home.'
    }
  },
  {
    id: 'competency-rubrics-bank',
    title: 'Competency-Based Assessment Rubrics',
    stage: 'All Stages',
    format: '4-Level Criterion Matrix Bank',
    description: 'Plug-and-play 4-level descriptive rubrics (Beginning, Developing, Secure, Extending) for 20 common Indian curriculum competencies.',
    sampleContent: {
      overview: 'Eliminates arbitrary mark allocation by replacing numerical grades with clear developmental descriptors across 4 recognizable performance stages.',
      keyCheckpoints: [
        'Beginning: Demonstrates partial recall with extensive guidance.',
        'Developing: Executes standard procedures with occasional gaps.',
        'Secure: Meets grade-level competency independently and consistently.',
        'Extending: Demonstrates deeper conceptual transfer and problem formulation.'
      ],
      classroomSnippet: 'Rubric Criterion: "Formulating Hypotheses" — from guessing randomly (Beginning) to generating testable variables with causal logic (Extending).',
      teacherTip: 'Share the rubric with students before they begin an assignment so expectations are completely transparent.'
    }
  },
  {
    id: 'multidisciplinary-bank',
    title: 'Multidisciplinary Project Bank',
    stage: 'Middle',
    format: 'Curriculum Crosswalk Grid',
    description: '15 ready-to-run thematic cross-curricular projects linking Science, Mathematics, Social Sciences, and Art education.',
    sampleContent: {
      overview: 'Integrates concepts from multiple subjects around universal Indian themes like "The Monsoon Cycle", "The Weekly Haat/Bazaar", and "Heritage Monuments".',
      keyCheckpoints: [
        'The Monsoon Project: Science (condensation/evaporation) + Math (rainfall bar graphs) + Geography (monsoon winds) + Hindi (monsoon poetry).',
        'The Weekly Bazaar: Math (profit/loss, estimation) + Economics (supply/demand) + Social (barter to UPI transactions).',
        'Low-cost materials: Uses cardboard boxes, scrap cloth, old newspapers, and local soil samples.'
      ],
      classroomSnippet: 'Student Assignment: "Interview 2 vendors at the local weekly vegetable market about price fluctuations during seasonal rains."',
      teacherTip: 'Co-teach or coordinate with subject colleagues to schedule shared project weeks without doubling student homework load.'
    }
  }
];
