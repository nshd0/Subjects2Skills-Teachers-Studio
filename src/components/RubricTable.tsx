/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RubricData, RubricCriterion } from '../types';
import { LanguageCode, translations } from '../utils/i18n';
import { Edit3, Check, RotateCcw } from 'lucide-react';

interface RubricTableProps {
  rubric: RubricData;
  onUpdateRubric?: (updated: RubricData) => void;
  lang: LanguageCode;
}

export const RubricTable: React.FC<RubricTableProps> = ({
  rubric,
  onUpdateRubric,
  lang,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableRubric, setEditableRubric] = useState<RubricData>(rubric);
  const t = translations[lang];

  // Synchronize internal rubric state when incoming rubric prop changes
  React.useEffect(() => {
    setEditableRubric(rubric);
  }, [rubric]);

  const handleCriterionChange = (index: number, field: keyof RubricCriterion, val: string) => {
    const updated = { ...editableRubric };
    const newCriteria = [...updated.criteria];
    newCriteria[index] = { ...newCriteria[index], [field]: val };
    updated.criteria = newCriteria;
    setEditableRubric(updated);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onUpdateRubric) {
      onUpdateRubric(editableRubric);
    }
  };

  const handleCancel = () => {
    setEditableRubric(rubric);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs break-inside-avoid">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-[#0F2438]">
              {t.sectionRubric}
            </h4>
            <span className="text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-sm">
              {t.reviewRequiredBadge}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            <span className="font-semibold text-slate-800">Target Competency: </span>
            {isEditing ? (
              <input
                type="text"
                value={editableRubric.competency}
                onChange={(e) => setEditableRubric({ ...editableRubric, competency: e.target.value })}
                className="mt-1 w-full text-xs p-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
              />
            ) : (
              editableRubric.competency
            )}
          </p>
        </div>

        <div className="no-print flex items-center gap-2 self-end sm:self-auto shrink-0">
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
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-teal-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{t.editSection}</span>
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table View (Always displayed in print) */}
      <div className="hidden md:block print:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <th className="py-2.5 px-3 w-1/5">Criterion</th>
              <th className="py-2.5 px-3 w-1/5 border-l border-slate-200 text-slate-700">
                Beginning (Level 1)
              </th>
              <th className="py-2.5 px-3 w-1/5 border-l border-slate-200 text-slate-700">
                Developing (Level 2)
              </th>
              <th className="py-2.5 px-3 w-1/5 border-l border-slate-200 text-slate-700">
                Secure (Level 3)
              </th>
              <th className="py-2.5 px-3 w-1/5 border-l border-slate-200 text-teal-800 bg-teal-50/50">
                Extending (Level 4)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {editableRubric.criteria.map((c, idx) => (
              <tr key={c.id || idx} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 px-3 align-top font-semibold text-slate-900">
                  {isEditing ? (
                    <input
                      type="text"
                      value={c.criterion}
                      onChange={(e) => handleCriterionChange(idx, 'criterion', e.target.value)}
                      className="w-full text-xs p-1 border border-slate-300 rounded"
                    />
                  ) : (
                    c.criterion
                  )}
                </td>
                <td className="py-3 px-3 align-top border-l border-slate-100 text-slate-600">
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={c.beginning}
                      onChange={(e) => handleCriterionChange(idx, 'beginning', e.target.value)}
                      className="w-full text-xs p-1 border border-slate-300 rounded"
                    />
                  ) : (
                    c.beginning
                  )}
                </td>
                <td className="py-3 px-3 align-top border-l border-slate-100 text-slate-600">
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={c.developing}
                      onChange={(e) => handleCriterionChange(idx, 'developing', e.target.value)}
                      className="w-full text-xs p-1 border border-slate-300 rounded"
                    />
                  ) : (
                    c.developing
                  )}
                </td>
                <td className="py-3 px-3 align-top border-l border-slate-100 text-slate-800 font-medium bg-slate-50/30">
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={c.secure}
                      onChange={(e) => handleCriterionChange(idx, 'secure', e.target.value)}
                      className="w-full text-xs p-1 border border-slate-300 rounded"
                    />
                  ) : (
                    c.secure
                  )}
                </td>
                <td className="py-3 px-3 align-top border-l border-slate-100 text-teal-900 bg-teal-50/30">
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={c.extending}
                      onChange={(e) => handleCriterionChange(idx, 'extending', e.target.value)}
                      className="w-full text-xs p-1 border border-slate-300 rounded"
                    />
                  ) : (
                    c.extending
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked View for 375px+ screens (Hidden in print) */}
      <div className="md:hidden print:hidden space-y-4">
        {editableRubric.criteria.map((c, idx) => (
          <div key={c.id || idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
            <div className="font-bold text-sm text-slate-900 mb-2.5 pb-1.5 border-b border-slate-200">
              {isEditing ? (
                <div>
                  <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Criterion {idx + 1}:</label>
                  <input
                    type="text"
                    value={c.criterion}
                    onChange={(e) => handleCriterionChange(idx, 'criterion', e.target.value)}
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded font-semibold text-slate-900"
                  />
                </div>
              ) : (
                `${idx + 1}. ${c.criterion}`
              )}
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="font-semibold text-slate-500 block mb-0.5">Beginning (1)</span>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={c.beginning}
                    onChange={(e) => handleCriterionChange(idx, 'beginning', e.target.value)}
                    className="w-full text-xs p-1 border border-slate-300 rounded text-slate-800"
                  />
                ) : (
                  <p className="text-slate-700">{c.beginning}</p>
                )}
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="font-semibold text-slate-600 block mb-0.5">Developing (2)</span>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={c.developing}
                    onChange={(e) => handleCriterionChange(idx, 'developing', e.target.value)}
                    className="w-full text-xs p-1 border border-slate-300 rounded text-slate-800"
                  />
                ) : (
                  <p className="text-slate-700">{c.developing}</p>
                )}
              </div>
              <div className="p-2 bg-teal-50/50 rounded border border-teal-200">
                <span className="font-semibold text-teal-800 block mb-0.5">Secure (3) · Grade Target</span>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={c.secure}
                    onChange={(e) => handleCriterionChange(idx, 'secure', e.target.value)}
                    className="w-full text-xs p-1 border border-teal-300 rounded text-slate-900"
                  />
                ) : (
                  <p className="text-slate-800">{c.secure}</p>
                )}
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="font-semibold text-slate-700 block mb-0.5">Extending (4)</span>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={c.extending}
                    onChange={(e) => handleCriterionChange(idx, 'extending', e.target.value)}
                    className="w-full text-xs p-1 border border-slate-300 rounded text-slate-800"
                  />
                ) : (
                  <p className="text-slate-700">{c.extending}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
