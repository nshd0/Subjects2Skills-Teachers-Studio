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
import { requestResourceGeneration, FALLBACK_NOTICE } from './services/apiService';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [lang, setLang] = useState<LanguageCode>('en');
  const [activeResource, setActiveResource] = useState<GeneratedResource | null>(null);
  const [lastRequest, setLastRequest] = useState<TeacherRequest | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationNotice, setGenerationNotice] = useState<string | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleGenerate = async (req: TeacherRequest) => {
    setIsGenerating(true);
    setLastRequest(req);
    try {
      const response = await requestResourceGeneration(req);
      setActiveResource(response.resource);
      setUsedFallback(response.usedFallback);
      setGenerationNotice(
        response.usedFallback
          ? FALLBACK_NOTICE
          : 'Generated securely with Gemini Structured Outputs (NEP 2020 / NCF-SE 2023 schema).'
      );
      setCurrentView('generated');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      const fallback = generateMockResource(req);
      setActiveResource(fallback);
      setUsedFallback(true);
      setGenerationNotice(FALLBACK_NOTICE);
      setCurrentView('generated');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRetryGeneration = () => {
    if (lastRequest) {
      handleGenerate(lastRequest);
    }
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

  const handleLaunchUseCase = (useCaseKey: string, initialTopic?: string) => {
    const resourceMap: Record<string, 'Lesson Plan' | 'Worksheet' | 'Formative Assessment' | 'Rubric' | 'Project Brief'> = {
      'plan-a-lesson': 'Lesson Plan',
      'check-prior-learning': 'Formative Assessment',
      'differentiate-work': 'Worksheet',
      'create-an-assessment': 'Formative Assessment',
      'build-a-project': 'Project Brief',
      'make-a-rubric': 'Rubric',
      'give-feedback': 'Formative Assessment',
      'prepare-a-parent-note': 'Lesson Plan',
    };

    const targetResource = resourceMap[useCaseKey] || 'Lesson Plan';
    setLastRequest((prev) => ({
      stage: prev?.stage || 'Middle',
      grade: prev?.grade || '7',
      subject: prev?.subject || 'Science',
      topic: initialTopic || (useCaseKey === 'check-prior-learning' ? 'Key Concept Diagnostic' : useCaseKey === 'prepare-a-parent-note' ? 'Weekly Learning Progress & Family Support' : prev?.topic || ''),
      duration: prev?.duration || '40',
      desiredResource: targetResource,
      language: prev?.language || 'English',
      internetAccess: prev?.internetAccess || 'None',
      learnerProfile: prev?.learnerProfile || 'Mixed levels',
    }));
    setCurrentView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStage = (stage: 'Foundational' | 'Preparatory' | 'Middle' | 'Secondary') => {
    const stageGradeMap: Record<string, string> = {
      Foundational: '2',
      Preparatory: '4',
      Middle: '7',
      Secondary: '10',
    };
    setLastRequest((prev) => ({
      stage,
      grade: stageGradeMap[stage] || '7',
      subject: stage === 'Foundational' ? 'Foundational Numeracy & Literacy' : prev?.subject || 'Science',
      topic: prev?.topic || '',
      duration: prev?.duration || '40',
      desiredResource: prev?.desiredResource || 'Lesson Plan',
      language: prev?.language || 'English',
      internetAccess: prev?.internetAccess || 'None',
      learnerProfile: prev?.learnerProfile || 'Mixed levels',
    }));
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
      onQuickExample={handleQuickExample}
    >
      {currentView === 'home' && (
        <HomePage
          onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onQuickExample={handleQuickExample}
          onLaunchUseCase={handleLaunchUseCase}
          onSelectStage={handleSelectStage}
          lang={lang}
        />
      )}

      {currentView === 'create' && (
        <CreateResourcePage
          onGenerate={handleGenerate}
          lang={lang}
          initialValues={lastRequest}
          isGenerating={isGenerating}
        />
      )}

      {currentView === 'generated' && activeResource && (
        <GeneratedResourcePage
          key={activeResource.id}
          resource={activeResource}
          onModifyInputs={handleModifyInputs}
          lang={lang}
          generationNotice={generationNotice}
          usedFallback={usedFallback}
          onRetryGeneration={handleRetryGeneration}
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
