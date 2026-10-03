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
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentView,
  onNavigate,
  lang,
  onToggleLang,
  children,
}) => {
  const t = translations[lang];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFB] text-slate-800">
      {/* Header (Desktop + Mobile) */}
      <Header
        currentView={currentView}
        onNavigate={onNavigate}
        lang={lang}
        onToggleLang={onToggleLang}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 pb-20 md:pb-12">
        {children}
      </main>

      {/* Footer (Desktop & Tablet) */}
      <footer className="no-print bg-[#0B1B2B] text-slate-400 text-xs py-8 border-t border-[#16324F] hidden md:block">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="font-bold text-white tracking-tight">
                Subjects2Skills Teacher Studio
              </span>
              <span className="text-teal-400">·</span>
              <span className="text-slate-400">NEP 2020 & NCF-SE 2023 Aligned MVP</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              {t.tagline} {t.officialDisclaimer}
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors"
            >
              {t.navAbout}
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('toolkit')}
              className="hover:text-white transition-colors"
            >
              {t.navToolkit}
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('feedback')}
              className="hover:text-white transition-colors"
            >
              {t.navFeedback}
            </button>
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
