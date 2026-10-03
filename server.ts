/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateTeacherRequest } from './server/validator';
import { generateResourceWithGemini, regenerateSectionWithGemini } from './server/geminiService';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '1mb' }));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
  res.json({
    status: 'ok',
    hasGeminiApiKey: hasKey,
    model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
  });
});

// Full Resource Generation Route
app.post('/api/generate-resource', async (req, res) => {
  try {
    const validation = validateTeacherRequest(req.body);
    if (!validation.isValid || !validation.request) {
      res.status(400).json({
        error: validation.error || 'Invalid teacher input.',
      });
      return;
    }

    const result = await generateResourceWithGemini(validation.request);
    res.json({
      resource: result.resource,
      usedFallback: result.usedFallback,
      fallbackReason: result.fallbackReason || null,
    });
  } catch (err: any) {
    console.error('[API_ERROR] /api/generate-resource failed:', err?.message || err);
    res.status(500).json({
      error: 'An internal error occurred while generating the classroom resource.',
    });
  }
});

// Section-level Regeneration Route
app.post('/api/regenerate-section', async (req, res) => {
  try {
    const { sectionKey, request, currentValue } = req.body;
    if (!sectionKey || !request) {
      res.status(400).json({ error: 'Missing sectionKey or request parameters.' });
      return;
    }

    const validation = validateTeacherRequest(request);
    if (!validation.isValid || !validation.request) {
      res.status(400).json({ error: 'Invalid teacher context.' });
      return;
    }

    const result = await regenerateSectionWithGemini(sectionKey, validation.request, currentValue);
    res.json(result);
  } catch (err: any) {
    console.error('[API_ERROR] /api/regenerate-section failed:', err?.message || err);
    res.status(500).json({
      error: 'Failed to regenerate section.',
    });
  }
});

// Vite middleware in dev or static files in production
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  const distDir = path.resolve(__dirname, 'dist');
  app.use(express.static(distDir));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(distDir, 'index.html'));
  });
} else {
  // Development mode: mount Vite dev server as middleware
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`[SERVER] Subjects2Skills Teacher Studio running on http://0.0.0.0:${port} (${isProduction ? 'production' : 'development'})`);
});
