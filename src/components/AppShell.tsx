/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './Header';
import { LanguageCode, translations } from '../utils/i18n';
import { Home, Sparkles, BookOpen, ShieldCheck, MessageSquare } from 'lucide-react';

interface AppShellProps {
  currentView: string;
  onNavigate: (view: string) => void;
  lang: LanguageCode;
  onToggleLang: () => void;
  onQuickExample?: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentView,
  onNavigate,
  lang,
  onToggleLang,
  onQuickExample,
  children,
}) => {
  const t = translations[lang];

  const handleHowItWorks = () => {
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

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFB] text-slate-800">
      {/* Header (Desktop + Mobile) */}
      <Header
        currentView={currentView}
        onNavigate={onNavigate}
        lang={lang}
        onToggleLang={onToggleLang}
        onQuickExample={onQuickExample}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 pb-10">
        {children}
      </main>

      {/* Footer (Section 12: Unified, responsive, visible on mobile & desktop with bottom bar clearance) */}
      <footer className="no-print bg-[#0B1B2B] text-slate-400 text-xs py-10 border-t border-[#16324F] mb-14 md:mb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base tracking-tight">
                  Subjects2Skills Teacher Studio
                </span>
                <span className="text-teal-400" aria-hidden="true">·</span>
                <span className="text-teal-300 text-xs font-medium">NEP 2020 & NCF-SE 2023</span>
              </div>
              <p className="text-slate-300 text-xs">
                AI-enabled workflows for Indian K–12 teachers
              </p>
            </div>

            {/* Navigation links */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-300">
              <button
                type="button"
                onClick={() => onNavigate('create')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {t.navCreate}
              </button>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => onNavigate('toolkit')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {t.navToolkit}
              </button>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={handleHowItWorks}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {lang === 'hi' ? 'यह कैसे काम करता है' : 'How It Works'}
              </button>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => onNavigate('feedback')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {t.navFeedback}
              </button>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <a
                href="https://github.com/nshd0/Subjects2Skills-Teachers-Studio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline decoration-slate-600 hover:decoration-teal-400 cursor-pointer"
              >
                GitHub
              </a>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privacy & Safety
              </button>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {t.navAbout}
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#16324F] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
            <p>
              Independent educator-built project. Not an official Government of India, NCERT, or CBSE platform.
            </p>
            <p className="shrink-0 text-slate-400">
              No student personal data required • 100% Teacher-controlled
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Ergonomic Bottom Tab Bar (thumb navigation anchor) */}
      <nav
        aria-label="Mobile Navigation"
        className="no-print md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2"
      >
        <div className="grid grid-cols-5 items-center h-14 max-w-md mx-auto">
          {/* Home */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
              currentView === 'home'
                ? 'text-teal-700 font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[60px]">
              {t.navHome}
            </span>
          </button>

          {/* Create */}
          <button
            type="button"
            onClick={() => onNavigate('create')}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
              currentView === 'create' || currentView === 'generated'
                ? 'text-teal-700 font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[60px]">
              {t.navCreate}
            </span>
          </button>

          {/* Toolkit */}
          <button
            type="button"
            onClick={() => onNavigate('toolkit')}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
              currentView === 'toolkit'
                ? 'text-teal-700 font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[60px]">
              {t.navToolkit}
            </span>
          </button>

          {/* Safety */}
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
              currentView === 'about'
                ? 'text-teal-700 font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[60px]">
              {t.navAbout}
            </span>
          </button>

          {/* Feedback */}
          <button
            type="button"
            onClick={() => onNavigate('feedback')}
            className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
              currentView === 'feedback'
                ? 'text-teal-700 font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[60px]">
              {t.navFeedback}
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};
