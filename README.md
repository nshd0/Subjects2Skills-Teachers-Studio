# Subjects2Skills Teacher Studio

> **Tagline:** From syllabus coverage to student capability.  
> **Mission:** A free, teacher-controlled instructional planning tool for Indian K–12 teachers aligned with the pedagogical goals of the National Education Policy (NEP 2020) and the National Curriculum Framework for School Education (NCF-SE 2023).

---

## 1. Product Purpose & Target Educator

Indian K–12 educators frequently manage multi-grade or mixed-ability classrooms with 40–50+ students, limited preparation windows, variable electricity or internet access, and no budget for specialized lab equipment. 

**Subjects2Skills Teacher Studio** bridges the gap between high-level policy guidelines and practical classroom delivery. It empowers teachers to produce structured, competency-based classroom packs in under two minutes:
- Time-bound **5E learning sequences** (Engage, Explore, Explain, Apply, Reflect) that fit standard 40–45 minute timetable slots.
- **Zero-cost, low-tech experiential activities** using items already present in the classroom or students' daily lives (e.g., steel spoons, chai cups, chalk, courtyard sunlight, clay pots).
- **Competency-based 4-level rubrics** (Beginning, Developing, Secure, Extending) that replace subjective marking with observable descriptors.
- **Differentiated task bands** (Support, Core, Extension) to support diverse learner readiness.
- **100% teacher control**: Every section is directly editable, and teachers can regenerate individual sections without regenerating the entire plan.

---

## 2. Core Architecture & Local Setup

### Technology Stack
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4 with mobile-first touch optimization
- **Icons:** Lucide React
- **Architecture:** Zero-dependency client-side deterministic generation for high speed, zero latency, and zero token cost in this MVP proof-of-concept.

### Local Development Setup
```bash
# 1. Install dependencies
npm install

# 2. Run local development server (port 3000)
npm run dev

# 3. Type-check and lint codebase
npm run lint

# 4. Create production build
npm run build
```

---

## 3. Scope & Included Features (MVP PoC)

This release focuses strictly on a high-speed, working, educator-first prototype:

| View / Page | Scope & Capabilities |
| :--- | :--- |
| **Home** | Value proposition, NCF-SE core principles, 1-tap Quick Example CTA. |
| **Create Resource** | Progressive disclosure form with school stages (Foundational, Preparatory, Middle, Secondary), Grades 1–12, 5 durations (30, 40, 45, 60, 90 mins), 5 resource types, and optional classroom context accordion. |
| **Quick Example** | 1-tap pre-fill and generation of Grade 7 Science (Heat Transfer: Conduction, Convection & Radiation). |
| **Generated Resource** | Structured lesson pack rendering with per-section variant regeneration, full inline text editing, and print-ready A4 formatting. |
| **Resource Types** | Supports 5 distinct outputs: Lesson Plan, Practice Worksheet, Formative Assessment Pack, 4-Level Rubric, and Multi-Week Project Brief. |
| **Export & Print** | Print / Save PDF via native browser `@media print` engine, 1-tap copy to clipboard, and instant `.txt` file download. |
| **Toolkit Library** | 7 standard pedagogical guides, planners, and rubrics with interactive sample modals. |
| **About & Safety** | Transparent policy statement on teacher primacy, review mandates, and lack of official government endorsement. |
| **Feedback** | Client-side feedback form for educator pilot observations. |
| **Bilingual UI** | Instant English / Hindi UI label switcher for all controls and navigation. |

---

## 4. Privacy & Data Ethics Principles

- **Zero Student Data:** The application does not collect, request, store, or transmit student names, roll numbers, marks, photos, attendance, or demographics.
- **No Login or Cookies:** Accessible instantly without sign-up friction or account barriers.
- **Client-Side Generation:** Generation runs deterministically in the user's browser in this MVP, ensuring privacy and offline resilience.
- **Primacy of Teacher Judgement:** All curriculum suggestions are explicitly watermarked `Suggested — teacher review required`. The system does not claim CBSE, NCERT, or state board endorsement.

---

## 5. Gemini Structured-Output Generation Architecture

The studio incorporates a secure, server-side generation layer using the `@google/genai` TypeScript SDK:

### A. Environment Configuration
- `GEMINI_API_KEY`: Server-side API key injected securely from runtime environment/secrets. Never sent to the client browser.
- `GEMINI_MODEL`: Defaults to `gemini-3.8-flash` for high-speed, cost-efficient, schema-constrained generation.
- `PORT`: Port for the Express server (defaults to `3000`).

### B. Strict JSON Schemas
The server enforces strict response schemas (`responseMimeType: "application/json"`, `responseSchema`) using the `Type` enum from `@google/genai`:
- **Lesson Plan Schema:** Enforces title, curricular goals, competencies, 3 learning outcomes, 3 prior-learning prompts, 5E sequence steps (`Engage`, `Explore`, `Explain`, `Apply`, `Reflect`), experiential activity, differentiated task bands, questioning prompts, formative assessment, 4-level rubric, offline alternative, teacher reflection, and safety notes.
- **Worksheet Schema:** Up to 5 structured tasks with model answer guides and differentiation notes.
- **Formative Assessment Schema:** Up to 5 diagnostic items, evaluation rubrics, observation checklist, and exit-ticket prompt.
- **Rubric Schema:** 4-level developmental matrix (*Beginning*, *Developing*, *Secure*, *Extending*) with up to 3 criteria.
- **Project Brief Schema:** Driving question, final product, 3–5 milestones, cross-subject links, evidence, and rubric.

### C. Compact Output Validator & Repair Engine (`server/validator.ts`)
Before presenting content to educators, the server validator verifies and repairs:
1. **Content Limits:** Caps learning outcomes, prior-learning prompts, differentiated tasks, and teacher questions to a strict maximum of 3 items each. Enforces word count under 900 words.
2. **Unverified Claims & Endorsements:** Automatically purges false claims of official CBSE, NCERT, or Ministry of Education endorsements or codes. Guarantees the label *"Suggested — teacher review required"*.
3. **Classroom Safety:** Detects and repairs hazardous instructions (e.g. replaces boiling water with warm water $\le 45^\circ\text{C}$, removes toxic chemicals or unsupervised flame directives).
4. **Student Privacy Protection:** Strips any prompt or item asking to collect student personal records, marks, phone numbers, or photos.

### D. Multi-Tier Fallback Engine
If the Gemini API key is unconfigured, rate-limited, unreachable, or returns a malformed response:
- The system automatically triggers the reliable local deterministic mock generator.
- The UI displays a clear notice badge indicating that the verified local fallback was loaded, accompanied by a 1-tap **Retry with Gemini** action.
- The Quick Example (Grade 7 Heat Transfer) flow operates seamlessly both online and offline.

### E. Privacy-Safe Server Telemetry (`server/logger.ts`)
Server request logs capture performance metrics (`timestamp`, `stage`, `grade`, `subject`, `duration`, `resourceType`, `status`, `latencyMs`, `modelUsed`), but **strictly exclude** teacher-entered topic text, custom notes, generated outputs, and student identifiers.

---

## 6. Testing & Quality Assurance Steps

To verify generation pipelines and error resilience:
```bash
# 1. Start full-stack development server
npm run dev

# 2. Check health endpoint (returns API key status and model)
curl http://localhost:3000/api/health

# 3. Test Lesson Plan Generation endpoint
curl -X POST http://localhost:3000/api/generate-resource \
  -H "Content-Type: application/json" \
  -d '{"stage":"Middle","grade":"7","subject":"Science","topic":"Heat Transfer","duration":"40","desiredResource":"Lesson Plan"}'

# 4. Test Section-Level Regeneration endpoint
curl -X POST http://localhost:3000/api/regenerate-section \
  -H "Content-Type: application/json" \
  -d '{"sectionKey":"experientialActivity","request":{"stage":"Middle","grade":"7","subject":"Science","topic":"Heat Transfer","duration":"40","desiredResource":"Lesson Plan"}}'

# 5. Verify local fallback & malformed payload repair
curl -X POST http://localhost:3000/api/generate-resource \
  -H "Content-Type: application/json" \
  -d '{"stage":"InvalidStage","grade":"7"}'
```

---

## 7. Deployment Notes

- **Static & Full-Stack Modes:** The application runs as an Express + Vite server (`tsx server.ts`) in development, and serves optimized static assets from `dist/` with Express API routes in production.
- **Print Layout:** Standard A4 page geometry with hidden navigation and print-friendly serif/sans legibility is configured in `src/index.css`.
