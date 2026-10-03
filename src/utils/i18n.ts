/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LanguageCode = 'en' | 'hi';

export const translations = {
  en: {
    appName: 'Subjects2Skills',
    appStudio: 'Teacher Studio',
    tagline: 'From syllabus coverage to student capability.',
    subtitle: 'Free, teacher-controlled lesson planning aligned with NEP 2020 & NCF-SE 2023 principles.',
    navHome: 'Home',
    navCreate: 'Create Resource',
    navToolkit: 'Toolkit Library',
    navAbout: 'About & Safety',
    navFeedback: 'Feedback',
    quickExample: 'Quick Example (Grade 7 Heat)',
    generateResource: 'Generate Resource',
    generating: 'Preparing Classroom Pack...',
    regenerateSection: 'Regenerate this section',
    editSection: 'Edit',
    saveSection: 'Save',
    cancel: 'Cancel',
    printSavePdf: 'Print / Save PDF',
    copyClipboard: 'Copy to clipboard',
    downloadTxt: 'Download .txt',
    copiedToast: 'Resource copied to clipboard!',
    downloadedToast: 'Resource downloaded as .txt',
    reviewRequiredBadge: 'Suggested — teacher review required',
    officialDisclaimer: 'Independent teacher planning tool. Not affiliated with or endorsed by CBSE, NCERT, or Ministry of Education.',
    
    // Form Labels
    stageLabel: 'School Stage',
    gradeLabel: 'Grade',
    subjectLabel: 'Subject or Learning Area',
    topicLabel: 'Topic or Unit',
    durationLabel: 'Lesson Duration',
    resourceTypeLabel: 'Desired Resource',
    classroomContextToggle: 'Classroom Context (Optional)',
    languageLabel: 'Teaching Language',
    classSizeLabel: 'Estimated Class Size',
    materialsLabel: 'Available Materials in Room',
    internetLabel: 'Internet / Device Access',
    learnerProfileLabel: 'Learner Profile',
    localContextLabel: 'Local Context or Local Example',
    customGoalLabel: 'Teacher-entered Curricular Goal / Outcome (Optional)',
    
    // Stages
    foundationalStage: 'Foundational (Grades 1-2)',
    preparatoryStage: 'Preparatory (Grades 3-5)',
    middleStage: 'Middle (Grades 6-8)',
    secondaryStage: 'Secondary (Grades 9-12)',
    
    // Options
    mins: 'minutes',
    none: 'None',
    limited: 'Limited',
    available: 'Available',
    
    // Resource types
    lessonPlan: 'Lesson Plan',
    worksheet: 'Worksheet',
    formativeAssessment: 'Formative Assessment',
    rubric: 'Rubric',
    projectBrief: 'Project Brief',

    // Section Titles
    sectionContext: 'Teacher Context Summary',
    sectionCurricularGoal: 'Suggested Curricular Goal',
    sectionCompetency: 'Suggested Competency',
    sectionLearningOutcomes: 'Suggested Learning Outcomes',
    sectionPriorLearning: 'Prior-Learning Check',
    sectionLearningSequence: 'Learning Sequence (5E Framework)',
    sectionExperiential: 'Experiential Activity',
    sectionDifferentiation: 'Differentiated Tasks',
    sectionQuestioning: 'Teacher Questioning Prompts',
    sectionAssessment: 'Formative Assessment',
    sectionRubric: 'Compact Competency Rubric',
    sectionLowTech: 'Low-Tech / No-Internet Alternative',
    sectionReflection: 'Teacher Reflection Prompt',
    sectionSafety: 'Safety & Inclusion Note',

    // Rubric Columns
    rubricBeginning: 'Beginning (1)',
    rubricDeveloping: 'Developing (2)',
    rubricSecure: 'Secure (3)',
    rubricExtending: 'Extending (4)',

    // Feedback
    feedbackTitle: 'Educator Feedback',
    feedbackSub: 'Help us make this lightweight tool more useful for your day-to-day teaching.',
    roleTeacher: 'Classroom Teacher',
    roleCoordinator: 'Academic Coordinator',
    roleLeader: 'School Leader / Principal',
    roleOther: 'Other Educator',
    usefulField: 'Which part of the generated resource is most practical?',
    missingField: 'What was missing or needs refinement for your classroom?',
    repeatField: 'Would you use this tool for your weekly planning?',
    emailOptional: 'Email (Optional, for future pilot updates)',
    submitFeedback: 'Submit Feedback',
    feedbackSuccess: 'Thank you! Your feedback has been recorded locally.',
  },
  hi: {
    appName: 'Subjects2Skills',
    appStudio: 'शिक्षक स्टूडियो',
    tagline: 'पाठ्यक्रम कवरेज से छात्र क्षमता तक।',
    subtitle: 'एनईपी 2020 और एनसीएफ-एसई 2023 सिद्धांतों के अनुरूप निःशुल्क, शिक्षक-नियंत्रित पाठ नियोजन।',
    navHome: 'होम',
    navCreate: 'संसाधन बनाएं',
    navToolkit: 'टूलकिट लाइब्रेरी',
    navAbout: 'सुरक्षा व नीति',
    navFeedback: 'प्रतिक्रिया',
    quickExample: 'त्वरित उदाहरण (कक्षा 7 ऊष्मा)',
    generateResource: 'संसाधन तैयार करें',
    generating: 'कक्षा संसाधन तैयार हो रहा है...',
    regenerateSection: 'यह अनुभाग पुनः तैयार करें',
    editSection: 'संपादित करें',
    saveSection: 'सहेजें',
    cancel: 'रद्द करें',
    printSavePdf: 'प्रिंट / PDF सहेजें',
    copyClipboard: 'क्लिपबोर्ड पर कॉपी करें',
    downloadTxt: '.txt डाउनलोड करें',
    copiedToast: 'संसाधन क्लिपबोर्ड पर कॉपी हो गया!',
    downloadedToast: 'संसाधन .txt रूप में डाउनलोड हुआ',
    reviewRequiredBadge: 'सुझाया गया — शिक्षक समीक्षा आवश्यक',
    officialDisclaimer: 'स्वतंत्र शिक्षक नियोजन उपकरण। सीबीएसई, एनसीईआरटी या शिक्षा मंत्रालय द्वारा समर्थित नहीं है।',
    
    // Form Labels
    stageLabel: 'विद्यालय चरण',
    gradeLabel: 'कक्षा',
    subjectLabel: 'विषय या अध्ययन क्षेत्र',
    topicLabel: 'विषय या इकाई',
    durationLabel: 'कालांश अवधि',
    resourceTypeLabel: 'वांछित संसाधन',
    classroomContextToggle: 'कक्षा संदर्भ (वैकल्पिक)',
    languageLabel: 'शिक्षण भाषा',
    classSizeLabel: 'अनुमानित छात्र संख्या',
    materialsLabel: 'कक्षा में उपलब्ध सामग्री',
    internetLabel: 'इंटरनेट / उपकरण उपलब्धता',
    learnerProfileLabel: 'शिक्षार्थी प्रोफ़ाइल',
    localContextLabel: 'स्थानीय संदर्भ या स्थानीय उदाहरण',
    customGoalLabel: 'शिक्षक-प्रविष्ट पाठ्यचर्या लक्ष्य (वैकल्पिक)',
    
    // Stages
    foundationalStage: 'बुनियादी चरण (कक्षा 1-2)',
    preparatoryStage: 'तैयारी चरण (कक्षा 3-5)',
    middleStage: 'मध्य चरण (कक्षा 6-8)',
    secondaryStage: 'माध्यमिक चरण (कक्षा 9-12)',
    
    // Options
    mins: 'मिनट',
    none: 'अनुपलब्ध',
    limited: 'सीमित',
    available: 'उपलब्ध',
    
    // Resource types
    lessonPlan: 'पाठ योजना (Lesson Plan)',
    worksheet: 'कार्यपत्रक (Worksheet)',
    formativeAssessment: 'रचनात्मक मूल्यांकन (Formative Assessment)',
    rubric: 'रूब्रिक (Rubric)',
    projectBrief: 'परियोजना विवरण (Project Brief)',

    // Section Titles
    sectionContext: 'शिक्षक संदर्भ सारांश',
    sectionCurricularGoal: 'सुझाया गया पाठ्यचर्या लक्ष्य',
    sectionCompetency: 'सुझाई गई क्षमता (Competency)',
    sectionLearningOutcomes: 'सुझाए गए अधिगम प्रतिफल (Learning Outcomes)',
    sectionPriorLearning: 'पूर्व-ज्ञान की जांच',
    sectionLearningSequence: 'शिक्षण क्रम (5E फ्रेमवर्क)',
    sectionExperiential: 'अनुभवात्मक गतिविधि',
    sectionDifferentiation: 'विभेदित कार्य (Differentiated Tasks)',
    sectionQuestioning: 'शिक्षक प्रश्नोत्तरी संकेत',
    sectionAssessment: 'रचनात्मक मूल्यांकन',
    sectionRubric: 'संक्षिप्त क्षमता रूब्रिक',
    sectionLowTech: 'कम संसाधन / ऑफ़लाइन विकल्प',
    sectionReflection: 'शिक्षक चिंतन संकेत',
    sectionSafety: 'सुरक्षा और समावेशी टिप्पणी',

    // Rubric Columns
    rubricBeginning: 'प्रारंभिक (1)',
    rubricDeveloping: 'विकासशील (2)',
    rubricSecure: 'सुरक्षित (3)',
    rubricExtending: 'विस्तारित (4)',

    // Feedback
    feedbackTitle: 'शिक्षक प्रतिक्रिया',
    feedbackSub: 'इस टूल को आपके दैनिक शिक्षण के लिए और अधिक उपयोगी बनाने में सहायता करें।',
    roleTeacher: 'कक्षा शिक्षक',
    roleCoordinator: 'अकादमिक समन्वयक',
    roleLeader: 'प्रधानाचार्य / विद्यालय प्रमुख',
    roleOther: 'अन्य शिक्षक',
    usefulField: 'तैयार संसाधन का कौन सा भाग सबसे उपयोगी है?',
    missingField: 'आपकी कक्षा के लिए क्या कमी रह गई या सुधार चाहिए?',
    repeatField: 'क्या आप अपनी साप्ताहिक योजना के लिए इसका उपयोग करेंगे?',
    emailOptional: 'ईमेल (वैकल्पिक)',
    submitFeedback: 'प्रतिक्रिया भेजें',
    feedbackSuccess: 'धन्यवाद! आपकी प्रतिक्रिया स्थानीय रूप से दर्ज हो गई है।',
  }
};
