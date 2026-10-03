/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LanguageCode, translations } from '../utils/i18n';
import { BookOpen, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  lang: LanguageCode;
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  lang,
  onToggleLang,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-[#0F2438] text-white border-b border-[#1E3A56] no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-md py-1"
          aria-label="Subjects2Skills Teacher Studio Home"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shrink-0 shadow-xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white block">
              Subjects2Skills
            </span>
            <span className="text-[11px] text-teal-300 font-medium tracking-normal block">
              {t.appStudio}
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (desktop & tablet) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors py-1 hover:text-white ${
              currentView === 'home' ? 'text-white border-b-2 border-teal-400 font-semibold' : ''
            }`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => onNavigate('create')}
            className={`transition-colors py-1 hover:text-white ${
              currentView === 'create' || currentView === 'generated'
                ? 'text-white border-b-2 border-teal-400 font-semibold'
                : ''
            }`}
          >
            {t.navCreate}
          </button>
          <button
            onClick={() => onNavigate('toolkit')}
            className={`transition-colors py-1 hover:text-white ${
              currentView === 'toolkit' ? 'text-white border-b-2 border-teal-400 font-semibold' : ''
            }`}
          >
            {t.navToolkit}
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors py-1 hover:text-white ${
              currentView === 'about' ? 'text-white border-b-2 border-teal-400 font-semibold' : ''
            }`}
          >
            {t.navAbout}
          </button>
          <button
            onClick={() => onNavigate('feedback')}
            className={`transition-colors py-1 hover:text-white ${
              currentView === 'feedback' ? 'text-white border-b-2 border-teal-400 font-semibold' : ''
            }`}
          >
            {t.navFeedback}
          </button>
        </nav>

        {/* Zone 3: Actions - Language toggle & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-[#16324F] hover:bg-[#1E3E61] text-teal-200 border border-[#234A72] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            title="Toggle English / Hindi interface labels"
            aria-label={`Switch interface language to ${lang === 'en' ? 'Hindi' : 'English'}`}
          >
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
              {lang === 'en' ? 'HI' : 'EN'}
            </span>
            <span className="text-slate-200 font-normal">
              {lang === 'en' ? 'हिंदी' : 'English'}
            </span>
          </button>

          {currentView !== 'create' && currentView !== 'generated' && (
            <button
              onClick={() => onNavigate('create')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-md transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-100" />
              <span>{t.navCreate}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
