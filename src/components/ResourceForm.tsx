/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  SchoolStage,
  DesiredResource,
  LessonDuration,
  TeachingLanguage,
  InternetAccess,
  LearnerProfile,
  TeacherRequest,
} from '../types';
import { StageSelector } from './StageSelector';
import { ContextAccordion } from './ContextAccordion';
import { LanguageCode, translations } from '../utils/i18n';
import { Sparkles, ArrowRight, Zap, AlertCircle } from 'lucide-react';

interface ResourceFormProps {
  onGenerate: (req: TeacherRequest) => void;
  lang: LanguageCode;
  initialValues?: Partial<TeacherRequest>;
}

// Stage to allowed grades mapping
const STAGE_GRADES: Record<SchoolStage, string[]> = {
  Foundational: ['1', '2'],
  Preparatory: ['3', '4', '5'],
  Middle: ['6', '7', '8'],
  Secondary: ['9', '10', '11', '12'],
};

export const ResourceForm: React.FC<ResourceFormProps> = ({
  onGenerate,
  lang,
  initialValues,
}) => {
  const t = translations[lang];

  // Required Fields
  const [stage, setStage] = useState<SchoolStage>(initialValues?.stage || 'Middle');
  const [grade, setGrade] = useState<string>(initialValues?.grade || '7');
  const [subject, setSubject] = useState<string>(initialValues?.subject || 'Science');
  const [topic, setTopic] = useState<string>(initialValues?.topic || 'Heat Transfer');
  const [duration, setDuration] = useState<LessonDuration>(initialValues?.duration || '40');
  const [desiredResource, setDesiredResource] = useState<DesiredResource>(
    initialValues?.desiredResource || 'Lesson Plan'
  );

  // Optional Context Fields
  const [language, setLanguage] = useState<TeachingLanguage>(initialValues?.language || 'Bilingual');
  const [classSize, setClassSize] = useState<string>(initialValues?.classSize || '');
  const [materials, setMaterials] = useState<string>(
    initialValues?.materials || 'Paper, steel spoon, cup of warm water, chalkboard'
  );
  const [internetAccess, setInternetAccess] = useState<InternetAccess>(
    initialValues?.internetAccess || 'None'
  );
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile>(
    initialValues?.learnerProfile || 'Mixed levels'
  );
  const [localContext, setLocalContext] = useState<string>(initialValues?.localContext || '');
  const [customGoal, setCustomGoal] = useState<string>(initialValues?.customGoalOrCompetency || '');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle stage change & update default grade for that stage
  const handleStageChange = (newStage: SchoolStage) => {
    setStage(newStage);
    const validGrades = STAGE_GRADES[newStage];
    if (!validGrades.includes(grade)) {
      setGrade(validGrades[0]);
    }
  };

  // Quick Example trigger
  const handleQuickExample = () => {
    setStage('Middle');
    setGrade('7');
    setSubject('Science');
    setTopic('Heat Transfer');
    setDuration('40');
    setLanguage('Bilingual');
    setMaterials('Paper, steel spoon, cup of warm water, chalkboard');
    setInternetAccess('None');
    setLearnerProfile('Mixed levels');
    setDesiredResource('Lesson Plan');
    setLocalContext('Everyday domestic utensils (tawa, spoon, kulhad)');
    setCustomGoal('');
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!subject.trim()) {
      newErrors.subject = lang === 'hi' ? 'विषय दर्ज करना आवश्यक है' : 'Subject is required';
    }
    if (!topic.trim()) {
      newErrors.topic = lang === 'hi' ? 'इकाई या शीर्षक दर्ज करना आवश्यक है' : 'Topic or unit is required';
    }
    if (!grade) {
      newErrors.grade = lang === 'hi' ? 'कक्षा का चयन करें' : 'Grade is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const payload: TeacherRequest = {
      stage,
      grade,
      subject: subject.trim(),
      topic: topic.trim(),
      duration,
      desiredResource,
      language,
      classSize: classSize.trim(),
      materials: materials.trim(),
      internetAccess,
      learnerProfile,
      localContext: localContext.trim(),
      customGoalOrCompetency: customGoal.trim(),
    };

    // Realistic brief transition (no latency drag, just clean feedback)
    setTimeout(() => {
      onGenerate(payload);
      setIsSubmitting(false);
    }, 280);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Quick Example Banner / Action */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="text-xs sm:text-sm text-amber-950 font-medium">
            {lang === 'hi'
              ? 'त्वरित परीक्षण: कक्षा 7 विज्ञान (ऊष्मा चालन) का उदाहरण स्वतः भरें'
              : 'Try a 1-tap completed sample: Grade 7 Science (Heat Transfer)'}
          </span>
        </div>
        <button
          type="button"
          onClick={handleQuickExample}
          className="min-h-[40px] px-3.5 py-1.5 text-xs font-bold text-amber-950 bg-amber-200/70 hover:bg-amber-200 border border-amber-300 rounded-md transition-colors inline-flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <span>{t.quickExample}</span>
        </button>
      </div>

      {/* 1. Stage Selector */}
      <StageSelector
        selectedStage={stage}
        onSelectStage={handleStageChange}
        lang={lang}
      />

      {/* 2. Grade & Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Grade */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {t.gradeLabel} *
          </label>
          <div className="relative">
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full min-h-[44px] px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-800"
            >
              {STAGE_GRADES[stage].map((g) => (
                <option key={g} value={g}>
                  Grade {g}
                </option>
              ))}
            </select>
          </div>
          {errors.grade && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.grade}
            </p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {t.durationLabel} *
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {(['30', '40', '45', '60', '90'] as LessonDuration[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDuration(d)}
                className={`min-h-[44px] text-xs font-semibold rounded-md border text-center transition-all cursor-pointer ${
                  duration === d
                    ? 'bg-teal-50 border-teal-600 text-teal-900 ring-1 ring-teal-600'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {d}m
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Subject & Topic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Subject */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {t.subjectLabel} *
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              if (errors.subject) setErrors({ ...errors, subject: '' });
            }}
            placeholder={lang === 'hi' ? 'उदा. विज्ञान, गणित, पर्यावरण' : 'e.g., Science, Mathematics, Social Science'}
            className={`w-full min-h-[44px] px-3.5 py-2 text-sm bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 ${
              errors.subject ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
            }`}
          />
          {errors.subject && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.subject}
            </p>
          )}
        </div>

        {/* Topic */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {t.topicLabel} *
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              if (errors.topic) setErrors({ ...errors, topic: '' });
            }}
            placeholder={lang === 'hi' ? 'उदा. ऊष्मा चालन, भिन्न, जल चक्र' : 'e.g., Heat Transfer, Fractions, Monsoon Cycle'}
            className={`w-full min-h-[44px] px-3.5 py-2 text-sm bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 ${
              errors.topic ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
            }`}
          />
          {errors.topic && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.topic}
            </p>
          )}
        </div>
      </div>

      {/* 4. Desired Resource Selector */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          {t.resourceTypeLabel} *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {(
            [
              'Lesson Plan',
              'Worksheet',
              'Formative Assessment',
              'Rubric',
              'Project Brief',
            ] as DesiredResource[]
          ).map((res) => (
            <button
              key={res}
              type="button"
              onClick={() => setDesiredResource(res)}
              className={`min-h-[44px] px-2.5 py-2 text-xs font-medium rounded-md border text-center transition-all cursor-pointer ${
                desiredResource === res
                  ? 'bg-[#0F2438] text-white border-[#0F2438] font-bold shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {res}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Optional Classroom Context Accordion */}
      <ContextAccordion
        language={language}
        onChangeLanguage={setLanguage}
        classSize={classSize}
        onChangeClassSize={setClassSize}
        materials={materials}
        onChangeMaterials={setMaterials}
        internetAccess={internetAccess}
        onChangeInternetAccess={setInternetAccess}
        learnerProfile={learnerProfile}
        onChangeLearnerProfile={setLearnerProfile}
        localContext={localContext}
        onChangeLocalContext={setLocalContext}
        customGoal={customGoal}
        onChangeCustomGoal={setCustomGoal}
        lang={lang}
      />

      {/* 6. Primary Action CTA */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full min-h-[50px] px-6 py-3 bg-[#0F2438] hover:bg-[#16324F] text-white text-sm sm:text-base font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 disabled:opacity-75"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-300 animate-spin" />
              <span>{t.generating}</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-300" />
              <span>{t.generateResource}</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </button>

        <p className="text-center text-[11px] text-slate-500 mt-2.5">
          {t.officialDisclaimer}
        </p>
      </div>
    </form>
  );
};
