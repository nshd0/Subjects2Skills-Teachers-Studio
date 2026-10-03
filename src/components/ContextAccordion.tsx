/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { TeachingLanguage, InternetAccess, LearnerProfile } from '../types';
import { LanguageCode, translations } from '../utils/i18n';

interface ContextAccordionProps {
  language: TeachingLanguage;
  onChangeLanguage: (val: TeachingLanguage) => void;
  classSize: string;
  onChangeClassSize: (val: string) => void;
  materials: string;
  onChangeMaterials: (val: string) => void;
  internetAccess: InternetAccess;
  onChangeInternetAccess: (val: InternetAccess) => void;
  learnerProfile: LearnerProfile;
  onChangeLearnerProfile: (val: LearnerProfile) => void;
  localContext: string;
  onChangeLocalContext: (val: string) => void;
  customGoal: string;
  onChangeCustomGoal: (val: string) => void;
  lang: LanguageCode;
}

export const ContextAccordion: React.FC<ContextAccordionProps> = ({
  language,
  onChangeLanguage,
  classSize,
  onChangeClassSize,
  materials,
  onChangeMaterials,
  internetAccess,
  onChangeInternetAccess,
  learnerProfile,
  onChangeLearnerProfile,
  localContext,
  onChangeLocalContext,
  customGoal,
  onChangeCustomGoal,
  lang,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang];

  // Count active customizations
  const activeCount = [
    language !== 'English',
    classSize.trim() !== '',
    materials.trim() !== '',
    internetAccess !== 'None',
    learnerProfile !== 'Mixed levels',
    localContext.trim() !== '',
    customGoal.trim() !== ''
  ].filter(Boolean).length;

  return (
    <div className="border border-slate-200 rounded-lg bg-white overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="w-4 h-4 text-teal-700" />
          <span className="text-sm font-semibold text-slate-800">
            {t.classroomContextToggle}
          </span>
          {activeCount > 0 && (
            <span className="text-xs text-teal-700 font-medium">
              · {activeCount} {lang === 'hi' ? 'कस्टम सेटिंग्स' : 'customized'}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-normal">
            {isOpen ? (lang === 'hi' ? 'छुपाएं' : 'Hide') : (lang === 'hi' ? 'दिखाएं' : 'Show')}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Teaching Language */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t.languageLabel}
              </label>
              <select
                value={language}
                onChange={(e) => onChangeLanguage(e.target.value as TeachingLanguage)}
                className="w-full min-h-[44px] px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-800"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Bilingual">Bilingual (Hinglish / Regional mix)</option>
              </select>
            </div>

            {/* Class Size */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t.classSizeLabel}
              </label>
              <input
                type="text"
                placeholder={lang === 'hi' ? 'उदा. 35-40 छात्र' : 'e.g., 35–45 students'}
                value={classSize}
                onChange={(e) => onChangeClassSize(e.target.value)}
                className="w-full min-h-[44px] px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-800 placeholder:text-slate-400"
              />
            </div>

            {/* Internet / Device Access */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t.internetLabel}
              </label>
              <select
                value={internetAccess}
                onChange={(e) => onChangeInternetAccess(e.target.value as InternetAccess)}
                className="w-full min-h-[44px] px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-800"
              >
                <option value="None">{lang === 'hi' ? 'कोई इंटरनेट नहीं (ऑफ़लाइन)' : 'None (100% Offline / Chalkboard)'}</option>
                <option value="Limited">{lang === 'hi' ? 'सीमित (केवल शिक्षक का मोबाइल)' : 'Limited (Teacher phone only)'}</option>
                <option value="Available">{lang === 'hi' ? 'उपलब्ध (स्मार्ट बोर्ड / लैब)' : 'Available (Smart board or lab)'}</option>
              </select>
            </div>

            {/* Learner Profile */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t.learnerProfileLabel}
              </label>
              <select
                value={learnerProfile}
                onChange={(e) => onChangeLearnerProfile(e.target.value as LearnerProfile)}
                className="w-full min-h-[44px] px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-800"
              >
                <option value="Mixed levels">Mixed levels (General classroom)</option>
                <option value="Support needed">Support needed (Foundational gaps)</option>
                <option value="Advanced learners">Advanced learners (Higher challenge)</option>
                <option value="Inclusive classroom">Inclusive classroom (Diverse needs)</option>
              </select>
            </div>
          </div>

          {/* Available materials */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.materialsLabel}
            </label>
            <input
              type="text"
              placeholder={lang === 'hi' ? 'उदा. चम्मच, कटोरी, पानी, चाक, कॉपी' : 'e.g., Chalkboard, steel spoon, warm water, paper, notebooks'}
              value={materials}
              onChange={(e) => onChangeMaterials(e.target.value)}
              className="w-full min-h-[44px] px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* Local context or example */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.localContextLabel}
            </label>
            <input
              type="text"
              placeholder={lang === 'hi' ? 'उदा. स्थानीय बाज़ार, मिट्टी का मटका, चाय की दुकान' : 'e.g., Cooking in earthen pots, weekly village bazaar, monsoon humidity'}
              value={localContext}
              onChange={(e) => onChangeLocalContext(e.target.value)}
              className="w-full min-h-[44px] px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* Custom goal */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.customGoalLabel}
            </label>
            <input
              type="text"
              placeholder={lang === 'hi' ? 'उदा. छात्र ऊष्मा चालन को दैनिक जीवन में पहचान सकें' : 'e.g., Students can distinguish conduction vs convection in cooking'}
              value={customGoal}
              onChange={(e) => onChangeCustomGoal(e.target.value)}
              className="w-full min-h-[44px] px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>
      )}
    </div>
  );
};
