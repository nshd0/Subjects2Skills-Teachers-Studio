/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Printer, Copy, Download, Check, FileText } from 'lucide-react';
import { LanguageCode, translations } from '../utils/i18n';
import { GeneratedResource } from '../types';
import { formatResourceAsText } from '../services/mockGenerator';

interface PrintToolbarProps {
  resource: GeneratedResource;
  lang: LanguageCode;
  onBackToEdit?: () => void;
}

export const PrintToolbar: React.FC<PrintToolbarProps> = ({
  resource,
  lang,
  onBackToEdit,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const t = translations[lang];

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    try {
      const text = formatResourceAsText(resource);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    const text = formatResourceAsText(resource);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const sanitizedTitle = resource.request.topic.toLowerCase().replace(/[^a-z0-9]/g, '_');
    link.download = `subjects2skills_${sanitizedTitle}_${resource.request.grade}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="no-print bg-white border-b border-slate-200 sticky top-14 sm:top-16 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {onBackToEdit && (
            <button
              type="button"
              onClick={onBackToEdit}
              className="text-xs font-semibold text-teal-800 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-md transition-colors"
            >
              ← {lang === 'hi' ? 'फॉर्म पर वापस जाएं' : 'Modify Inputs'}
            </button>
          )}
          <span className="text-xs text-slate-500 hidden sm:inline">
            <span className="font-semibold text-slate-700">{resource.resourceType}</span> · Grade {resource.request.grade} {resource.request.subject}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Copy to clipboard */}
          <button
            type="button"
            onClick={handleCopy}
            className={`min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-md border transition-all inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer ${
              copied
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'hi' ? 'कॉपी हो गया!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.copyClipboard}</span>
              </>
            )}
          </button>

          {/* Download TXT */}
          <button
            type="button"
            onClick={handleDownload}
            className={`min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-md border transition-all inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer ${
              downloaded
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {downloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'hi' ? 'डाउनलोड हुआ!' : 'Downloaded!'}</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.downloadTxt}</span>
              </>
            )}
          </button>

          {/* Print / Save PDF */}
          <button
            type="button"
            onClick={handlePrint}
            className="min-h-[38px] px-3.5 py-1.5 text-xs font-bold text-white bg-[#0F2438] hover:bg-[#16324F] rounded-md transition-colors inline-flex items-center gap-1.5 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-teal-300" />
            <span>{t.printSavePdf}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
