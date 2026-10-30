# Grade 1 Midterm 1 (IT & LT) — Spec

Route: `/grade-1-midterm-1`  Source material: `test-raw-material/grade-1-midterm-1/`
Two tests, practiced separately:
- **LT** (Local Teacher): **Wednesday, November 4** — `?track=lt`
- **IT** (International Teacher): **Thursday, November 5** — `?track=it`

The scope comes from the two study guides in `test-guide/` (`it-guide.jpg`, `lt-guide.jpg`).

## Ground rules for this exam
- **Workbook questions only.** Every question in the photos is re-created as a blank, interactive item, in a part marked with its source (📘 `myView p.13`, `Phonics p.2`, `IT LAW p.4`, `LT LAW p.6`, `myGrammar p.2` …). **No extra-practice parts** this time (the volume is already large).
- Activities that can't be done on screen are converted into the closest checkable form, using only the page's own words and pictures:
  - **Oral-only pages are skipped** ("Blend and read these words", "Read these words/sentences with a partner", "See and Say: listen to the middle/beginning sound"): they have no written answer, and including them made the sections too long to prepare (parent's decision). Pages with a written answer that start with "Say the picture name" are kept: pick the sound or letter (🔊 reads the picture name).
  - Nothing beyond the page: no extra dictation where the page only asks to alphabetize/sort, no questions made from teaching text or rule boxes, no word asked twice.
  - "Underline / circle / highlight the words…" → tap the words (`select` item).
  - "Alphabetize", "put the words in order", "retell in order" → tap in order (`order` item).
  - "Label the picture" → the picture is described in words; pick the label from the page's word bank.
  - Drawing-only tasks and opinion questions → handwriting pad, marked "Done" (no answer). Factual short answers → handwriting with a model answer to self-check.
- **No give-aways** (parent's review, Oct 31): a question must not tell its answer. Dropped or changed:
  - Directions that name the answer ("Write e to finish the word", "Tap the short e words", "Write a to finish the words") — the phonics is regrouped by **skill**, with all five vowels / all the consonants mixed in every question, so neither the section title (shown in the mixed test) nor the directions say which sound it is.
  - Items without a picture that said "Say the picture name", or that printed the word being asked about ("rug — does it have short u?", "quill: -it or -ill?") → listening rows (🔊, word not shown).
  - Options that differ only in capital letters (Phonics p.3) → options with different letters; only one makes sense.
  - "Tap the words that are in the box" (Phonics p.4), "tap the kw / t / s words" → removed.
  - "Which noun names the picture?" (a vocabulary question, not grammar) → "Which word is a noun / verb / adjective?" with the other kinds as options.
  - Story-bound fill-ins (myView p.50 radio/boy/pet, p.82 sand/block/street/corner) moved from the vocabulary sections to their story sections; the mixed test keeps to what the words mean.
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
- Without **✍️ Writing & drawing** every question is answered by tapping. That tick adds **all** handwriting items (spelling dictation, sentences to fix, open writing/drawing tasks) — unticked by default, remembered per track (`kcis:<exam>:mix-open`), `&open=true` in the URL. Open tasks are marked with "Done".
- **Memory**: questions answered right (or "Done") are remembered by their original id (`kcis:<exam>:mix-done:v1`) and left out of new mixes. The panel shows "✅ Done: X of Y" with a bar, the per-section counts show what is left ("21 / 24"), and **↺ Start over** clears it (so does 🗑️ Reset all progress). The questions of the mix in progress are saved with its seed (`kcis:<exam>:mix-current`), so a reload shows the same ones.
- One question at a time, its directions and section shown above it. Navigation stays two short rows however many questions there are: ◀ / a dropdown ("Question 12 of 50 ✅/❌", last option "🏁 My score") / ▶, and a thin green/red/grey progress bar. Score at the end; "New mix".
- After a correct answer it moves on by itself after 3 s (countdown in the Next button). Coming back to an answered question does not auto-advance.
- Results are stored under `mix/…` ids, separate from the workbook progress, and cleared when a new mix starts.
- When every question has an answer, the score screen brings **🐻 Blankie Bear** (被被熊, ported from `kcis-grade1-vocaburary`, `components/bear/`): it flies in, says a cheer for the score in a high, cute voice with a speech bubble (all right / ≥ 80 % / ≥ 50 % / below, 3 lines each), flies around, can be dragged (squeaks), and a tap makes it say the cheer again. Story sections bring it too when their last question is answered.

## 🎉 Celebrations
Ported from `kcis-grade1-vocaburary` (`src/components/celebrate/`), plus 20 new ones: a full-screen emoji scene (35 celebrations, 3 gentle "oops" scenes, shuffle-bag so they don't repeat) with a Web Audio sound (synthesized, no files). Triggered from `useProgress().setResult`: correct/done → celebration, wrong → oops. Choice items show a random praise ("Awesome!", "Way to go!" …). Taps pass through the overlay; hidden under `prefers-reduced-motion`.
- **iPad sound**: Web Audio on iOS/iPadOS is muted by Silent mode (the speech 🔊 is not) and goes "interrupted" after speech. `audio.ts` sets `navigator.audioSession.type = 'playback'`, resumes the context whenever it is not running, and unlocks it on every tap; `util.tsx` primes speech on the first tap so the bear can talk from a timer.

## IT — sections
Wordlist note: the study guide's "U1W1 / U1W2 / U1W5 Wordlist" is the vocabulary of the IT LAW pages (The Blackout, Henry on Wheels, Making a Map). The wordlist sheet in `IT/vocabulary/IMG_2820` is the **Term 1 LT wordlist** (U1W4 / U1W3); it is used for LT.

| Group | Section (id) | Sources |
|---|---|---|
| Foundational | Short vowels (`vowels`) | 🔊 "which vowel is in the middle?" (3 words per question, a e i o u), 🔊 tap the word you hear, picture/clue words, word ↔ picture matches — words from all five short-vowel units (myView p.13–210, Phonics p.2–21) |
| Foundational | Letters & sounds (`letters`) | 🔊 beginning / ending letter (m s t c p n f b g d l h r w j k qu v y z mixed), 🔊 endings (_ug/_un/_ut, -it/-ill), sentences with letters missing (read, only one choice makes sense), ABC order |
| Foundational | Spelling & writing (`spelling`) | 🔊 dictation of the units' spelling words, sentences to write (all handwriting) |
| Foundational | My Words to Know (`words`) | myView p.40, 88, 126, 170, 206, 227 + the *Words to Know* halves of the spelling pages (p.85, 123, 167, 204, 225); Phonics p.4, 8, 12, 16, 20, 24 |
| Vocabulary | The Blackout words (`vocab-blackout`) | IT LAW p.4–5, 8–9 |
| Vocabulary | Henry on Wheels words (`vocab-henry`) | IT LAW p.12–13, 16–17 |
| Vocabulary | Making a Map words (`vocab-map`) | IT LAW p.20–21, 24–25 |
| 📖 Reading | The Blackout (`blackout`, read myView p.16–35) | IT LAW p.6, 7, 10, 11; myView p.41, 42, 50 (radio, boy, pet), 48 |
| 📖 Reading | Henry on Wheels (`henry`, read myView p.56–83) | IT LAW p.14, 15, 18, 19; myView p.82 (places Henry rides), 89, 96 |
| 📖 Reading | Making a Map (`map`, read myView p.186–203) | IT LAW p.22, 23 (map), 26, 27 (Lila predictions, one part per story break); myView p.207, 214 |

## LT — sections
| Group | Section (id) | Sources |
|---|---|---|
| Vocabulary | Garden Party words (`vocab-garden`) | LT LAW p.4–5 |
| Vocabulary | Click, Clack, Click! words (`vocab-click`) | LT LAW p.7–8 |
| Vocabulary | Look Both Ways! words 1 (`vocab-look-1`) | LT LAW p.12–13 |
| Vocabulary | Look Both Ways! words 2 (`vocab-look-2`) | LT LAW p.15–16 |
| Vocabulary | safe · safely · safety (`safe-words`) | New (parent's request), words of LT LAW p.12–16: choose the word (3 sentences per question), which sentence is right, what each word tells. Rule in the directions: safe = not in danger · safely = how you do something · safety = the thing (fire safety) |
| Grammar | Find the word (`grammar-find`) | myGrammar p.2–9, 14–17 — nouns, verbs and adjectives **mixed in every part** |
| Grammar | Use the right word (`grammar-use`) | myGrammar p.2–9, 14–17 — fill-ins (nouns, verbs incl. *kick / kicks*, a / an, adjectives) **mixed** |
| Grammar | Verb + s (`verb-s`) | New (parent's request): the same verb twice (*kick / kicks*), 3 sentences per question; p.9 C sentences + verbs of p.7, 9, 11–13 |
| Grammar | Simple Sentences (`sentences`) | myGrammar p.9 (Part D), 10–13 |
| 📖 Reading | Garden Party (`garden`, read myView p.142–143, 149–165) | LT LAW p.6, 10; myView p.178 |
| 📖 Reading | Click, Clack, Click! (`click`, read myView p.149–165) | LT LAW p.9, 11 (compares Jamal and Amena); myView p.171 |
| 📖 Reading | Look Both Ways! (`look`, read myView p.104–105, 111–121) | LT LAW p.14, 17, 18, 19; myView p.104 (Turn and Talk), 127, 134 |

### Grammar: mixed, not one kind per page
On paper each page is about one kind of word, so the answer is easy to guess. Here the parts mix them:
- "What kind of word is *jump*?" — noun / verb / adjective (every word from the circle/sort/match activities).
- "Tap the **verb**." / "Tap the **nouns**." / "Tap the **adjectives**." — workbook sentences, the kind changes from item to item.
- Nouns: person / place / animal / thing (the sort and color-code activities).
- "Which word is a noun / verb / adjective?" — the picture activities' words, with the other two kinds as options.
- Fill-ins mix nouns, verbs, articles (*a / an*) and adjectives; *kick / kicks* has its own section (Verb + s).

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
- `multi` — several short questions in one card, checked together: 🔊 + a e i o u rows, letters you hear, *kick / kicks*, *safe / safely / safety*.
Helpers for this exam: `helpers.ts` (`choice`, `yesNo`, `write`, `select`, `order`, `matches`, `lawVocabParts`).

## Pictures
Emoji only, and only when they clearly name the word. Never "say the picture name" without a picture: listening rows have 🔊 only. 🔊 never says the answer to a "which word names this picture" item.

## 🔊 Only when the question needs it
To train reading, questions, sentences and stories are **not** read aloud. 🔊 appears only where sound is the task: listen-and-pick, dictation, the phonics sound rows (middle vowel, beginning/ending letters, endings). Blankie Bear's cheer is spoken (it's a reward, not a question).

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
- [x] IT question banks — 10 sections; mixed-test pool 162 tap questions + 45 handwriting
- [x] LT question banks — 12 sections; mixed-test pool 200 tap questions + 24 handwriting
- Trimmed on parent's request: oral-only pages (156 items), added dictation (12), grammar word-kind items not from the book's circling lists and repeated sentences (~60), Skill Words section (20), questions made from teaching text (myView p.42, 48, 104–105, 142–143).
- Oct 31 review: phonics regrouped by skill (short a/e/i/o/u + qu sections → Short vowels / Letters & sounds / Spelling & writing; 327 → 162 tap questions in the IT pool), give-away items fixed or dropped (see Ground rules), story-bound vocab moved to the stories, added Verb + s and safe · safely · safety.
