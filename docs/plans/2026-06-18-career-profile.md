# Career Profile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Next.js (App Router) single-page application acting as a digital resume with an interactive "Automation Lab" executing live backend test scripts.

**Architecture:** Next.js frontend with Vanilla CSS modules, communicating with Next.js API Routes. The API routes will execute Axios requests and Playwright-core headless browser operations, optimized for Vercel's serverless environment.

**Tech Stack:** Next.js 14, React, TypeScript, Vanilla CSS Modules, Playwright-core, @sparticuz/chromium, Axios, Jest/React Testing Library.

## Global Constraints

- Must use Next.js App Router and TypeScript.
- Must use Vanilla CSS modules (`*.module.css`)—no Tailwind or external component libraries.
- All backend execution must complete under 10 seconds.
- Must include basic Jest unit tests for components before implementation.

---

### Task 1: Scaffolding and Setup

**Files:**
- Create: `package.json`
- Create: `jest.config.mjs`
- Create: `tsconfig.json`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`

**Interfaces:**
- Consumes: None
- Produces: Base React App running on `npm run dev`.

- [ ] **Step 1: Write initial tests**
```bash
npm init -y
npm install react react-dom next typescript @types/node @types/react @types/react-dom
npm install -D jest @testing-library/react @testing-library/jest-dom ts-jest @types/jest jest-environment-jsdom
```
Create `jest.config.mjs`:
```javascript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
```
Create `jest.setup.ts`:
```typescript
import '@testing-library/jest-dom';
```
Create `__tests__/page.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import Page from '../app/page';
import React from 'react';

describe('Home Page', () => {
  it('renders a main element', () => {
    render(<Page />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx jest`
Expected: FAIL with missing file or unrenderable.

- [ ] **Step 3: Write minimal implementation**
Create `app/layout.tsx`:
```tsx
import './globals.css';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```
Create `app/globals.css`:
```css
body { font-family: sans-serif; background: #fafafa; color: #333; margin: 0; padding: 0; }
```
Create `app/page.tsx`:
```tsx
import React from 'react';
export default function Home() {
  return <main><h1>Jose David Mejias Araya</h1></main>;
}
```

- [ ] **Step 4: Run test to verify it passes**
Run: `npx jest`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add .
git commit -m "chore: manual next.js scaffolding and jest setup"
```

### Task 2: Hero and Experience Components

**Files:**
- Create: `components/Hero.tsx`
- Create: `components/Hero.module.css`
- Create: `components/Experience.tsx`
- Create: `components/Experience.module.css`
- Modify: `app/page.tsx`
- Create: `__tests__/components.test.tsx`

**Interfaces:**
- Consumes: None
- Produces: Extracted UI components for the main page.

- [ ] **Step 1: Write the failing test**
Create `__tests__/components.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import React from 'react';

describe('Components', () => {
  it('Hero renders title and summary', () => {
    render(<Hero />);
    expect(screen.getByText(/Senior Quality Assurance Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/14 years of experience/i)).toBeInTheDocument();
  });
  
  it('Experience renders timeline elements', () => {
    render(<Experience />);
    expect(screen.getByText(/Lionbridge/i)).toBeInTheDocument();
    expect(screen.getByText(/dotCMS/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx jest`
Expected: FAIL with module not found for Hero and Experience.

- [ ] **Step 3: Write minimal implementation**
Create `components/Hero.tsx`:
```tsx
import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1>Jose David Mejias Araya</h1>
      <h2>Senior Quality Assurance Engineer</h2>
      <p>Senior QA with 14 years of experience and a strong bias toward automation engineering. Built end-to-end Playwright + TypeScript test frameworks from scratch.</p>
    </section>
  );
}
```
Create `components/Experience.tsx`:
```tsx
import React from 'react';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section className={styles.experience}>
      <h3>Professional Experience</h3>
      <ul>
        <li><strong>Lionbridge</strong> - Senior Creative QA Engineer</li>
        <li><strong>dotCMS</strong> - Senior QA Specialist</li>
      </ul>
      <h3>Technical Skills</h3>
      <div className={styles.skills}>Playwright, WebdriverIO, Postman, TypeScript, React</div>
    </section>
  );
}
```
Create empty CSS files: `components/Hero.module.css` and `components/Experience.module.css`.
Update `app/page.tsx` to include both components.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx jest`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add .
git commit -m "feat: add hero and experience components"
```

### Task 3: Projects Showcase Component

**Files:**
- Create: `components/Projects.tsx`
- Create: `components/Projects.module.css`
- Modify: `app/page.tsx`
- Modify: `__tests__/components.test.tsx`

**Interfaces:**
- Consumes: None
- Produces: Project cards component.

- [ ] **Step 1: Write the failing test**
Append to `__tests__/components.test.tsx`:
```tsx
import Projects from '../components/Projects';

it('Projects renders project cards', () => {
  render(<Projects />);
  expect(screen.getByText(/JDMQADEMO/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx jest`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**
Create `components/Projects.tsx`:
```tsx
import React from 'react';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section className={styles.projects}>
      <h3>Portfolio Projects</h3>
      <div className={styles.card}>
        <h4>JDMQADEMO</h4>
        <p>Full-Stack QA Demo Application demonstrating end-to-end ownership.</p>
        <a href="https://github.com/josemejias11/jdmqademo">GitHub Repo</a>
      </div>
    </section>
  );
}
```
Create empty CSS file `components/Projects.module.css`.
Update `app/page.tsx` to include `<Projects />`.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx jest`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add .
git commit -m "feat: add projects showcase component"
```

### Task 4: Automation Lab API Routes

**Files:**
- Create: `app/api/run-test/route.ts`
- Create: `__tests__/api.test.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: Standard HTTP POST requests specifying test type.
- Produces: JSON response with `durationMs`, `success`, `message`, and `details`.

- [ ] **Step 1: Write the failing test**
Install node-mocks-http (or just mock Response):
Create `__tests__/api.test.ts`:
```ts
import { POST } from '../app/api/run-test/route';

describe('POST /api/run-test', () => {
  it('returns successful axios test result', async () => {
    const req = new Request('http://localhost/api/run-test', {
      method: 'POST',
      body: JSON.stringify({ type: 'api' })
    });
    const res = await POST(req);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.message).toContain('API check complete');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx jest`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**
Install axios: `npm install axios`
Create `app/api/run-test/route.ts`:
```ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const body = await req.json();
  const start = Date.now();
  
  if (body.type === 'api') {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      const durationMs = Date.now() - start;
      return NextResponse.json({
        success: true,
        durationMs,
        message: 'API check complete',
        details: response.data
      });
    } catch (e) {
      return NextResponse.json({ success: false, message: 'API failed' }, { status: 500 });
    }
  }
  
  return NextResponse.json({ success: false, message: 'Unknown type' }, { status: 400 });
}
```

- [ ] **Step 4: Run test to verify it passes**
Run: `npx jest`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add .
git commit -m "feat: setup automation API route with axios test"
```

### Task 5: Automation Lab UI

**Files:**
- Create: `components/AutomationLab.tsx`
- Create: `components/AutomationLab.module.css`
- Modify: `app/page.tsx`
- Modify: `__tests__/components.test.tsx`

**Interfaces:**
- Consumes: `/api/run-test` endpoint.
- Produces: Interactive dashboard UI showing loading state and test results.

- [ ] **Step 1: Write the failing test**
Append to `__tests__/components.test.tsx`:
```tsx
import AutomationLab from '../components/AutomationLab';
import { fireEvent, waitFor } from '@testing-library/react';

it('AutomationLab runs api test on click', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ success: true, message: 'API check complete', durationMs: 120 }),
    })
  ) as jest.Mock;
  
  render(<AutomationLab />);
  fireEvent.click(screen.getByText('Run API Test'));
  
  await waitFor(() => {
    expect(screen.getByText(/API check complete/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx jest`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**
Create `components/AutomationLab.tsx`:
```tsx
'use client';
import React, { useState } from 'react';
import styles from './AutomationLab.module.css';

export default function AutomationLab() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runTest = async (type: string) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/run-test', {
        method: 'POST',
        body: JSON.stringify({ type })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ success: false, message: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.lab}>
      <h3>Automation Lab</h3>
      <button onClick={() => runTest('api')} disabled={loading}>Run API Test</button>
      {loading && <p>Running tests...</p>}
      {result && (
        <div className={styles.terminal}>
          <p>{result.message} {result.durationMs ? `(${result.durationMs}ms)` : ''}</p>
        </div>
      )}
    </section>
  );
}
```
Create empty CSS file `components/AutomationLab.module.css`.
Update `app/page.tsx` to include `<AutomationLab />`.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx jest`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add .
git commit -m "feat: add automation lab interactive ui"
```
