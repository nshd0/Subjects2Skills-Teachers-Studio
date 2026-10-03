/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { toolkitItems } from '../data/toolkitData';
import { ToolkitCard } from '../components/ToolkitCard';
import { LanguageCode, translations } from '../utils/i18n';
import { BookOpen } from 'lucide-react';
import { SchoolStage } from '../types';

interface ToolkitLibraryPageProps {
  lang: LanguageCode;
}

export const ToolkitLibraryPage: React.FC<ToolkitLibraryPageProps> = ({ lang }) => {
  const t = translations[lang];
  const [stageFilter, setStageFilter] = useState<string>('All');

  const filteredItems = toolkitItems.filter((item) => {
    if (stageFilter === 'All') return true;
    return item.stage === stageFilter || item.stage === 'All Stages';
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-teal-600" />
          <span>{lang === 'hi' ? 'शिक्षक संसाधन बैंक' : 'Educator Reference Bank'}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F2438] tracking-tight">
          {t.navToolkit}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {lang === 'hi'
            ? 'NCF-SE 2023 और NEP 2020 सिद्धांतों पर आधारित मानक मार्गदर्शिकाएं, चेकलिस्ट और टेम्पलेट।'
            : 'Curated standard checklists, inquiry scaffolds, and assessment matrices for Indian K–12 educators.'}
        </p>
      </div>

      {/* Filter Tabs (Interactive Segmented Control) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {(['All', 'Foundational', 'Preparatory', 'Middle', 'Secondary'] as const).map((stg) => {
          const isActive = stageFilter === stg;
          return (
            <button
              key={stg}
              type="button"
              onClick={() => setStageFilter(stg)}
              className={`min-h-[40px] px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#0F2438] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {stg === 'All' ? (lang === 'hi' ? 'सभी चरण' : 'All Stages') : stg}
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <ToolkitCard key={item.id} item={item} lang={lang} />
        ))}
      </div>
    </div>
  );
};
