# Repo Notes

- Next.js 16 app router project. The main page is assembled in `app/page.tsx`; shared layout and font loading live in `app/layout.tsx`.
- UI pieces live in `components/*.tsx`; keep page composition thin and put behavior in the component that owns it.
- Run `npm run lint` for ESLint and `npm run build` for the production check. There is no `npm test` script.
- Playwright is configured in `playwright.config.ts` to run only `app/tests/moodys-com`, with Chromium only, `video: 'on'`, `screenshot: 'only-on-failure'`, `trace: 'on-first-retry'`, and `fullyParallel: false`.
- For focused browser tests, run `npx playwright test app/tests/moodys-com/e2e/interactive-showcase.spec.ts` or a single spec file under `app/tests/moodys-com/`.
- The manual GitHub Actions workflow is `.github/workflows/automation-lab.yml`; it runs `app/tests/moodys-com/e2e/interactive-showcase.spec.ts` on Ubuntu with Node 20 and `workflow_dispatch` only.
- `/api/tests/trigger` and `/api/tests/status` require `GITHUB_PAT`; both are hardcoded to `josemejias11/cv-portfolio`, so update those routes if the repo owner or name changes.
- `/api/run-test` only handles `POST` with JSON `{ type: 'api' }` and calls `https://jsonplaceholder.typicode.com/todos/1`.
