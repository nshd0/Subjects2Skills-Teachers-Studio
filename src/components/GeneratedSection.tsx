/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RefreshCw, Edit3, Check, RotateCcw } from 'lucide-react';
import { LanguageCode, translations } from '../utils/i18n';

interface GeneratedSectionProps {
  title: string;
  isCurriculumSuggestion?: boolean;
  content: string | string[];
  onRegenerate?: () => void;
  onUpdateContent?: (newContent: string | string[]) => void;
  lang: LanguageCode;
  sectionNumber?: string | number;
}

export const GeneratedSection: React.FC<GeneratedSectionProps> = ({
  title,
  isCurriculumSuggestion = false,
  content,
  onRegenerate,
  onUpdateContent,
  lang,
  sectionNumber,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(
    Array.isArray(content) ? content.join('\n') : content
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const t = translations[lang];

  const handleSave = () => {
    setIsEditing(false);
    if (onUpdateContent) {
      if (Array.isArray(content)) {
        onUpdateContent(textValue.split('\n').filter((l) => l.trim() !== ''));
      } else {
        onUpdateContent(textValue);
      }
    }
  };

  const handleCancel = () => {
    setTextValue(Array.isArray(content) ? content.join('\n') : content);
    setIsEditing(false);
  };

  const handleRegenerateClick = () => {
    setIsSpinning(true);
    if (onRegenerate) {
      onRegenerate();
    }
    setTimeout(() => setIsSpinning(false), 350);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs transition-shadow hover:border-slate-300 break-inside-avoid">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 mb-3 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          {sectionNumber && (
            <span className="text-xs font-mono font-medium text-slate-400">
              {sectionNumber}.
            </span>
          )}
          <h4 className="text-sm sm:text-base font-bold text-[#0F2438]">
            {title}
          </h4>
          {isCurriculumSuggestion && (
            <span className="text-[11px] font-medium text-amber-800 bg-amber-50/80 border border-amber-200/80 px-2 py-0.5 rounded-sm">
              {t.reviewRequiredBadge}
            </span>
          )}
        </div>

        {/* Section Action Controls */}
        <div className="no-print flex items-center gap-1.5 self-end sm:self-auto shrink-0">
          {onRegenerate && !isEditing && (
            <button
              type="button"
              onClick={handleRegenerateClick}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-teal-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
              title={t.regenerateSection}
              aria-label={`${t.regenerateSection}: ${title}`}
            >
              <RefreshCw
                className={`w-3.5 h-3.5 transition-transform ${isSpinning ? 'rotate-180' : ''}`}
              />
              <span className="hidden sm:inline">{t.regenerateSection}</span>
              <span className="sm:hidden">Regen</span>
            </button>
          )}

          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t.saveSection}</span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-800 bg-slate-100 rounded transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.cancel}</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-teal-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
              title={t.editSection}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{t.editSection}</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      {isEditing ? (
        <textarea
          rows={Array.isArray(content) ? Math.max(3, content.length + 1) : 4}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          className="w-full p-2.5 text-xs sm:text-sm text-slate-800 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Edit section content..."
        />
      ) : (
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {Array.isArray(content) ? (
            <ul className="space-y-1.5 list-disc list-inside marker:text-teal-700">
              {content.map((item, idx) => (
                <li key={idx} className="pl-1">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="whitespace-pre-line">{content}</p>
          )}
        </div>
      )}
    </div>
  );
};
