# Repo Notes

- Next.js 16 app router project. The main page is assembled in `app/page.tsx`; shared layout and font loading live in `app/layout.tsx`.
- UI pieces live in `components/*.tsx`; keep page composition thin and put behavior in the component that owns it.
- Run `npm run lint` for ESLint and `npm run build` for the production check. There is no `npm test` script.
- Playwright is configured in `playwright.config.ts` to run only `app/tests/moodys-com`, with Chromium only, `video: 'on'`, `screenshot: 'only-on-failure'`, `trace: 'on-first-retry'`, and `fullyParallel: false`.
- For focused browser tests, run `npx playwright test app/tests/moodys-com/e2e/interactive-showcase.spec.ts` or a single spec file under `app/tests/moodys-com/`.
- The manual GitHub Actions workflow is `.github/workflows/automation-lab.yml`; it runs `app/tests/moodys-com/e2e/interactive-showcase.spec.ts` on Ubuntu with Node 20 and `workflow_dispatch` only.
- `/api/tests/trigger` and `/api/tests/status` require `GITHUB_PAT`; both are hardcoded to `josemejias11/cv-portfolio`, so update those routes if the repo owner or name changes.
- `/api/run-test` only handles `POST` with JSON `{ type: 'api' }` and calls `https://jsonplaceholder.typicode.com/todos/1`.

## Subagent Routing

Full routing table lives in `~/.config/opencode/AGENTS.md` (“Subagent Routing” section). For this repo:

- **Component / Next.js / Tailwind changes** → `web-engineer`.
- **Hero/visual layout, motion, design-system work** → `product-designer` first for rationale, then `web-engineer` to implement.
- **Playwright specs, test strategy, RTM, bug reports** → `qa-automation-engineer`.
- **Architecture / Type-1 decisions (e.g. swap the shader for a library, change the deploy story)** → `tech-lead` or `sdd-architect`.
- **CI/workflow changes** → `devops-sre-engineer`.
- **Security review of the `/api/*` routes** → `security-engineer`.

Always specify the model explicitly when dispatching and prefer the cheapest model that can do the job.

## SDD Model Selection

Use this repo's SDD triplet (mechanical implementation pipeline) for spec-driven implementation work:

- **Implementation (primary)** → `sdd-implementer` (`opencode-go/kimi-k2.7-code`) — writes code, runs tests, commits.
- **Implementation (fallback)** → `general` (`openai/gpt-5.4-mini`) — default catch-all when no specialist clearly owns the work.
- **Task review** → `sdd-reviewer` (`opencode-go/deepseek-v4-pro`) — reviews diffs for spec compliance and code quality.
- **Architecture / final review** → `sdd-architect` (`openai/gpt-5.5-pro`) — reviews full-branch diffs, makes design and architecture decisions.
