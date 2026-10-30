# AGENT.md — Project-wide rules

> Instructions for all AI agents (Claude Code, etc.). `CLAUDE.md` only points here.

## ⚠️ Before finishing every task
**Check whether this file needs updating** (new conventions, directory structure, commands, pitfalls). If so, update it in the same commit.

## Purpose
Generate exam-prep questions from everyday study material (`test-raw-material/`). The material usually contains questions with answers already filled in, which makes it hard to review from. So the site re-creates the workbook's own questions as blank, interactive items (no pre-filled answers), **and** adds new questions of the same types and difficulty for variety.

## Tech stack
Vite + React 19 + TypeScript + Tailwind CSS v4 + TanStack Router (file-based routing).

## Commands
- Preview in the Claude app: `.claude/launch.json` defines `dev` (port 5173).
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
  components/quiz/      Reusable exam UI — use it for every exam
    types.ts            Item types (choice / match / write / predict / select / order / multi) + defineSection()
    QuizExam.tsx        Section grid (grouped) + part-by-part section view
    MixedQuiz.tsx       Mixed review: N questions spread evenly over groups/sections/parts; score + Blankie Bear
    MixPicker.tsx       Mixed review setup: tick sections (default all), optional handwriting, done memory, pick a size
    questions.tsx       Question renderers
    HandwritingPad.tsx  Canvas for Apple Pencil / finger writing (palm rejection)
    progress.ts         Per-exam results in localStorage (every result also triggers a celebration) + mixed-test done memory
  components/celebrate/ Correct/wrong scenes + Web Audio sounds (ported from kcis-grade1-vocaburary, + 20 new)
  components/bear/      被被熊 Blankie Bear (ported): flies in when a test is finished, cheers by score, draggable
  exams/
    types.ts            ExamMeta type
    index.ts            Collects all meta via import.meta.glob
    <slug>/
      meta.ts           slug / title / description
      ExamPage.tsx      The exam page
      README.md         Spec + rules specific to this exam
      data/             Question banks, one file per section (plain data via defineSection)
test-raw-material/<slug>/   Source material for that exam (read-only input)
```
`src/routeTree.gen.ts` is auto-generated. Commit it, never edit it by hand.

## Adding a new exam
1. Create `meta.ts`, `ExamPage.tsx`, `README.md` in `src/exams/<slug>/`
2. Create `src/routes/<slug>.tsx` with `createFileRoute('/<slug>')` pointing to `ExamPage` (autoCodeSplitting loads it dynamically; never statically import exam pages from the root or index route)
3. Put source material in `test-raw-material/<slug>/`
4. The `/` list picks it up automatically from `meta.ts`; no extra registration
5. Read the exam's README.md before starting work

## Building an exam's content
1. Read every image in `test-raw-material/<slug>/` (HEIC: convert with `sips -s format jpeg -Z 1600` into the scratchpad first).
2. Write the spec in `src/exams/<slug>/README.md` (scope, sections, question types) and commit it **before** implementing.
3. Implement the question banks in `src/exams/<slug>/data/` using the shared `components/quiz` types; the exam page just passes sections to `<QuizExam>`.
4. Navigation uses search params (`?mode=extra&section=<id>&part=<n>`, `?mode=mixed&size=<n>&seed=<n>`) defined by `validateSearch` in the route file. `QuizExam` has three modes: workbook (parts with `source`, the default landing), extra practice (`mode=extra`, parts without `source`; the button only shows when such parts exist) and mixed review (`mode=mixed`, with checkboxes to choose sections; `&pick=` ids). With `mixOnly`, sections without `readFirst` get no cards and are practiced only through the mixed test.
5. Sections: set `group` (the study guide's category; cards are grouped by it and the mixed review balances over it) and, for story-bound sections, `readFirst` (+ optional `links`, e.g. a read-along video). `readFirst` sections are left out of the mixed review.

## Rules
- **Dynamic loading**: every exam page must be its own chunk; `/` may only load `meta.ts` files.
- **Per-exam rules** go in `src/exams/<slug>/README.md`; only project-wide rules go in this file.
- **Source material** (`test-raw-material/`) is read-only: don't modify it.
- **Include the workbook's questions**: every question in the source workbooks goes into the exam, in a part marked with its `source` (e.g. `IT LAW p.20`) and listed before the extra practice parts. Fix obvious typos. Then add new questions for variety.
- **No spoilers on one page**: when a later question's text reveals an earlier answer (e.g. the next part of a prediction story), put it in a separate part.
- **No give-aways**: a question must not tell its answer. Directions don't name the answer ("Write e to finish…"), options don't differ only in capital letters, no "say the picture name" without a picture, no printing the word whose sound is asked. In the mixed test the section title and the directions are shown above each question, so sections that test a sound mix all the sounds (group by skill, not by unit).
- **Handwriting is one group**: every `write` item (spelling, sentences, drawings) is only in the mixed test when "✍️ Writing & drawing" is ticked; everything else is answered by tapping.
- **Vocabulary vs. story**: questions that need the story (its characters, places, pictures) go in the story's `readFirst` section, not in a vocabulary section.
- **Answers come from the content, not the photos**: the child's handwritten answers in the photos may be wrong. Work out the correct answer yourself.
- **Language**: UI, questions, and docs are all in English.
- **🔊 Read-aloud only when needed**: the kids are practicing reading, so don't read questions, sentences or stories aloud. Set `speak` only when sound is the task (listen-and-pick, dictation, picture names in phonics).
- **Styling**: Tailwind utility classes only. Font is Andika (designed for beginning readers).
- **Target device**: iPad (portrait and landscape). Touch targets ≥ 48 px, text ≥ 20 px.
- **Grade level**: questions must match the source workbook's difficulty (KCIS Grade 1 so far) and stay inside the test guide's scope.
- **Item ids** come from position (`section/part/index`). When inserting or reordering parts, bump the version in `storageKey` (`components/quiz/progress.ts`) so old results don't land on the wrong items.
- **iPad audio**: Web Audio is muted by iPadOS Silent mode and suspended/interrupted until a tap; `celebrate/audio.ts` handles it (audioSession `playback`, resume + unlock on every tap). Always get the context through `audio()`.
- **Formatting**: there is no Prettier config; don't run Prettier (its defaults add semicolons and reformat whole files). Match the surrounding style by hand.
- **React effects**: always use a block body (`useEffect(() => { f() }, …)`). Concise arrows that return a value crash with "destroy is not a function".

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
