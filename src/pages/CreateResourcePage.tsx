/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ResourceForm } from '../components/ResourceForm';
import { TeacherRequest } from '../types';
import { LanguageCode, translations } from '../utils/i18n';
import { Sparkles } from 'lucide-react';

interface CreateResourcePageProps {
  onGenerate: (req: TeacherRequest) => void | Promise<void>;
  lang: LanguageCode;
  initialValues?: Partial<TeacherRequest>;
  isGenerating?: boolean;
}

export const CreateResourcePage: React.FC<CreateResourcePageProps> = ({
  onGenerate,
  lang,
  initialValues,
  isGenerating,
}) => {
  const t = translations[lang];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div className="space-y-1 text-left">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>{lang === 'hi' ? 'संसाधन विनिर्माता' : 'Resource Builder'}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F2438] tracking-tight">
          {t.navCreate}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {lang === 'hi'
            ? 'अपनी कक्षा के स्तर, विषय और समय के अनुसार संरचित शिक्षण सामग्री तैयार करें।'
            : 'Fill in your lesson parameters below to generate a tailored, competency-aligned classroom resource.'}
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 shadow-xs">
        <ResourceForm
          onGenerate={onGenerate}
          lang={lang}
          initialValues={initialValues}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
};
