/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LanguageCode, translations } from '../utils/i18n';
import { Sparkles, ArrowRight, BookCheck, ShieldAlert, Layers, Compass, CheckCircle, RefreshCw } from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string) => void;
  onQuickExample: () => void;
  lang: LanguageCode;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onQuickExample,
  lang,
}) => {
  const t = translations[lang];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      {/* Hero Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wide uppercase">
            <span>NEP 2020 & NCF-SE 2023 Aligned</span>
            <span aria-hidden="true">·</span>
            <span>Teacher-Controlled Studio</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F2438] tracking-tight text-balance leading-tight">
            {lang === 'hi'
              ? 'पाठ्यक्रम कवरेज से छात्र क्षमता तक।'
              : 'From syllabus coverage to student capability.'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === 'hi'
              ? 'भारतीय K–12 शिक्षकों के लिए एक निःशुल्क, व्यावहारिक नियोजन उपकरण। मिनटों में अनुभवात्मक शिक्षण योजनाएं, विभेदित कार्य और 4-स्तरीय रूब्रिक्स तैयार करें।'
              : 'A free, practical planning tool for Indian K–12 educators. Generate structured, competency-based lesson packs with 5E learning sequences, low-cost activities, and 4-level rubrics tailored for real classroom conditions.'}
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('create')}
              className="min-h-[48px] px-6 py-3 bg-[#0F2438] hover:bg-[#16324F] text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <Sparkles className="w-4 h-4 text-teal-300" />
              <span>{t.generateResource}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onQuickExample}
              className="min-h-[48px] px-5 py-3 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>{t.quickExample}</span>
            </button>
          </div>

          {/* Trust statement */}
          <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle className="w-3.5 h-3.5 text-teal-700 shrink-0" />
            <span>Zero login · 100% offline-ready exports · Zero student data collection</span>
          </div>
        </div>
      </section>

      {/* The 4 Principles for Indian Classrooms */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            {lang === 'hi' ? 'कक्षा-उन्मुख मुख्य विशेषताएं' : 'Engineered for Real Indian Classrooms'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'hi'
              ? 'सीमित तैयारी समय, बहु-स्तरीय शिक्षार्थी और व्यावहारिक सामग्री के लिए तैयार'
              : 'Designed for limited prep time, mixed learner readiness, and minimal infrastructure'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded bg-teal-50 text-teal-700 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">5E Learning Sequence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear 5–10 minute segments (Engage, Explore, Explain, Apply, Reflect) that fit standard 40–45 minute school timetables.
              </p>
            </div>
            <div className="mt-3 text-[11px] text-teal-800 font-medium">Time-bound lesson flow</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded bg-amber-50 text-amber-700 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Zero-Cost Experiential</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Uses everyday objects (spoons, cups, chalk, local soil, courtyard sunlight) instead of requiring expensive science kits.
              </p>
            </div>
            <div className="mt-3 text-[11px] text-amber-800 font-medium">Always offline-ready</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded bg-teal-50 text-teal-700 flex items-center justify-center">
                <BookCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Competency Rubrics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compact 4-level developmental rubrics (Beginning, Developing, Secure, Extending) that replace subjective marks.
              </p>
            </div>
            <div className="mt-3 text-[11px] text-teal-800 font-medium">NCF-SE aligned descriptors</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded bg-slate-100 text-slate-700 flex items-center justify-center">
                <RefreshCw className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Teacher in Full Control</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Edit any sentence directly or regenerate specific sections with 1-tap variants without losing the rest of your plan.
              </p>
            </div>
            <div className="mt-3 text-[11px] text-slate-700 font-medium">Section-by-section editing</div>
          </div>
        </div>
      </section>

      {/* Primacy of Teacher Judgement Banner */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4">
        <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h4 className="font-bold text-slate-900 text-sm sm:text-base">
            Essential Note on Teacher Judgement & Safety
          </h4>
          <p>
            Subjects2Skills is a supportive drafting assistant. It never replaces the professional judgment of the classroom teacher. All suggested goals, competencies, and classroom activities must be reviewed by the educator for local safety, cultural resonance, and school requirements prior to teaching.
          </p>
          <div className="pt-1 text-[11px] text-slate-500">
            Independent educational project · No affiliation with CBSE, NCERT, or state education boards.
          </div>
        </div>
      </section>
    </div>
  );
};
