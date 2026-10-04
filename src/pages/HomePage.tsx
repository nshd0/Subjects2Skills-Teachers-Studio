/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LanguageCode } from '../utils/i18n';
import { SchoolStage } from '../types';
import { toolkitItems } from '../data/toolkitData';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Split,
  CheckSquare,
  Compass,
  TableProperties,
  MessageSquare,
  FileText,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  Cpu,
  WifiOff,
  UserCheck,
  ChevronRight,
  Printer,
  Sparkle,
  Eye,
  GraduationCap,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string) => void;
  onQuickExample: () => void;
  onLaunchUseCase?: (useCaseKey: string, initialTopic?: string) => void;
  onSelectStage?: (stage: SchoolStage) => void;
  lang: LanguageCode;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onQuickExample,
  onLaunchUseCase,
  onSelectStage,
  lang,
}) => {
  // Output preview active tab state
  const [previewTab, setPreviewTab] = useState<'plan' | 'diff' | 'assessment' | 'rubric'>('plan');

  const handleLaunch = (useCaseKey: string, initialTopic?: string) => {
    if (onLaunchUseCase) {
      onLaunchUseCase(useCaseKey, initialTopic);
    } else {
      onNavigate('create');
    }
  };

  const handleStageClick = (stage: SchoolStage) => {
    if (onSelectStage) {
      onSelectStage(stage);
    } else {
      onNavigate('create');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-20 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

      {/* =================================================================== */}
      {/* 2. HERO SECTION */}
      {/* =================================================================== */}
      <section
        aria-labelledby="hero-heading"
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xs space-y-8"
      >
        <div className="max-w-3xl space-y-4">
          {/* Subtle contextual kicker (unboxed text with dot) */}
          <div className="text-xs font-semibold text-teal-800 tracking-wider uppercase flex flex-wrap items-center gap-2">
            <span>NEP 2020 & NCF-SE 2023 Aligned</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Teacher Workflow Assistant</span>
          </div>

          <h1
            id="hero-heading"
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0F2438] tracking-tight leading-[1.15] text-balance"
          >
            {lang === 'hi'
              ? 'आत्मविश्वास से योजना बनाएं, आकलन करें और सिखाएं।'
              : 'Plan, assess, and respond with confidence.'}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
            {lang === 'hi'
              ? 'अपने शिक्षार्थियों के लिए व्यावहारिक, विभेदित कक्षा संसाधन बनाएं—दक्षता-आधारित और अनुभवात्मक शिक्षण के अनुरूप।'
              : 'Create practical, differentiated classroom resources for your learners—aligned with competency-based and experiential teaching.'}
          </p>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {lang === 'hi'
              ? 'बुनियादी, प्रारंभिक, माध्यमिक और उच्च माध्यमिक स्तर के शिक्षकों के लिए। कम संसाधन और सीमित इंटरनेट वाली वास्तविक भारतीय कक्षाओं के लिए निर्मित।'
              : 'For Foundational, Preparatory, Middle, and Secondary Stage teachers. Designed for real Indian classrooms, including low-resource and low-connectivity contexts.'}
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('create')}
              className="min-h-[48px] px-6 py-3 bg-[#0F2438] hover:bg-[#16324F] active:bg-[#0B1B2B] text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <Sparkles className="w-4 h-4 text-teal-300 shrink-0" />
              <span>{lang === 'hi' ? 'संसाधन तैयार करें' : 'Create a Resource'}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              type="button"
              onClick={onQuickExample}
              className="min-h-[48px] px-5 py-3 bg-amber-50 hover:bg-amber-100 active:bg-amber-200 text-amber-950 border border-amber-300 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>{lang === 'hi' ? 'त्वरित उदाहरण देखें (कक्षा 7 विज्ञान)' : 'Try Quick Example'}</span>
            </button>
          </div>

          {/* Trust line */}
          <div className="pt-2 text-xs text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-1">
            <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
            <span className="font-medium text-slate-700">Teacher-controlled</span>
            <span aria-hidden="true" className="text-slate-400">•</span>
            <span className="font-medium text-slate-700">Review required</span>
            <span aria-hidden="true" className="text-slate-400">•</span>
            <span className="font-medium text-slate-700">No student data needed</span>
          </div>
        </div>

        {/* Visual Product Preview: Teacher need → Structured workflow → Review, print, and use */}
        <div className="pt-4 border-t border-slate-100">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
            {lang === 'hi' ? 'शिक्षक कार्यप्रवाह दृश्य' : 'How the Studio Works'}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center text-[10px]">1</span>
                <span>Teacher Need</span>
              </div>
              <p className="text-xs text-slate-600">
                Select stage, subject, and topic with your actual classroom constraints (time, language, materials).
              </p>
              <div className="text-[11px] text-teal-800 font-mono">Input context in 30 seconds</div>
            </div>

            <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 flex flex-col justify-between space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-900">
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]">2</span>
                <span>Structured Workflow</span>
              </div>
              <p className="text-xs text-slate-600">
                Generates 5E flow, low-cost activity, differentiated tasks (support/core/extension), and 4-level rubric.
              </p>
              <div className="text-[11px] text-teal-800 font-mono">Strict NEP & NCF schema limits</div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 flex flex-col justify-between space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">3</span>
                <span>Review, Print & Use</span>
              </div>
              <p className="text-xs text-slate-600">
                Teacher reviews and edits sections independently, checks readiness, and prints A4 format offline.
              </p>
              <div className="text-[11px] text-amber-900 font-mono">Zero login · Zero student tracking</div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3. USE-CASE LAUNCHER */}
      {/* =================================================================== */}
      <section aria-labelledby="usecases-heading" className="space-y-6">
        <div>
          <h2
            id="usecases-heading"
            className="text-xl sm:text-2xl font-black text-[#0F2438] tracking-tight"
          >
            {lang === 'hi' ? 'आज आपको किस कार्य में सहायता चाहिए?' : 'What do you need help with today?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tap any classroom goal to launch the workflow with prefilled pedagogical defaults.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              key: 'plan-a-lesson',
              title: 'Plan a lesson',
              desc: '5E sequence, timing, low-cost probe, and questioning prompts.',
              icon: BookOpen,
              color: 'text-teal-700 bg-teal-50',
            },
            {
              key: 'check-prior-learning',
              title: 'Check prior learning',
              desc: 'Diagnostic prompts and misconception detectors before new topics.',
              icon: HelpCircle,
              color: 'text-indigo-700 bg-indigo-50',
            },
            {
              key: 'differentiate-work',
              title: 'Differentiate work',
              desc: 'Support, core, and extension tasks tailored for mixed readiness.',
              icon: Split,
              color: 'text-amber-800 bg-amber-50',
            },
            {
              key: 'create-an-assessment',
              title: 'Create an assessment',
              desc: 'Formative checklist items, evaluation guides, and exit tickets.',
              icon: CheckSquare,
              color: 'text-emerald-700 bg-emerald-50',
            },
            {
              key: 'build-a-project',
              title: 'Build a project',
              desc: 'Driving question, staged milestones, evidence, and cross-subject links.',
              icon: Compass,
              color: 'text-sky-700 bg-sky-50',
            },
            {
              key: 'make-a-rubric',
              title: 'Make a rubric',
              desc: '4-level developmental descriptors (Beginning to Extending).',
              icon: TableProperties,
              color: 'text-purple-700 bg-purple-50',
            },
            {
              key: 'give-feedback',
              title: 'Give feedback',
              desc: 'Actionable feedback stems and misconception cues for quick grading.',
              icon: MessageSquare,
              color: 'text-rose-700 bg-rose-50',
            },
            {
              key: 'prepare-a-parent-note',
              title: 'Prepare a parent note',
              desc: 'Bilingual, non-judgmental progress update and home reinforcement ideas.',
              icon: FileText,
              color: 'text-teal-800 bg-slate-100',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleLaunch(item.key)}
                className="group p-4 sm:p-5 bg-white border border-slate-200 hover:border-teal-400 hover:shadow-xs rounded-xl text-left transition-all flex flex-col justify-between min-h-[130px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-700 transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. WORKFLOW SECTION */}
      {/* =================================================================== */}
      <section
        id="how-it-works"
        aria-labelledby="workflow-heading"
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8"
      >
        <div className="max-w-2xl space-y-2">
          <h2
            id="workflow-heading"
            className="text-xl sm:text-2xl font-black text-[#0F2438] tracking-tight"
          >
            {lang === 'hi' ? 'शिक्षण आवश्यकता से अगले कदम तक' : 'From teaching need to next action'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A linear, coherent pedagogical progression designed around actual classroom periods.
          </p>
        </div>

        {/* 6-step sequential workflow visual */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              step: '01',
              title: 'Teacher need',
              text: 'Define the subject, grade, and topic challenge for tomorrow’s period.',
            },
            {
              step: '02',
              title: 'Class & curriculum context',
              text: 'Factor in period duration (30–60m), class size, and language medium.',
            },
            {
              step: '03',
              title: 'Learner readiness',
              text: 'Surface prior knowledge gaps and common misconceptions early.',
            },
            {
              step: '04',
              title: 'Differentiated learning',
              text: 'Deliver low-cost hands-on activity with support, core, and extension bands.',
            },
            {
              step: '05',
              title: 'Formative evidence',
              text: 'Observe student reasoning and capture exit signal before the bell.',
            },
            {
              step: '06',
              title: 'Next teaching action',
              text: 'Evaluate rubric results to decide whether to re-teach, practice, or advance.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-teal-800 bg-teal-100/60 px-2 py-0.5 rounded">
                  Step {item.step}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Workflow statement */}
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-center gap-3 text-xs sm:text-sm font-medium text-teal-950">
          <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0" />
          <span>Every output is editable, practical, and designed for teacher review.</span>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 5. OUTPUT PREVIEW */}
      {/* =================================================================== */}
      <section aria-labelledby="preview-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2
              id="preview-heading"
              className="text-xl sm:text-2xl font-black text-[#0F2438] tracking-tight"
            >
              {lang === 'hi' ? 'एक अनुरोध। संपूर्ण कक्षा पैक।' : 'One request. A complete classroom pack.'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Sample output for Grade 7 Science: Thermal Conductivity & Heat Flow (Middle Stage · 40 Mins).
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-lg text-[11px] font-semibold text-amber-900 self-start sm:self-auto">
            <span>Suggested output — teacher review required.</span>
          </div>
        </div>

        {/* Tabbed preview container */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-xs space-y-6">
          {/* Segmented interactive tab controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            {[
              { id: 'plan', label: 'Lesson Plan (5E & Activity)' },
              { id: 'diff', label: 'Differentiation (3 Levels)' },
              { id: 'assessment', label: 'Assessment & Questions' },
              { id: 'rubric', label: '4-Level Rubric' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPreviewTab(tab.id as any)}
                className={`min-h-[40px] px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  previewTab === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Lesson Plan */}
          {previewTab === 'plan' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <div className="text-xs font-mono text-teal-800 font-semibold">5E LEARNING SEQUENCE (40 MINS)</div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 pt-2">
                  {[
                    { step: 'Engage (5m)', action: 'Teacher drops steel spoon & pencil into warm water cup. Students predict warmth.' },
                    { step: 'Explore (10m)', action: 'Volunteers touch tips; class classifies into "Gains heat fast" vs "Remains cool".' },
                    { step: 'Explain (10m)', action: 'Introduce conduction (चालन) vs insulation. Contrast with convection & radiation.' },
                    { step: 'Apply (10m)', action: 'Pair challenge: Why are pressure cooker handles bakelite while the base is metal?' },
                    { step: 'Reflect (5m)', action: 'Exit slip: Kulhad vs steel glass tea temperature comparison.' },
                  ].map((s) => (
                    <div key={s.step} className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                      <div className="text-xs font-bold text-slate-800">{s.step}</div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{s.action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experiential Low-Cost Activity */}
              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 space-y-2">
                <div className="text-xs font-bold text-teal-900 uppercase tracking-wide">
                  Experiential Low-Cost Classroom Activity
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Hands-on Spoon & Water Touch Probe:</strong> In groups of 4, students submerge a steel spoon and wooden ruler into warm water (below 45°C). They record which handle conducts thermal energy to fingers first at 30-second intervals.
                </p>
                <div className="text-[11px] text-teal-800 font-medium">
                  Materials required: 1 steel spoon, 1 wooden pencil, 1 plastic cup of warm tap water. Zero special lab apparatus.
                </div>
              </div>

              {/* Low-tech Alternative */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <WifiOff className="w-4 h-4 text-slate-500 shrink-0" />
                <span>
                  <strong>100% Offline Alternative:</strong> Use sunlight and shadow patches on courtyard stone floor to feel radiation and conduction without water.
                </span>
              </div>
            </div>
          )}

          {/* Tab 2: Differentiation */}
          {previewTab === 'diff' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-teal-800 font-semibold uppercase">
                Differentiated Tasks by Readiness Level
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-indigo-900 flex items-center gap-1">
                    <span>Support Band</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                    <li>Sort 4 real objects (nail, scale, copper wire, twig) with a partner using visual picture cards.</li>
                    <li>Complete sentence stem: “Heat moves fastest through ____ because ____.”</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-teal-900 flex items-center gap-1">
                    <span>Core Band</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                    <li>Sketch a frying pan and explain why the base conducts while the handle insulates.</li>
                    <li>Explain in 3 lines why birds fluff their feathers on cold northern India mornings.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-amber-900 flex items-center gap-1">
                    <span>Extension Band</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                    <li>Design a prototype “zero-electricity tiffin warmer” using scrap cloth and cardboard.</li>
                    <li>Analyze traditional Rajasthani earthen clay homes versus modern concrete roofs.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Assessment & Questions */}
          {previewTab === 'assessment' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Questioning Prompts
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <strong className="text-slate-800">Recall:</strong>{' '}
                      <span className="text-slate-600">“What are three common materials in our classroom that conduct heat rapidly?”</span>
                    </div>
                    <div>
                      <strong className="text-slate-800">Reasoning:</strong>{' '}
                      <span className="text-slate-600">“Why does an empty steel tiffin get hot quickly in the sun while a wooden desk does not?”</span>
                    </div>
                    <div>
                      <strong className="text-slate-800">Transfer:</strong>{' '}
                      <span className="text-slate-600">“How do village roof designs (thatch vs tin sheets) exploit the principles of heat conduction?”</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Formative Check & Exit Ticket
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <strong className="text-slate-800">Observation Check:</strong>{' '}
                      <span className="text-slate-600">Student can distinguish at least two conductors from insulators and articulate heat moves hot-to-cold.</span>
                    </div>
                    <div>
                      <strong className="text-slate-800">Exit Ticket Question:</strong>{' '}
                      <span className="text-slate-600">“Why is an electric kettle outer body plastic, but its heating plate is metallic alloy?”</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: 4-Level Rubric */}
          {previewTab === 'rubric' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-teal-800 font-semibold uppercase">
                Competency Rubric: Investigates and classifies materials by thermal conductivity
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                      <th className="py-2.5 px-3 font-semibold">Criterion</th>
                      <th className="py-2.5 px-3 font-semibold text-rose-800">Beginning</th>
                      <th className="py-2.5 px-3 font-semibold text-amber-800">Developing</th>
                      <th className="py-2.5 px-3 font-semibold text-teal-800">Secure</th>
                      <th className="py-2.5 px-3 font-semibold text-indigo-800">Extending</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-900">Observation</td>
                      <td className="py-2.5 px-3">Identifies hot vs cold with teacher aid.</td>
                      <td className="py-2.5 px-3">Records metal warmed faster than wood.</td>
                      <td className="py-2.5 px-3">Accurately records conduction across 2+ materials.</td>
                      <td className="py-2.5 px-3">Quantifies relative conduction rates systematically.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-slate-900">Application</td>
                      <td className="py-2.5 px-3">Cannot connect test to kitchen cookware.</td>
                      <td className="py-2.5 px-3">Names one utensil with heat-resistant handle.</td>
                      <td className="py-2.5 px-3">Explains why cookware pairs metal with insulator handles.</td>
                      <td className="py-2.5 px-3">Analyzes architectural insulation principles.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =================================================================== */}
      {/* 6. INDIAN CLASSROOM NEEDS */}
      {/* =================================================================== */}
      <section aria-labelledby="needs-heading" className="space-y-6">
        <div>
          <h2
            id="needs-heading"
            className="text-xl sm:text-2xl font-black text-[#0F2438] tracking-tight"
          >
            {lang === 'hi' ? 'भारतीय शिक्षकों की वास्तविक कार्यप्रणाली हेतु निर्मित' : 'Built for the way Indian teachers actually work'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Engineered around high pupil-teacher ratios, vernacular instruction, and minimal infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Mixed-level classrooms',
              desc: 'Tackle wide reading readiness in 40+ student rooms with structured 3-tier tasks that keep everyone progressing.',
              icon: Layers,
            },
            {
              title: 'Limited classroom resources',
              desc: 'Every plan uses readily available items (chalk, student notebooks, seeds, water, cardboard) without expensive kits.',
              icon: Compass,
            },
            {
              title: 'Multiple teaching languages',
              desc: 'Generates English, Hindi, and Bilingual lesson plans with native regional analogies (e.g. tawa, matka, thali).',
              icon: MessageSquare,
            },
            {
              title: 'Time-bound periods',
              desc: 'Pacing mapped exactly to 30, 40, or 45-minute timetable slots so lessons conclude cleanly before the bell rings.',
              icon: Clock,
            },
            {
              title: 'Competency-based assessment',
              desc: 'Replaces rote memorization with observable student demonstrations aligned with NEP 2020 and NCF-SE 2023.',
              icon: CheckSquare,
            },
            {
              title: 'Offline-friendly teaching',
              desc: 'Zero reliance on smartboards or school Wi-Fi. All outputs copy to blackboards or print to standard A4 sheets.',
              icon: WifiOff,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-5 bg-white border border-slate-200 rounded-xl space-y-2"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =================================================================== */}
      {/* 7. STAGE SELECTOR */}
      {/* =================================================================== */}
      <section aria-labelledby="stages-heading" className="space-y-6">
        <div>
          <h2
            id="stages-heading"
            className="text-xl sm:text-2xl font-black text-[#0F2438] tracking-tight"
          >
            {lang === 'hi' ? 'चारों स्कूली चरणों के अनुरूप तैयार' : 'Designed across the four schooling stages'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pedagogical structures calibrated to developmental milestones under the 5+3+3+4 school architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              stage: 'Foundational' as SchoolStage,
              grades: 'Grades 1–2 (Ages 3–8)',
              focus: 'Play, stories, oral language, early literacy, numeracy, and observation',
              color: 'border-l-4 border-l-rose-500',
            },
            {
              stage: 'Preparatory' as SchoolStage,
              grades: 'Grades 3–5 (Ages 8–11)',
              focus: 'Activity-based learning, foundational skills, local context, and communication',
              color: 'border-l-4 border-l-amber-500',
            },
            {
              stage: 'Middle' as SchoolStage,
              grades: 'Grades 6–8 (Ages 11–14)',
              focus: 'Inquiry, experimentation, reasoning, data, projects, and computational thinking',
              color: 'border-l-4 border-l-teal-600',
            },
            {
              stage: 'Secondary' as SchoolStage,
              grades: 'Grades 9–12 (Ages 14–18)',
              focus: 'Application, research, argumentation, pathways, portfolios, and independent learning',
              color: 'border-l-4 border-l-indigo-600',
            },
          ].map((s) => (
            <div
              key={s.stage}
              className={`p-5 bg-white border border-slate-200 rounded-xl flex flex-col justify-between space-y-3 ${s.color}`}
            >
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-slate-500 font-semibold">{s.grades}</span>
                <h3 className="text-base font-bold text-slate-900">{s.stage} Stage</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.focus}</p>
              </div>

              <button
                type="button"
                onClick={() => handleStageClick(s.stage)}
                className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 hover:text-teal-900 pt-2 min-h-[44px] cursor-pointer focus:outline-none focus-visible:underline"
              >
                <span>Explore {s.stage.toLowerCase()} tools</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================================== */}
      {/* 8. RESPONSIBLE AI */}
      {/* =================================================================== */}
      <section
        aria-labelledby="responsible-heading"
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6"
      >
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
            Pedagogical Ethics & Safety
          </div>
          <h2
            id="responsible-heading"
            className="text-xl sm:text-2xl font-black text-[#0F2438] tracking-tight"
          >
            {lang === 'hi' ? 'एआई सहायता करता है। शिक्षक निर्णय लेते हैं।' : 'AI assists. Teachers decide.'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Subjects2Skills creates structured first drafts for professional teacher review. It does not replace teacher judgement, claim official endorsement, or require student personal data for basic resource creation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {[
            {
              title: 'Teacher review required',
              desc: 'Every suggested learning outcome and rubric criterion must be verified by the educator.',
              icon: UserCheck,
            },
            {
              title: 'No student data needed',
              desc: 'Zero capture of student names, rolls, marks, photos, or Aadhaar. Completely anonymous.',
              icon: ShieldCheck,
            },
            {
              title: 'Low-tech alternatives',
              desc: 'Every lesson includes zero-internet, zero-photocopy adaptations for resource-lean schools.',
              icon: WifiOff,
            },
            {
              title: 'Local fallback available',
              desc: 'If external API connectivity drops, verified local rule-based templates keep functioning.',
              icon: Cpu,
            },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.title} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-teal-800 shrink-0" />
                  <h3 className="text-xs font-bold text-slate-900">{t.title}</h3>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =================================================================== */}
      {/* 9. QUICK-START CTA */}
      {/* =================================================================== */}
      <section
        aria-labelledby="cta-heading"
        className="bg-[#0F2438] text-white rounded-2xl p-6 sm:p-10 shadow-xs space-y-6"
      >
        <div className="max-w-2xl space-y-2">
          <h2
            id="cta-heading"
            className="text-xl sm:text-3xl font-black text-white tracking-tight"
          >
            {lang === 'hi' ? 'एक कक्षा आवश्यकता से शुरुआत करें' : 'Start with one classroom need'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Choose your stage, grade, subject, and teaching need. Generate a resource. Review it. Adapt it. Use it.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('create')}
            className="min-h-[48px] px-6 py-3 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-[#0F2438] text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
          >
            <span>{lang === 'hi' ? 'पहला संसाधन बनाएं' : 'Create my first resource'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onQuickExample}
            className="min-h-[48px] px-5 py-3 bg-[#16324F] hover:bg-[#1E3E61] active:bg-[#234A72] text-amber-300 border border-[#234A72] rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <span>{lang === 'hi' ? 'कक्षा 7 विज्ञान का उदाहरण देखें' : 'Try Grade 7 Science example'}</span>
          </button>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 10. FREE TOOLKIT */}
      {/* =================================================================== */}
      <section aria-labelledby="toolkit-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2
              id="toolkit-heading"
              className="text-xl sm:text-2xl font-black text-[#0F2438] tracking-tight"
            >
              {lang === 'hi' ? 'निःशुल्क शिक्षक संसाधन' : 'Free teacher resources'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Curated frameworks, observational checklists, and inquiry rubrics available instantly.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('toolkit')}
            className="text-xs font-bold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1 self-start sm:self-auto min-h-[44px] cursor-pointer"
          >
            <span>View all toolkit resources</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolkitItems.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{item.stage}</span>
                  <span>{item.format}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{item.description}</p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('toolkit')}
                className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 hover:text-teal-900 pt-1 min-h-[44px] cursor-pointer focus:outline-none focus-visible:underline"
              >
                <span>Read guide & checklist</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================================== */}
      {/* 11. PILOT FEEDBACK */}
      {/* =================================================================== */}
      <section
        aria-labelledby="feedback-heading"
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6"
      >
        <div className="max-w-2xl space-y-2">
          <h2
            id="feedback-heading"
            className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight"
          >
            {lang === 'hi' ? 'शिक्षकों की प्रतिक्रिया से सुधार' : 'Continuous educator feedback'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Subjects2Skills Teacher Studio is being improved with feedback from educators. Try it with non-sensitive classroom information and tell us what should improve.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('feedback')}
          className="min-h-[44px] px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        >
          <MessageSquare className="w-4 h-4 text-teal-300" />
          <span>Share teacher feedback</span>
        </button>
      </section>

    </div>
  );
};
