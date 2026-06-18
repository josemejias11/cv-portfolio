# Design Specification: Career Profile & Automation Showcase

## Overview
A modern, single-page application (SPA) acting as a digital resume and interactive career portfolio for Jose David Mejias Araya, a Senior Quality Assurance Engineer. The defining feature is an interactive "Automation Lab" that allows recruiters to execute live automated test scripts via serverless backends and view the results.

## Architecture & Tech Stack
- **Frontend:** Next.js (App Router), React, TypeScript.
- **Styling:** Vanilla CSS (CSS Modules) tailored for a premium, clean aesthetic with micro-animations. No heavy CSS frameworks.
- **Backend:** Next.js API Routes (Serverless Functions running Node.js).
- **Hosting:** Vercel.
- **Automation Tools:** `playwright-core` with `@sparticuz/chromium` for headless browser UI tests; `axios` for backend API tests.

## UI/UX Flow & Sections
1. **Hero Section:** 
   - Clean typography with Name and Title.
   - Summary highlighting 14 years of QA experience and TypeScript/Playwright focus.
   - Quick links: GitHub, LinkedIn, Email.
2. **Experience & Skills Timeline:** 
   - Visual timeline of past roles (Lionbridge, dotCMS, Gorilla Logic, etc.).
   - Pill-based layout for technical skills (Playwright, Docker, React, TypeScript, etc.).
3. **Projects Showcase:** 
   - Interactive, hover-animated cards for projects (JDMQADEMO, QA Automation Stack, Task Manager QA App) with source code links.
4. **The Automation Lab:**
   - Dashboard-style component mimicking a command center.
   - **Playwright Test:** Button triggers a headless UI test via the backend API. Displays simulated terminal output (`> Launching browser...`) and yields execution time/success result.
   - **API Test:** Button triggers an Axios call to a mock endpoint, rendering the formatted JSON response and status code.

## Data Flow
1. User clicks "Run Test" on the frontend.
2. Next.js API route (`/api/run-test`) is invoked.
3. Serverless function executes the Playwright script or Axios request.
4. Results (duration, status, payload) are returned and elegantly rendered in the frontend UI.

## Error Handling & Constraints
- **Vercel Limits:** Scripts are optimized to complete well under the 10-second serverless execution limit to prevent timeouts.
- **Error States:** Failed tests or timeouts gracefully render a user-friendly error message in the "Terminal" UI component, ensuring the portfolio always looks professional even if a test fails.
