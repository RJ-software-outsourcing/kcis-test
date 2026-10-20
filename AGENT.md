# AGENT.md — Project-wide rules

> Instructions for all AI agents (Claude Code, etc.). `CLAUDE.md` only points here.

## ⚠️ Before finishing every task
**Check whether this file needs updating** (new conventions, directory structure, commands, pitfalls). If so, update it in the same commit.

## Purpose
Generate exam-prep questions from everyday study material (`test-raw-material/`). The material usually contains questions with answers already filled in, which makes it hard to review from. So create **new** questions based on the material — do not copy existing questions or answers verbatim.

## Tech stack
Vite + React 19 + TypeScript + Tailwind CSS v4 + TanStack Router (file-based routing).

## Commands
- `npm run dev` — local dev (the URL includes the base: `http://localhost:5173/kcis-test/`)
- `npm run build` — `vite build` (also generates `src/routeTree.gen.ts`) → `tsc -b` → copy `index.html` to `404.html`
- Note: type-checking depends on `routeTree.gen.ts`, so the build runs vite first, then tsc.

## Directory structure
```
src/
  main.tsx              Router setup (basepath from BASE_URL)
  routes/               TanStack Router file routes (thin layer)
    __root.tsx
    index.tsx           "/" lists all exams (reads src/exams/*/meta.ts)
    <slug>.tsx          One route per exam, loads src/exams/<slug>/ExamPage
  exams/
    types.ts            ExamMeta type
    index.ts            Collects all meta via import.meta.glob
    <slug>/
      meta.ts           slug / title / description
      ExamPage.tsx      The exam page
      README.md         Rules specific to this exam
test-raw-material/<slug>/   Source material for that exam (read-only input)
```
`src/routeTree.gen.ts` is auto-generated. Commit it, never edit it by hand.

## Adding a new exam
1. Create `meta.ts`, `ExamPage.tsx`, `README.md` in `src/exams/<slug>/`
2. Create `src/routes/<slug>.tsx` with `createFileRoute('/<slug>')` pointing to `ExamPage` (autoCodeSplitting loads it dynamically; never statically import exam pages from the root or index route)
3. Put source material in `test-raw-material/<slug>/`
4. The `/` list picks it up automatically from `meta.ts`; no extra registration
5. Read the exam's README.md before starting work

## Rules
- **Dynamic loading**: every exam page must be its own chunk; `/` may only load `meta.ts` files.
- **Per-exam rules** go in `src/exams/<slug>/README.md`; only project-wide rules go in this file.
- **Source material** (`test-raw-material/`) is read-only: don't modify it, and don't expose its existing answers on the website.
- **Language**: UI, questions, and docs are all in English.
- **Styling**: Tailwind utility classes only.

## Deployment
- GitHub Pages, base path `/kcis-test/` (`base` in `vite.config.ts`).
- `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
- SPA fallback: the build copies `index.html` to `404.html`, so deep links (e.g. `/kcis-test/formative-test-3`) work. Direct loads of sub-routes return HTTP 404 but render fine; that is expected.
- Repo Settings → Pages → Source must be **GitHub Actions** (already set).
- Live site: https://rj-software-outsourcing.github.io/kcis-test/

## Git workflow
When a task is done, push straight to `main` and verify on GitHub Pages (no PRs).

## Local push note
Pushing requires `~/.ssh/id_ed25519` (identity RJ-software-outsourcing); the default gravitysketch key has no write access. The local repo is configured with `core.sshCommand` (`git config core.sshCommand "ssh -i ~/.ssh/id_ed25519 -o IdentitiesOnly=yes"`). If a push is rejected, check that first.
