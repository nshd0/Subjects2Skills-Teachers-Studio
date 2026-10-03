/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LanguageCode, translations } from '../utils/i18n';
import { ShieldCheck, UserCheck, Lock, AlertTriangle, Scale, BookOpen } from 'lucide-react';

interface AboutSafetyPageProps {
  lang: LanguageCode;
}

export const AboutSafetyPage: React.FC<AboutSafetyPageProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>{lang === 'hi' ? 'नीति एवं सुरक्षा' : 'Policy & Ethics'}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F2438] tracking-tight">
          {t.navAbout}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {lang === 'hi'
            ? 'शिक्षक स्वायत्तता, छात्र डेटा सुरक्षा और राष्ट्रीय पाठ्यचर्या सिद्धांतों के प्रति हमारी प्रतिबद्धता।'
            : 'Core principles guiding teacher primacy, zero student data collection, and independent curriculum alignment.'}
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs space-y-6">
        {/* Principle 1: Primacy of Teacher Judgement */}
        <div className="flex items-start gap-3.5 pb-5 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Primacy of Teacher Judgement
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Subjects2Skills Teacher Studio is designed solely as an instructional planning assistant. It never replaces the professional judgment, pedagogical expertise, or emotional resonance of the classroom educator. Every teacher knows their specific learners, classroom constraints, and community context best.
            </p>
          </div>
        </div>

        {/* Principle 2: Mandatory Teacher Review */}
        <div className="flex items-start gap-3.5 pb-5 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Mandatory Teacher Review Before Classroom Use
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every lesson plan, question set, worksheet, and rubric generated on this platform is a draft suggestion and carries the label <em>“Suggested — teacher review required.”</em> Teachers must review all activities for physical safety, time feasibility, age-appropriateness, and cultural inclusion before bringing them into the classroom.
            </p>
          </div>
        </div>

        {/* Principle 3: Zero Student Personal Data */}
        <div className="flex items-start gap-3.5 pb-5 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Zero Student Personal Data Collection
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This proof-of-concept application does not store, request, or process student names, roll numbers, marks, photos, attendance, or personal demographic records. Generation runs client-side and deterministically in this version, preserving strict learner privacy.
            </p>
          </div>
        </div>

        {/* Principle 4: Independent Development & No Official Endorsement */}
        <div className="flex items-start gap-3.5 pb-5 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
            <Scale className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Independent Initiative — Not Government Endorsed
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Subjects2Skills Teacher Studio is an independent educator tool. It does not claim official curriculum alignment, official competency codes, endorsement from the Central Board of Secondary Education (CBSE), the National Council of Educational Research and Training (NCERT), or the Ministry of Education, Government of India.
            </p>
          </div>
        </div>

        {/* Principle 5: Compliance with Board & State Mandates */}
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Compliance with Board, State, and School Requirements
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Teachers are responsible for verifying all instructional outputs against their specific school administration guidelines, state board directives (e.g. SCERT syllabi), Central Board regulations, and local examination schemes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
