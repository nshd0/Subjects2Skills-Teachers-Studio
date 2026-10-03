/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FeedbackData } from '../types';
import { LanguageCode, translations } from '../utils/i18n';
import { CheckCircle2, MessageSquare, Send } from 'lucide-react';

interface FeedbackFormProps {
  lang: LanguageCode;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ lang }) => {
  const t = translations[lang];

  const [role, setRole] = useState<FeedbackData['role']>('Teacher');
  const [mostUseful, setMostUseful] = useState('');
  const [whatWasMissing, setWhatWasMissing] = useState('');
  const [wouldUseAgain, setWouldUseAgain] = useState<FeedbackData['wouldUseAgain']>('Yes');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mostUseful.trim() && !whatWasMissing.trim()) {
      setError(
        lang === 'hi'
          ? 'कृपया कम से कम एक प्रतिक्रिया क्षेत्र भरें।'
          : 'Please complete at least one of the feedback questions.'
      );
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-emerald-200 rounded-xl p-6 sm:p-8 text-center max-w-lg mx-auto shadow-xs">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {t.feedbackSuccess}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
          {lang === 'hi'
            ? 'आपकी टिप्पणियां इस शिक्षक-संचालित उपकरण को भारतीय कक्षाओं के लिए बेहतर बनाने में मदद करेंगी।'
            : 'Your observations help ensure this teacher-controlled studio remains grounded in practical, low-prep Indian classroom realities.'}
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setMostUseful('');
            setWhatWasMissing('');
            setEmail('');
          }}
          className="px-4 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-md transition-colors"
        >
          {lang === 'hi' ? 'अन्य प्रतिक्रिया दें' : 'Submit another note'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 max-w-xl mx-auto shadow-xs space-y-5">
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-teal-700" />
          <span>{t.feedbackTitle}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t.feedbackSub}
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-md">
          {error}
        </div>
      )}

      {/* Role */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          {lang === 'hi' ? 'आपकी भूमिका' : 'Your Role in School'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(['Teacher', 'Coordinator', 'School Leader', 'Other'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`min-h-[44px] px-3 py-2 text-xs font-medium rounded-md border text-left transition-all ${
                role === r
                  ? 'bg-teal-50 border-teal-600 text-teal-950 font-semibold ring-1 ring-teal-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {r === 'Teacher' && t.roleTeacher}
              {r === 'Coordinator' && t.roleCoordinator}
              {r === 'School Leader' && t.roleLeader}
              {r === 'Other' && t.roleOther}
            </button>
          ))}
        </div>
      </div>

      {/* Most useful feature */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          {t.usefulField}
        </label>
        <textarea
          rows={3}
          value={mostUseful}
          onChange={(e) => setMostUseful(e.target.value)}
          placeholder={
            lang === 'hi'
              ? 'उदा. 5E क्रम, ऑफ़लाइन विकल्प, रूब्रिक स्तर...'
              : 'e.g., 5E time sequence, low-tech alternatives, differentiated tasks...'
          }
          className="w-full text-xs sm:text-sm p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-800"
        />
      </div>

      {/* What was missing */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          {t.missingField}
        </label>
        <textarea
          rows={3}
          value={whatWasMissing}
          onChange={(e) => setWhatWasMissing(e.target.value)}
          placeholder={
            lang === 'hi'
              ? 'उदा. क्षेत्रीय भाषा शब्दावली, बड़े कक्षा समूहों के लिए प्रबंधन टिप्स...'
              : 'e.g., Regional vocabulary hints, multi-grade seating tips, board exam alignment...'
          }
          className="w-full text-xs sm:text-sm p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-800"
        />
      </div>

      {/* Would you use this again */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          {t.repeatField}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['Yes', 'Maybe', 'No'] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setWouldUseAgain(opt)}
              className={`min-h-[44px] py-2 text-xs font-semibold rounded-md border text-center transition-all ${
                wouldUseAgain === opt
                  ? 'bg-teal-50 border-teal-600 text-teal-950 ring-1 ring-teal-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {opt === 'Yes' && (lang === 'hi' ? 'हाँ (अवश्य)' : 'Yes')}
              {opt === 'Maybe' && (lang === 'hi' ? 'शायद' : 'Maybe')}
              {opt === 'No' && (lang === 'hi' ? 'नहीं' : 'No')}
            </button>
          ))}
        </div>
      </div>

      {/* Optional Email */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          {t.emailOptional}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="teacher@school.edu.in"
          className="w-full min-h-[44px] px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-800 placeholder:text-slate-400"
        />
        <span className="text-[11px] text-slate-500 mt-1 block">
          {lang === 'hi'
            ? 'गोपनीयता सूचना: कोई व्यक्तिगत डेटा किसी सर्वर पर संग्रहीत नहीं किया जाता है।'
            : 'Privacy notice: Zero server storage. Form processes strictly inside your current browser session.'}
        </span>
      </div>

      <button
        type="submit"
        className="w-full min-h-[48px] px-4 py-2.5 bg-[#0F2438] hover:bg-[#16324F] text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
      >
        <Send className="w-4 h-4 text-teal-300" />
        <span>{t.submitFeedback}</span>
      </button>
    </form>
  );
};
