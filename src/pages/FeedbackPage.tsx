/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FeedbackForm } from '../components/FeedbackForm';
import { LanguageCode } from '../utils/i18n';

interface FeedbackPageProps {
  lang: LanguageCode;
}

export const FeedbackPage: React.FC<FeedbackPageProps> = ({ lang }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <FeedbackForm lang={lang} />
    </div>
  );
};
