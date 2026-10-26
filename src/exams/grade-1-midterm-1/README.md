# Grade 1 Midterm 1 (IT & LT) — Spec

Route: `/grade-1-midterm-1`  Source material: `test-raw-material/grade-1-midterm-1/`
Two tests, practiced separately:
- **LT** (Local Teacher): **Wednesday, November 4** — `?track=lt`
- **IT** (International Teacher): **Thursday, November 5** — `?track=it`

The scope comes from the two study guides in `test-guide/` (`it-guide.jpg`, `lt-guide.jpg`).

## Ground rules for this exam
- **Workbook questions only.** Every question in the photos is re-created as a blank, interactive item, in a part marked with its source (📘 `myView p.13`, `Phonics p.2`, `IT LAW p.4`, `LT LAW p.6`, `myGrammar p.2` …). **No extra-practice parts** this time (the volume is already large).
- Activities that can't be done on screen are converted into the closest checkable form, using only the page's own words and pictures:
  - "Say the picture name / listen to the middle sound" (oral) → pick the sound or letter (🔊 reads the picture name).
  - "Blend and read these words" (oral) → 🔊 listen and pick the word you heard, from the same row of words.
  - "Underline / circle / highlight the words…" → tap the words (`select` item).
  - "Alphabetize", "put the words in order", "retell in order" → tap in order (`order` item).
  - "Label the picture" → the picture is described in words; pick the label from the page's word bank.
  - Drawing-only tasks and opinion questions → handwriting pad, marked "Done" (no answer). Factual short answers → handwriting with a model answer to self-check.
- Answers are worked out from the content, not copied from the child's handwriting (which has mistakes, e.g. Phonics p.18 "dug" for *bug*, IT LAW p.4 #8 "lights" for *everything*).
- Obvious book typos are fixed (e.g. "The key shows the what the colors mean", "A line of people are around the corner", "a nice community that help each other").

## Two tracks, one page
`/grade-1-midterm-1` first shows a picker (LT / IT, with test dates). Each track is its own `QuizExam` with its own progress (`grade-1-midterm-1-it`, `grade-1-midterm-1-lt` in localStorage).

Inside a track (`mixOnly`):
- **🔀 Mixed test** at the top — everything that doesn't need a story: IT **Foundational Skills** (phonics + My Words to Know) and **Vocabulary**; LT **Vocabulary** and **Grammar**. These are not offered as separate section tests (the parent found that unnecessary); the sections only appear as checkboxes in the mixed test.
- **📖 Reading** — section cards, one per story. Each has `readFirst` (myView pages): the card and the first part say "Read the story first", with a 🎧 link to the story's read-along video from [MyViewReview](https://myviewreview.com/grade1/u1-my-neighborhood) (the KCIS teachers' review site). The child reads the story in myView, then answers.

## 🔀 Mixed test
"Mixed test" panel: checkboxes per category and per section (number of questions next to each), **all ticked by default**, then a size picker (10 / 20 / 30 / 50 / All N of the ticked ones).
- Uses the ticked sections **without** `readFirst` (no story needed). What was unticked is remembered per track (`kcis:<exam>:mix-excluded` in localStorage); the chosen ids go in the URL (`&pick=short-a,short-i,…`, omitted when everything is ticked).
- Questions are spread as evenly as possible: round-robin over the categories (section `group`), inside a category over its sections, inside a section over its parts; then shuffled. E.g. LT 20 → 10 vocabulary + 10 grammar. The seed is in the URL (`?mode=mixed&size=20&seed=…&pick=…`), so a reload keeps the same set.
- Auto-checkable items and handwriting items with a model answer. Open writing/drawing tasks (no answer key, e.g. "make a sentence with a vocabulary word and draw a picture") are included only when **✍️ Writing & drawing** is ticked — unticked by default, remembered per track (`kcis:<exam>:mix-open`), `&open=true` in the URL. They are marked with "Done".
- One question at a time, its directions and section shown above it; numbered dots (green/red) to jump around; score at the end; "New mix".
- After a correct answer it moves on by itself after 3 s (countdown in the Next button). Coming back to an answered question does not auto-advance.
- Results are stored under `mix/…` ids, separate from the workbook progress, and cleared when a new mix starts.

## 🎉 Celebrations
Ported from `kcis-grade1-vocaburary` (`src/components/celebrate/`): a full-screen emoji scene (15 celebrations, 3 gentle "oops" scenes, shuffle-bag so they don't repeat) with a Web Audio sound (synthesized, no files). Triggered from `useProgress().setResult`: correct/done → celebration, wrong → oops. Choice items show a random praise ("Awesome!", "Way to go!" …). Taps pass through the overlay; hidden under `prefers-reduced-motion`.

## IT — sections
Wordlist note: the study guide's "U1W1 / U1W2 / U1W5 Wordlist" is the vocabulary of the IT LAW pages (The Blackout, Henry on Wheels, Making a Map). The wordlist sheet in `IT/vocabulary/IMG_2820` is the **Term 1 LT wordlist** (U1W4 / U1W3); it is used for LT.

| Group | Section (id) | Sources |
|---|---|---|
| Foundational | Short a · Mm Ss Tt (`short-a`) | myView p.12, 13, 20, 21, 39, 43, 44, 45–47 (*At a Mat*); Phonics p.2, 3, 5 |
| Foundational | Short i · Cc Pp Nn (`short-i`) | myView p.52, 53, 60, 61, 85, 87, 91, 92; Phonics p.10, 11, 13 |
| Foundational | Short o · Ff Bb Gg (`short-o`) | myView p.101, 108, 109, 123, 125, 129, 130; Phonics p.6, 7, 9 |
| Foundational | Short e · Dd Ll Hh (`short-e`) | myView p.145, 146, 147, 167, 169, 173, 174; Phonics p.14, 15, 17 |
| Foundational | Short u · Rr Ww Jj Kk (`short-u`) | myView p.183, 190, 191, 204 (spelling), 205, 209, 210; Phonics p.18, 19, 21 |
| Foundational | Qu · Vv Yy Zz (`qu`) | myView p.222–229 (letters/words, not the *Words to Know* page); Phonics p.22, 23 |
| Foundational | My Words to Know (`words`) | myView p.40, 88, 126, 170, 206, 227 + the *Words to Know* halves of the spelling pages (p.85, 123, 167, 204, 225); Phonics p.4, 8, 12, 16, 20, 24 |
| Vocabulary | The Blackout words (`vocab-blackout`) | IT LAW p.4–5, 8–9; myView p.50 (nouns: radio, boy, pet) |
| Vocabulary | Henry on Wheels words (`vocab-henry`) | IT LAW p.12–13, 16–17; myView p.82 |
| Vocabulary | Making a Map words (`vocab-map`) | IT LAW p.20–21, 24–25 |
| 📖 Reading | The Blackout (`blackout`, read myView p.16–35) | IT LAW p.6, 7, 10, 11; myView p.41, 42, 48 |
| 📖 Reading | Henry on Wheels (`henry`, read myView p.56–83) | IT LAW p.14, 15, 18, 19; myView p.89, 96 |
| 📖 Reading | Making a Map (`map`, read myView p.186–203) | IT LAW p.22, 23 (map), 26, 27 (Lila predictions, one part per story break); myView p.207, 214 |

## LT — sections
| Group | Section (id) | Sources |
|---|---|---|
| Vocabulary | Garden Party words (`vocab-garden`) | LT LAW p.4–5 |
| Vocabulary | Click, Clack, Click! words (`vocab-click`) | LT LAW p.7–8 |
| Vocabulary | Look Both Ways! words 1 (`vocab-look-1`) | LT LAW p.12–13 |
| Vocabulary | Look Both Ways! words 2 (`vocab-look-2`) | LT LAW p.15–16 |
| Vocabulary | Skill words & Words to Know (`skill-words`) | Term 1 wordlist: Skills Vocabulary (compare, alike, contrast, different, act, visualize; informational text, title, text features, label, heading, support) with the definitions printed on myView p.104, 127, 134, 142, 171, 178; My Words to Know (up, two, that, have, they; by, are, was, you, look) via the matching myView/Phonics sentences |
| Grammar | Find the word (`grammar-find`) | myGrammar p.2–9, 14–17 — nouns, verbs and adjectives **mixed in every part** |
| Grammar | Use the right word (`grammar-use`) | myGrammar p.2–9, 14–17 — fill-ins (nouns, verbs incl. *kick / kicks*, a / an, adjectives) **mixed** |
| Grammar | Simple Sentences (`sentences`) | myGrammar p.9 (Part D), 10–13 |
| 📖 Reading | Garden Party (`garden`, read myView p.142–143, 149–165) | LT LAW p.6, 10; myView p.142–143, 178 |
| 📖 Reading | Click, Clack, Click! (`click`, read myView p.149–165) | LT LAW p.9, 11 (compares Jamal and Amena); myView p.171 |
| 📖 Reading | Look Both Ways! (`look`, read myView p.104–105, 111–121) | LT LAW p.14, 17, 18, 19; myView p.104–105, 127, 134 |

### Grammar: mixed, not one kind per page
On paper each page is about one kind of word, so the answer is easy to guess. Here the parts mix them:
- "What kind of word is *jump*?" — noun / verb / adjective (every word from the circle/sort/match activities).
- "Tap the **verb**." / "Tap the **nouns**." / "Tap the **adjectives**." — workbook sentences, the kind changes from item to item.
- Nouns: person / place / animal / thing (the sort and color-code activities).
- Fill-ins mix nouns, verbs (*kick / kicks*), articles (*a / an*) and adjectives.

### Simple sentences: capital letter, period, verb + s
Every simple-sentence activity also checks the three rules:
- **Is it a sentence?** (✓ / ✗ items).
- **Put the words in order** (tap in order), then **Which one is written correctly?** — the same sentence with/without a capital, with/without a period, *stop* vs *stops*.
- **What is wrong?** — needs a capital letter / needs a period / needs both / the verb needs -s.
- **Fix it / build it** — handwriting with the model answer (e.g. "He / clean / a room." → "He cleans a room.").

## Item types (`components/quiz/types.ts`)
- `choice` — multiple choice; `___` blanks fill in when correct.
- `match` — tap a word, then its match (≤ 4 pairs per item on iPad).
- `write` — handwriting pad; `answer` → self-check, no answer → "Done". `draw` adds a drawing box; `lines: 0` with `draw` = drawing only.
- `select` — tap all the right words in a sentence (underline / circle / highlight tasks); `optional` words may be tapped or not (e.g. *brick* in "red brick houses").
- `order` — tap pieces in order (`vertical` for events/steps).
- `predict` — read, predict, read on (used for the Lila story).
Helpers for this exam: `helpers.ts` (`choice`, `pic`, `yesNo`, `listen`, `write`, `select`, `order`, `matches`, `lawVocabParts`).

## Pictures
Emoji only, and only when they clearly name the word. When the emoji could be read two ways, `pic()` shows the word after answering, and 🔊 says the picture name (never the answer to a "which word names this picture" item).

## 🔊 Only when the question needs it
To train reading, questions, sentences and stories are **not** read aloud. 🔊 appears only where sound is the task: listen-and-pick, dictation, picture names in phonics (middle sound, beginning sound, "does it have short a?"), and myView p.224 ("point to the words as you listen").

## Difficulty
KCIS Grade 1, exactly the workbook's level. 2–4 options per question, as on the page.

## Code layout
```
src/exams/grade-1-midterm-1/
  meta.ts, ExamPage.tsx     track picker → QuizExam per track
  helpers.ts                item builders
  it/index.ts               IT section order
  it/*.ts                   IT question banks (one file per section or group)
  lt/index.ts, lt/*.ts      LT question banks
```

## Status
- [x] Spec
- [x] IT question banks — 13 sections, 583 items (495 in the mixed-review pool)
- [x] LT question banks — 11 sections, 344 items (271 in the mixed-review pool)
