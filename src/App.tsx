/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppShell } from './components/AppShell';
import { HomePage } from './pages/HomePage';
import { CreateResourcePage } from './pages/CreateResourcePage';
import { GeneratedResourcePage } from './pages/GeneratedResourcePage';
import { ToolkitLibraryPage } from './pages/ToolkitLibraryPage';
import { AboutSafetyPage } from './pages/AboutSafetyPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { LanguageCode } from './utils/i18n';
import { TeacherRequest, GeneratedResource } from './types';
import { generateMockResource } from './services/mockGenerator';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [lang, setLang] = useState<LanguageCode>('en');
  const [activeResource, setActiveResource] = useState<GeneratedResource | null>(null);
  const [lastRequest, setLastRequest] = useState<TeacherRequest | undefined>(undefined);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleGenerate = (req: TeacherRequest) => {
    setLastRequest(req);
    const result = generateMockResource(req);
    setActiveResource(result);
    setCurrentView('generated');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickExample = () => {
    const quickReq: TeacherRequest = {
      stage: 'Middle',
      grade: '7',
      subject: 'Science',
      topic: 'Heat Transfer',
      duration: '40',
      desiredResource: 'Lesson Plan',
      language: 'Bilingual',
      materials: 'Paper, steel spoon, cup of warm water, chalkboard',
      internetAccess: 'None',
      learnerProfile: 'Mixed levels',
      localContext: 'Everyday domestic utensils (tawa, spoon, kulhad)',
    };
    handleGenerate(quickReq);
  };

  const handleModifyInputs = () => {
    setCurrentView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppShell
      currentView={currentView}
      onNavigate={(view) => {
        setCurrentView(view);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      lang={lang}
      onToggleLang={toggleLanguage}
    >
      {currentView === 'home' && (
        <HomePage
          onNavigate={(view) => setCurrentView(view)}
          onQuickExample={handleQuickExample}
          lang={lang}
        />
      )}

      {currentView === 'create' && (
        <CreateResourcePage
          onGenerate={handleGenerate}
          lang={lang}
          initialValues={lastRequest}
        />
      )}

      {currentView === 'generated' && activeResource && (
        <GeneratedResourcePage
          resource={activeResource}
          onModifyInputs={handleModifyInputs}
          lang={lang}
        />
      )}

      {currentView === 'toolkit' && (
        <ToolkitLibraryPage lang={lang} />
      )}

      {currentView === 'about' && (
        <AboutSafetyPage lang={lang} />
      )}

      {currentView === 'feedback' && (
        <FeedbackPage lang={lang} />
      )}
    </AppShell>
  );
}
