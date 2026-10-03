/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ToolkitItem } from '../types';
import { LanguageCode } from '../utils/i18n';
import { BookOpen, X, FileText, CheckCircle2, Lightbulb } from 'lucide-react';

interface ToolkitCardProps {
  item: ToolkitItem;
  lang: LanguageCode;
}

export const ToolkitCard: React.FC<ToolkitCardProps> = ({ item, lang }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all">
        <div>
          {/* Metadata without static pills */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span className="font-semibold text-teal-800">{item.stage}</span>
            <span aria-hidden="true">·</span>
            <span>{item.format}</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight">
            {item.title}
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            {item.description}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="min-h-[44px] w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:text-teal-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-teal-700" />
          <span>{lang === 'hi' ? 'नमूना सामग्री देखें' : 'Open Sample'}</span>
        </button>
      </div>

      {/* Sample Content Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div
            className="bg-white rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200 flex flex-col animate-in fade-in duration-150"
            role="dialog"
            aria-modal="true"
          >
            <div className="sticky top-0 bg-white border-b border-slate-100 p-4 sm:p-5 flex items-center justify-between z-10">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span className="font-semibold text-teal-800">{item.stage}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.format}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
                aria-label="Close sample"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-teal-700" />
                  <span>Overview & Classroom Purpose</span>
                </h4>
                <p className="leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
                  {item.sampleContent.overview}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" />
                  <span>Key Pedagogical Checkpoints</span>
                </h4>
                <ul className="space-y-1.5 list-disc list-inside marker:text-teal-700">
                  {item.sampleContent.keyCheckpoints.map((pt, i) => (
                    <li key={i} className="pl-1">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Classroom Snippet / Prompt</h4>
                <blockquote className="italic border-l-2 border-teal-600 pl-3 py-1.5 bg-teal-50/40 text-slate-800">
                  {item.sampleContent.classroomSnippet}
                </blockquote>
              </div>

              <div className="bg-amber-50/80 border border-amber-200/80 p-3 rounded flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-900 block mb-0.5">Practical Teacher Tip</span>
                  <span className="text-amber-950 text-xs">{item.sampleContent.teacherTip}</span>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-100 p-3 sm:p-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-md transition-colors"
              >
                {lang === 'hi' ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
