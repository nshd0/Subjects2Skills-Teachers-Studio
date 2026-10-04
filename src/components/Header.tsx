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
  onQuickExample?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  lang,
  onToggleLang,
  onQuickExample,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = translations[lang];

  const handleHowItWorks = () => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateAndClose = (view: string) => {
    setMobileMenuOpen(false);
    onNavigate(view);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F2438] text-white border-b border-[#1E3A56] no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Wordmark */}
        <button
          type="button"
          onClick={() => navigateAndClose('home')}
          className="flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-md py-1 cursor-pointer"
          aria-label="Subjects2Skills Teacher Studio Home"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shrink-0 shadow-xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <span className="text-sm sm:text-base font-bold tracking-tight text-white block">
              Subjects2Skills
            </span>
            <span className="text-[10px] text-teal-300 font-medium tracking-normal block">
              Teacher Studio
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-5 text-xs lg:text-sm font-medium text-slate-300"
        >
          <button
            type="button"
            onClick={() => onNavigate('create')}
            className={`transition-colors py-1 hover:text-white cursor-pointer ${
              currentView === 'create' || currentView === 'generated'
                ? 'text-white border-b-2 border-teal-400 font-semibold'
                : ''
            }`}
          >
            {t.navCreate}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('toolkit')}
            className={`transition-colors py-1 hover:text-white cursor-pointer ${
              currentView === 'toolkit' ? 'text-white border-b-2 border-teal-400 font-semibold' : ''
            }`}
          >
            {t.navToolkit}
          </button>
          <button
            type="button"
            onClick={handleHowItWorks}
            className="transition-colors py-1 hover:text-white cursor-pointer"
          >
            {lang === 'hi' ? 'यह कैसे काम करता है' : 'How It Works'}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className={`transition-colors py-1 hover:text-white cursor-pointer ${
              currentView === 'about' ? 'text-white border-b-2 border-teal-400 font-semibold' : ''
            }`}
          >
            {t.navAbout}
          </button>
        </nav>

        {/* Header Actions: Primary Button, Lang, Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          {/* Primary Button: Try Quick Example */}
          {onQuickExample && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onQuickExample();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-colors shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 min-h-[38px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-950" />
              <span className="whitespace-nowrap">{t.quickExample}</span>
            </button>
          )}

          {/* Language Toggle */}
          <button
            type="button"
            onClick={onToggleLang}
            className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium bg-[#16324F] hover:bg-[#1E3E61] text-teal-200 border border-[#234A72] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer min-h-[38px]"
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

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#16324F] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 min-w-[44px] min-h-[44px] cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B1B2B] border-t border-[#1E3A56] px-4 py-3 space-y-2">
          <div className="flex flex-col space-y-1 text-sm font-medium text-slate-200">
            <button
              type="button"
              onClick={() => navigateAndClose('create')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#16324F] transition-colors min-h-[44px] flex items-center"
            >
              {t.navCreate}
            </button>
            <button
              type="button"
              onClick={() => navigateAndClose('toolkit')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#16324F] transition-colors min-h-[44px] flex items-center"
            >
              {t.navToolkit}
            </button>
            <button
              type="button"
              onClick={handleHowItWorks}
              className="text-left px-3 py-2 rounded-md hover:bg-[#16324F] transition-colors min-h-[44px] flex items-center"
            >
              {lang === 'hi' ? 'यह कैसे काम करता है' : 'How It Works'}
            </button>
            <button
              type="button"
              onClick={() => navigateAndClose('about')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#16324F] transition-colors min-h-[44px] flex items-center"
            >
              {t.navAbout}
            </button>
          </div>

          <div className="pt-2 border-t border-[#1E3A56] flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onToggleLang();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium bg-[#16324F] text-teal-200 min-h-[44px]"
            >
              <span className="text-[10px] uppercase font-bold text-amber-400">
                {lang === 'en' ? 'HI' : 'EN'}
              </span>
              <span>{lang === 'en' ? 'हिंदी में देखें' : 'View in English'}</span>
            </button>

            {onQuickExample && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onQuickExample();
                }}
                className="text-xs font-bold text-slate-950 bg-amber-400 px-3 py-2 rounded-md min-h-[44px] flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.quickExample}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
