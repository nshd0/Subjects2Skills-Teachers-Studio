/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GeneratedResource, LessonPlanData, LearningSequenceStep } from '../types';
import { LanguageCode, translations } from '../utils/i18n';
import { PrintToolbar } from '../components/PrintToolbar';
import { GeneratedSection } from '../components/GeneratedSection';
import { RubricTable } from '../components/RubricTable';
import { sectionVariants } from '../services/mockGenerator';
import { requestSectionRegeneration } from '../services/apiService';
import { AlertCircle, Clock, CheckCircle2, Lightbulb, ShieldAlert, Sparkles, RefreshCw, Cpu, RotateCcw, ClipboardCheck } from 'lucide-react';

interface GeneratedResourcePageProps {
  resource: GeneratedResource;
  onModifyInputs: () => void;
  lang: LanguageCode;
  generationNotice?: string | null;
  usedFallback?: boolean;
  onRetryGeneration?: () => void;
}

export const GeneratedResourcePage: React.FC<GeneratedResourcePageProps> = ({
  resource: initialResource,
  onModifyInputs,
  lang,
  generationNotice,
  usedFallback = false,
  onRetryGeneration,
}) => {
  const [resource, setResource] = useState<GeneratedResource>(initialResource);
  const t = translations[lang];

  // Pre-export teacher review checklist state
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    competencyChecked: false,
    activityFeasible: false,
    languageAppropriate: false,
    materialsAvailable: false,
    assessmentMatchesOutcome: false,
    supportAdaptedForLearners: false,
  });

  const toggleChecklist = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const confirmedCount = Object.values(checklist).filter(Boolean).length;

  // Synchronize internal state whenever initialResource prop updates
  React.useEffect(() => {
    setResource(initialResource);
  }, [initialResource]);

  // Section variant rotation counters
  const [variantIndices, setVariantIndices] = useState<Record<string, number>>({});

  const rotateVariant = (sectionKey: string): string => {
    const list = sectionVariants[sectionKey] || [];
    if (list.length === 0) return '';
    const currentIndex = variantIndices[sectionKey] || 0;
    const nextIndex = (currentIndex + 1) % list.length;
    setVariantIndices({ ...variantIndices, [sectionKey]: nextIndex });
    return list[nextIndex];
  };

  // Regeneration handlers for specific Lesson Plan fields (server-side Gemini with local fallback)
  const handleRegenerateField = async (field: keyof LessonPlanData, variantKey: string) => {
    if (!resource.lessonPlan) return;
    const currentVal = resource.lessonPlan[field];
    const currentIndex = variantIndices[variantKey] || 0;

    const res = await requestSectionRegeneration(variantKey, resource.request, currentVal, currentIndex);
    setVariantIndices((prev) => ({ ...prev, [variantKey]: currentIndex + 1 }));

    if (res.updatedContent) {
      setResource((prev) => {
        if (!prev.lessonPlan) return prev;
        return {
          ...prev,
          lessonPlan: {
            ...prev.lessonPlan,
            [field]: res.updatedContent,
          },
        };
      });
    }
  };

  // Regeneration handler for learning sequence step
  const handleRegenerateStep = async (stepIdx: number) => {
    if (!resource.lessonPlan) return;
    const steps = [...resource.lessonPlan.learningSequence];
    const current = steps[stepIdx];
    const currentIndex = current.variantId || 0;

    const res = await requestSectionRegeneration(
      `step_${current.step}`,
      resource.request,
      current.teacherAction,
      currentIndex
    );

    const actionVariants = [
      {
        teacher: `Present a contrasting local example from student homes (e.g. steel tumbler vs earthen kulhad) to prompt inquiry.`,
        student: `Discuss in pairs for 60 seconds and record predictions on slate.`,
      },
      {
        teacher: `Pose a diagnostic riddle on chalkboard: "I move through solid metal without moving the metal. What am I?"`,
        student: `Turn and talk with bench partner to formulate 2 hypotheses.`,
      },
      {
        teacher: `Demonstrate thermal conductivity live using small drops of candle wax on a steel spoon and plastic scale.`,
        student: `Observe carefully and write down which drop softens first in their notebooks.`,
      },
    ];

    const nextVar = (currentIndex + 1) % actionVariants.length;
    const newTeacherAction = res.updatedContent && typeof res.updatedContent === 'string'
      ? res.updatedContent
      : actionVariants[nextVar].teacher;

    steps[stepIdx] = {
      ...current,
      teacherAction: newTeacherAction,
      studentAction: actionVariants[nextVar].student,
      variantId: nextVar,
    };

    setResource((prev) => {
      if (!prev.lessonPlan) return prev;
      return {
        ...prev,
        lessonPlan: {
          ...prev.lessonPlan,
          learningSequence: steps,
        },
      };
    });
  };

  // Update generic text field
  const handleUpdateField = (field: keyof LessonPlanData, newVal: any) => {
    if (!resource.lessonPlan) return;
    setResource({
      ...resource,
      lessonPlan: {
        ...resource.lessonPlan,
        [field]: newVal,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      {/* Sticky Action Toolbar */}
      <PrintToolbar
        resource={resource}
        lang={lang}
        onBackToEdit={onModifyInputs}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 print:py-0 print:px-0">
        {/* Generation Engine Status Notice (hidden in print) */}
        {generationNotice && (
          <div
            className={`no-print p-3 sm:p-4 rounded-xl border text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              usedFallback
                ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                : 'bg-teal-50/80 border-teal-200 text-teal-950'
            }`}
          >
            <div className="flex items-center gap-2">
              {usedFallback ? (
                <Cpu className="w-4 h-4 text-amber-700 shrink-0" />
              ) : (
                <Sparkles className="w-4 h-4 text-teal-700 shrink-0" />
              )}
              <span>{generationNotice}</span>
            </div>
            {onRetryGeneration && usedFallback && (
              <button
                type="button"
                onClick={onRetryGeneration}
                className="self-end sm:self-auto shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retry with Gemini</span>
              </button>
            )}
          </div>
        )}

        {/* Pre-Export Teacher Review Checklist (hidden in print) */}
        <div className="no-print bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-teal-800 shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold text-[#0F2438]">
                {lang === 'hi' ? 'पूर्व-निर्यात शिक्षक समीक्षा चेकलिस्ट' : 'Pre-Export Teacher Review Checklist'}
              </h2>
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                confirmedCount === 6
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {confirmedCount}/6 {lang === 'hi' ? 'पुष्टीकृत' : 'Confirmed'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {lang === 'hi'
              ? 'कक्षा में पढ़ाने या प्रिंट करने से पहले कृपया इन 6 मुख्य बिंदुओं की पुष्टि करें:'
              : 'Before printing or taking this resource into class, please confirm these 6 pedagogical readiness items:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1 text-xs text-slate-700">
            {[
              { key: 'competencyChecked', label: lang === 'hi' ? 'दक्षता सत्यापित' : 'Competency checked' },
              { key: 'activityFeasible', label: lang === 'hi' ? 'गतिविधि व्यावहारिक' : 'Activity feasible' },
              { key: 'languageAppropriate', label: lang === 'hi' ? 'भाषा उपयुक्त' : 'Language appropriate' },
              { key: 'materialsAvailable', label: lang === 'hi' ? 'सामग्री उपलब्ध' : 'Materials available' },
              { key: 'assessmentMatchesOutcome', label: lang === 'hi' ? 'आकलन परिणाम से मेल खाता है' : 'Assessment matches outcome' },
              { key: 'supportAdaptedForLearners', label: lang === 'hi' ? 'विविध शिक्षार्थियों हेतु अनुकूलित' : 'Support adapted for learners' },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 border border-slate-100 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checklist[item.key]}
                  onChange={() => toggleChecklist(item.key)}
                  className="rounded border-slate-300 text-teal-700 focus:ring-teal-600 w-4 h-4"
                />
                <span className={checklist[item.key] ? 'font-medium text-slate-900' : 'text-slate-600'}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Print Sheet Container */}
        <div className="print-sheet bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-xs space-y-6">
          
          {/* Header Banner */}
          <div className="border-b border-slate-200 pb-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
                <span className="uppercase tracking-wider">
                  {resource.request.stage} Stage · Grade {resource.request.grade}
                </span>
                <span aria-hidden="true">·</span>
                <span>{resource.request.subject}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  {resource.request.duration} Mins
                </span>
              </div>

              {/* Review required badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>{t.reviewRequiredBadge}</span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F2438] tracking-tight">
              {resource.lessonPlan?.title ||
                resource.worksheet?.title ||
                resource.assessment?.title ||
                resource.rubric?.competency ||
                resource.projectBrief?.title}
            </h1>

            {/* Context Summary */}
            <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="font-semibold text-slate-800">Context: </span>
              {resource.lessonPlan?.contextSummary ||
                `${resource.request.stage} · Grade ${resource.request.grade} · Duration: ${resource.request.duration}m · Materials: ${resource.request.materials || 'Standard classroom'} · Language: ${resource.request.language || 'English'}`}
            </p>

            {/* Resource Metadata Bar (Visible in print and screen) */}
            <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono border-t border-slate-100 pt-2">
              <span>ID: <strong className="font-semibold text-slate-700">{resource.metadata?.id || resource.id}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Engine: <strong className="font-semibold text-slate-700">{resource.metadata?.engineLabel || (usedFallback ? 'Local Rule-Based Template' : 'gemini-3.8-flash')}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Generated: <strong className="font-semibold text-slate-700">{new Date(resource.metadata?.generatedAt || resource.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Review: <strong className="text-amber-800 font-semibold">Teacher Review Required</strong></span>
              <span aria-hidden="true">·</span>
              <span>Curriculum: <strong className="font-semibold text-slate-700">Suggested (Unverified Draft)</strong></span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 1. LESSON PLAN VIEW */}
          {/* ======================================================== */}
          {resource.lessonPlan && (
            <div className="space-y-6">
              {/* Curricular Goal & Competency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <GeneratedSection
                  sectionNumber="1"
                  title={t.sectionCurricularGoal}
                  isCurriculumSuggestion={true}
                  content={resource.lessonPlan.suggestedCurricularGoal}
                  onRegenerate={() =>
                    handleRegenerateField('suggestedCurricularGoal', 'suggestedCurricularGoal')
                  }
                  onUpdateContent={(val) => handleUpdateField('suggestedCurricularGoal', val)}
                  lang={lang}
                />

                <GeneratedSection
                  sectionNumber="2"
                  title={t.sectionCompetency}
                  isCurriculumSuggestion={true}
                  content={resource.lessonPlan.suggestedCompetency}
                  onRegenerate={() =>
                    handleRegenerateField('suggestedCompetency', 'suggestedCompetency')
                  }
                  onUpdateContent={(val) => handleUpdateField('suggestedCompetency', val)}
                  lang={lang}
                />
              </div>

              {/* Learning Outcomes (<=3, observable verbs) */}
              <GeneratedSection
                sectionNumber="3"
                title={t.sectionLearningOutcomes}
                isCurriculumSuggestion={true}
                content={resource.lessonPlan.learningOutcomes}
                onUpdateContent={(val) => handleUpdateField('learningOutcomes', val)}
                lang={lang}
              />

              {/* Prior Learning Check (<=3 prompts) */}
              <GeneratedSection
                sectionNumber="4"
                title={t.sectionPriorLearning}
                content={resource.lessonPlan.priorLearningCheck}
                onUpdateContent={(val) => handleUpdateField('priorLearningCheck', val)}
                lang={lang}
              />

              {/* 5E Learning Sequence (Engage 5m, Explore 10m, Explain 10m, Apply 10m, Reflect 5m) */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs space-y-4 break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-medium text-slate-400">5.</span>
                    <h4 className="text-sm sm:text-base font-bold text-[#0F2438]">
                      {t.sectionLearningSequence}
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    Total: {resource.request.duration} Minutes
                  </span>
                </div>

                <div className="space-y-3">
                  {resource.lessonPlan.learningSequence.map((step, idx) => (
                    <div
                      key={step.step}
                      className="p-3 sm:p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-200/60">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-teal-900 bg-teal-100/70 px-2 py-0.5 rounded">
                            {step.step}
                          </span>
                          <span className="text-xs font-mono text-slate-500">
                            {step.duration}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRegenerateStep(idx)}
                          className="no-print text-[11px] font-medium text-slate-600 hover:text-teal-700 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-slate-200"
                          title="Rotate activity variation"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Regen Step</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
                        <div>
                          <span className="font-semibold text-slate-800 block mb-0.5">
                            Teacher Facilitation:
                          </span>
                          <p className="text-slate-700">{step.teacherAction}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800 block mb-0.5">
                            Student Engagement:
                          </span>
                          <p className="text-slate-700">{step.studentAction}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experiential Activity */}
              <GeneratedSection
                sectionNumber="6"
                title={t.sectionExperiential}
                content={resource.lessonPlan.experientialActivity}
                onRegenerate={() =>
                  handleRegenerateField('experientialActivity', 'experientialActivity')
                }
                onUpdateContent={(val) => handleUpdateField('experientialActivity', val)}
                lang={lang}
              />

              {/* Differentiated Tasks (Support, Core, Extension) */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs space-y-3 break-inside-avoid">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <span className="text-xs font-mono font-medium text-slate-400">7.</span>
                  <h4 className="text-sm sm:text-base font-bold text-[#0F2438]">
                    {t.sectionDifferentiation}
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  {/* Support */}
                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                    <span className="text-xs font-bold text-slate-700 block mb-1.5 pb-1 border-b border-slate-200">
                      Support Band (Foundational Gap)
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                      {resource.lessonPlan.differentiatedTasks.support.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Core */}
                  <div className="p-3 rounded-lg border border-teal-200 bg-teal-50/30">
                    <span className="text-xs font-bold text-teal-900 block mb-1.5 pb-1 border-b border-teal-200">
                      Core Band (Grade-Level Expectation)
                    </span>
                    <ul className="text-xs text-slate-800 space-y-1 list-disc list-inside">
                      {resource.lessonPlan.differentiatedTasks.core.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Extension */}
                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                    <span className="text-xs font-bold text-slate-700 block mb-1.5 pb-1 border-b border-slate-200">
                      Extension Band (Higher Challenge)
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                      {resource.lessonPlan.differentiatedTasks.extension.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Teacher Questioning Prompts (Recall, Reasoning, Transfer) */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs space-y-3 break-inside-avoid">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <span className="text-xs font-mono font-medium text-slate-400">8.</span>
                  <h4 className="text-sm sm:text-base font-bold text-[#0F2438]">
                    {t.sectionQuestioning}
                  </h4>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-700">Recall Prompt: </span>
                    <span className="text-slate-800">{resource.lessonPlan.questioningPrompts.recall}</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-700">Reasoning Prompt: </span>
                    <span className="text-slate-800">{resource.lessonPlan.questioningPrompts.reasoning}</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-700">Transfer Prompt: </span>
                    <span className="text-slate-800">{resource.lessonPlan.questioningPrompts.transfer}</span>
                  </div>
                </div>
              </div>

              {/* Formative Assessment (Checklist + Exit Ticket) */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs space-y-3 break-inside-avoid">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <span className="text-xs font-mono font-medium text-slate-400">9.</span>
                  <h4 className="text-sm sm:text-base font-bold text-[#0F2438]">
                    {t.sectionAssessment}
                  </h4>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                    <span className="font-bold text-slate-800 block mb-0.5">
                      Teacher Observation Checklist Item:
                    </span>
                    <p className="text-slate-700">
                      {resource.lessonPlan.formativeAssessment.observationChecklistItem}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-teal-200 bg-teal-50/30">
                    <span className="font-bold text-teal-900 block mb-0.5">
                      Class Exit Ticket Question:
                    </span>
                    <p className="text-slate-800 italic">
                      "{resource.lessonPlan.formativeAssessment.exitTicketQuestion}"
                    </p>
                  </div>
                </div>
              </div>

              {/* 4-Level Compact Rubric */}
              <RubricTable
                rubric={resource.lessonPlan.rubric}
                onUpdateRubric={(updated) => handleUpdateField('rubric', updated)}
                lang={lang}
              />

              {/* Low-Tech / Offline Alternative */}
              <GeneratedSection
                sectionNumber="10"
                title={t.sectionLowTech}
                content={resource.lessonPlan.lowTechAlternative}
                onRegenerate={() =>
                  handleRegenerateField('lowTechAlternative', 'lowTechAlternative')
                }
                onUpdateContent={(val) => handleUpdateField('lowTechAlternative', val)}
                lang={lang}
              />

              {/* Teacher Reflection Prompt & Safety Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <GeneratedSection
                  sectionNumber="11"
                  title={t.sectionReflection}
                  content={resource.lessonPlan.teacherReflectionPrompt}
                  onRegenerate={() =>
                    handleRegenerateField('teacherReflectionPrompt', 'teacherReflectionPrompt')
                  }
                  onUpdateContent={(val) => handleUpdateField('teacherReflectionPrompt', val)}
                  lang={lang}
                />

                <GeneratedSection
                  sectionNumber="12"
                  title={t.sectionSafety}
                  content={resource.lessonPlan.safetyOrInclusionNote}
                  onRegenerate={() =>
                    handleRegenerateField('safetyOrInclusionNote', 'safetyOrInclusionNote')
                  }
                  onUpdateContent={(val) => handleUpdateField('safetyOrInclusionNote', val)}
                  lang={lang}
                />
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. WORKSHEET VIEW */}
          {/* ======================================================== */}
          {resource.worksheet && (
            <div className="space-y-6">
              <div className="p-3 bg-teal-50 rounded border border-teal-200 text-xs text-teal-900">
                <span className="font-bold">Target Learning Outcome: </span>
                {resource.worksheet.learningOutcome}
              </div>

              {/* Student tasks */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Student Tasks (Max 5)
                </h4>
                {resource.worksheet.studentTasks.map((task) => (
                  <div key={task.taskNumber} className="p-4 rounded-lg border border-slate-200 bg-white">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {task.taskNumber}
                      </span>
                      <div className="space-y-2 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-slate-800">
                          {task.instruction}
                        </p>
                        <div className="text-xs bg-slate-50 p-2.5 rounded border border-slate-100 text-slate-600">
                          <span className="font-semibold text-slate-700">Teacher Answer Guide: </span>
                          {task.sampleAnswer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Differentiation Guidance */}
              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900">Differentiation Bands:</h4>
                <p><strong>Support:</strong> {resource.worksheet.differentiatedGuidance.support}</p>
                <p><strong>Core:</strong> {resource.worksheet.differentiatedGuidance.core}</p>
                <p><strong>Extension:</strong> {resource.worksheet.differentiatedGuidance.extension}</p>
              </div>

              {/* Low tech note */}
              <div className="p-3 bg-amber-50 rounded border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Blackboard Transcription Note: </span>
                  {resource.worksheet.lowTechNote}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 3. FORMATIVE ASSESSMENT VIEW */}
          {/* ======================================================== */}
          {resource.assessment && (
            <div className="space-y-6">
              <div className="p-3 bg-teal-50 rounded border border-teal-200 text-xs text-teal-900">
                <span className="font-bold">Assessment Outcome: </span>
                {resource.assessment.learningOutcome}
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Diagnostic & Formative Items (Max 5)
                </h4>
                {resource.assessment.items.map((item) => (
                  <div key={item.itemNumber} className="p-4 rounded-lg border border-slate-200 bg-white">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {item.itemNumber}
                      </span>
                      <div className="space-y-1.5 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-slate-900">
                          {item.question}
                        </p>
                        <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded">
                          <span className="font-semibold text-slate-700">Diagnostic Rubric / Evaluation Guide: </span>
                          {item.evaluationGuide}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Observation criteria */}
              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  In-Class Observation Criteria
                </h4>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                  {resource.assessment.observationChecklist.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Exit Ticket */}
              <div className="p-3.5 bg-teal-50/50 rounded-lg border border-teal-200 text-xs">
                <span className="font-bold text-teal-900 block mb-1">Exit Ticket Prompt:</span>
                <p className="italic text-slate-800">{resource.assessment.exitTicketPrompt}</p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 4. RUBRIC VIEW */}
          {/* ======================================================== */}
          {resource.rubric && !resource.lessonPlan && (
            <RubricTable
              rubric={resource.rubric}
              onUpdateRubric={(updated) => setResource({ ...resource, rubric: updated })}
              lang={lang}
            />
          )}

          {/* ======================================================== */}
          {/* 5. PROJECT BRIEF VIEW */}
          {/* ======================================================== */}
          {resource.projectBrief && (
            <div className="space-y-6">
              <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200 space-y-2">
                <div className="text-xs font-bold text-teal-900 uppercase tracking-wide">
                  Driving Question
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  {resource.projectBrief.drivingQuestion}
                </p>
                <div className="pt-1 text-xs text-slate-700">
                  <span className="font-semibold">Final Product: </span>
                  {resource.projectBrief.finalProduct}
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Project Milestones (3–5 Stages)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {resource.projectBrief.milestones.map((m) => (
                    <div key={m.milestoneNumber} className="p-3 rounded-lg border border-slate-200 bg-white">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                        <span>Milestone {m.milestoneNumber}: {m.name}</span>
                        <span className="font-mono text-slate-500 font-normal">{m.duration}</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        <span className="font-semibold text-slate-700">Deliverable: </span>
                        {m.deliverable}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cross-subject links */}
              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 uppercase tracking-wide">
                  Cross-Subject Curriculum Links
                </h4>
                <ul className="space-y-1 list-disc list-inside text-slate-700">
                  {resource.projectBrief.crossSubjectLinks.map((link, i) => (
                    <li key={i}>{link}</li>
                  ))}
                </ul>
              </div>

              {/* Rubric */}
              <RubricTable
                rubric={resource.projectBrief.rubric}
                lang={lang}
              />
            </div>
          )}

          {/* Footer Note */}
          <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
            <p className="font-medium text-slate-700">
              Suggested — teacher review required. Independent teacher planning tool.
            </p>
            <p className="text-[11px] text-slate-400">
              Not affiliated with CBSE, NCERT, or state education boards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
