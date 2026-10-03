/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SchoolStage } from '../types';
import { LanguageCode } from '../utils/i18n';

interface StageSelectorProps {
  selectedStage: SchoolStage;
  onSelectStage: (stage: SchoolStage) => void;
  lang: LanguageCode;
}

const STAGES: Array<{
  id: SchoolStage;
  labelEn: string;
  labelHi: string;
  grades: string;
  focus: string;
}> = [
  {
    id: 'Foundational',
    labelEn: 'Foundational',
    labelHi: 'बुनियादी चरण',
    grades: 'Grades 1–2',
    focus: 'Play & Discovery'
  },
  {
    id: 'Preparatory',
    labelEn: 'Preparatory',
    labelHi: 'तैयारी चरण',
    grades: 'Grades 3–5',
    focus: 'Activity & Literacy'
  },
  {
    id: 'Middle',
    labelEn: 'Middle',
    labelHi: 'मध्य चरण',
    grades: 'Grades 6–8',
    focus: 'Inquiry & Concepts'
  },
  {
    id: 'Secondary',
    labelEn: 'Secondary',
    labelHi: 'माध्यमिक चरण',
    grades: 'Grades 9–12',
    focus: 'Depth & Criticality'
  }
];

export const StageSelector: React.FC<StageSelectorProps> = ({
  selectedStage,
  onSelectStage,
  lang,
}) => {
  return (
    <div className="w-full">
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
        {lang === 'hi' ? 'विद्यालय चरण (NCF-SE वर्गीकरण)' : 'School Stage (NCF-SE Classification)'} *
      </label>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {STAGES.map((stg) => {
          const isSelected = selectedStage === stg.id;
          return (
            <button
              key={stg.id}
              type="button"
              onClick={() => onSelectStage(stg.id)}
              className={`min-h-[58px] p-3 text-left rounded-lg border transition-all flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer ${
                isSelected
                  ? 'bg-teal-50 border-teal-600 text-teal-950 shadow-xs ring-1 ring-teal-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-bold tracking-tight">
                  {lang === 'hi' ? stg.labelHi : stg.labelEn}
                </span>
                <span className={`text-[11px] font-medium ${isSelected ? 'text-teal-700 font-semibold' : 'text-slate-500'}`}>
                  {stg.grades}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                {stg.focus}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
