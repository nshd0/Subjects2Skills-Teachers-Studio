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

## 5. Future Integration Roadmap (Phase 2 & Phase 3)

The codebase includes architectural interfaces (`src/services/futureIntegrations.ts`) pre-configured for:

1. **Gemini Structured JSON Output:** Integration with `@google/genai` using structured response schemas (`responseSchema`) to generate contextualized regional lesson plans across all 22 scheduled Indian languages.
2. **Firebase Authentication & Firestore:** Optional teacher login for teachers wishing to save, tag, and organize their semester curriculum plans across devices.
3. **Google Workspace & Classroom Export:** One-click export to Google Docs and Google Classroom assignments.
4. **State Curriculum Knowledge Base:** Automated alignment checks against state-specific SCERT and NCERT textbook chapter codes.
5. **Skill Mapping Engine:** Pre-assessment and post-assessment skill tracking linked to NCF-SE competency codes.

---

## 6. Deployment Notes

- **Static Compatibility:** The application builds to standard static HTML, CSS, and JS bundles via `npm run build` and can be hosted on Google Cloud Run, Firebase Hosting, Cloudflare Pages, or GitHub Pages.
- **Print Layout:** Standard A4 page geometry with hidden navigation and print-friendly serif/sans legibility is configured in `src/index.css`.
