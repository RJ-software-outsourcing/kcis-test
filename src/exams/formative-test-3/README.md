# Formative Test 3 — Spec

Route: `/formative-test-3`  Source material: `test-raw-material/formative-test-3/`
Test date: **Friday, October 23** (Grade 1, Unit 3, Weeks 7–8; myView 1.1 Unit 1 Week 5, story *Making a Map*)

## Source material
| Folder | What it is | Used for |
|---|---|---|
| `test-guide/` | Formative Test 3 Guide (1 page) | Scope — the source of truth for what is in range |
| `IT-LAW-page-20-27/` | IT LAW workbook p.20–27 | Vocabulary Part 1/2, Reading Comprehension Part 1/2, Find Graphics (map), Correct & Confirm Predictions |
| `phonics-page-18-25/` | Phonics workbook p.18–25 | Short u, Rr/Ww/Jj/Kk, My Words to Know, Qu/qu, Vv/Yy/Zz |
| `my-view/` | myView 1.1 pages (p.192, 204–211, short-u pages) | *Making a Map* preview vocabulary, procedural text (First/Next/Last), extra phonics practice |

The workbook pages already have the child's answers written in. **Do not copy those items verbatim.** Reuse the *question types* and write new items with the same words and difficulty.

## Scope (from the guide — stay inside it)
- **Week 7**
  - Phonics: short u words (fun, run, sun; -ug, -un, -ut, -up, -ub)
  - Letters: Rr, Ww, Jj, Kk
  - My Words to Know: as, he, to, with, there
  - Vocabulary Part 1: maps, find, places, grocery, list, start, streets, near
  - Reading skill: find graphics (maps, pictures, labels) in a text
- **Week 8**
  - Phonics: Qu/qu words (quiz, quit, …)
  - Letters: Vv, Yy, Zz
  - My Words to Know: go, me, for, here, where
  - Vocabulary Part 2: squares, buildings, school, library, stores, outdoor, fields, key
  - Reading skill: make predictions, then check and correct them using text and graphics
- **Story**: *Making a Map* (procedural text). Steps: First, list places you go. Next, color the places. Last, make a key. Maps help people find their way; squares show buildings; parks are green; water is blue; a map key tells what the colors mean; share your map when you finish.

Out of scope: words with blends/digraphs as *spelling* targets (except the guide's qu words), long vowels, anything not in the list above. Picture words may contain other sounds as long as the tested sound is clear (e.g. *queen* for qu).

## Difficulty
KCIS Grade 1. Short sentences (≤ 12 words), CVC words, vocabulary from the lists above, 2–4 answer options. New items must match the workbook difficulty.

## Sections (one screen each; each section is split into parts)
Landing page = grid of section cards showing progress. Inside a section, one **part** (one set of directions) at a time, with Prev/Next.

1. **Short u** — *Week 7 Phonics*
   - Picture: does it have the short u sound? (Yes/No)
   - Picture: choose the ending (ug/un/ut/up/ub) to finish the word
   - Read: which word has short u?
   - Picture: write the word ✍️
   - Listen 🔊 and write the word ✍️ (dictation)
   - Write a sentence with short u words ✍️
2. **Letters** — *Rr Ww Jj Kk (Wk 7), Vv Yy Zz (Wk 8)*
   - Match uppercase ↔ lowercase
   - Picture: choose the word that names it (3 options)
   - Picture: which letter does it begin with?
   - Sentence: choose the missing letter
   - Write a sentence with r, w, j, or k words ✍️
3. **Qu / qu** — *Week 8 Phonics*
   - Picture/word: does it begin like *quit*? (Yes/No)
   - Use the code to find the qu word (symbol cipher) ✍️
   - Choose the qu word that completes the sentence
4. **My Words to Know** — all 10 high-frequency words
   - Listen 🔊 and find the word
   - Choose the word that completes the sentence
5. **Vocabulary Part 1** — maps, find, places, grocery, list, start, streets, near
   - Choose the word that completes the sentence (2 options, as in the workbook)
   - Match word ↔ meaning
   - Which word means…? (3 options)
   - Use a word in a sentence and draw a picture ✍️🎨
6. **Vocabulary Part 2** — squares, buildings, school, library, stores, outdoor, fields, key
   - Same part types as Part 1
7. **Making a Map** — reading comprehension
   - Multiple choice about the text (purpose of maps, steps, shapes, colors, map key, after finishing)
   - Steps in order: First / Next / Last
   - Answer in complete sentences ✍️
8. **Read a Map** — find graphics
   - A town map drawn in SVG (streets, buildings, park, pond, map key)
   - Questions about labels, locations, "near", and the map key
   - Write the places near your home ✍️
9. **Predictions** — make, check, correct
   - Short stories with breaks. Pick a prediction → the next part of the story appears → the app shows whether the prediction was right, and if not, what really happened (correct it).
   - Write your own prediction ✍️

## Interaction rules
- **Choice / match**: auto-checked right after answering. Green = correct, red = wrong, with a "Try again" button.
- **Handwriting ✍️**: a canvas with primary-school ruled lines (solid top/bottom, dashed middle).
  - Apple Pencil supported through Pointer Events (pressure-sensitive width).
  - Palm rejection: once a pen is used on a pad, finger touches on that pad are ignored.
  - Undo and Clear buttons.
  - No handwriting recognition. "Show answer" reveals the expected answer (when there is one), then the child self-marks "I got it" / "Try again".
  - Open-ended items have no answer; "Done" marks them complete.
- **🔊 Listen**: Web Speech API (`speechSynthesis`, en-US) reads the word or sentence aloud. Never read aloud the answer to a picture-naming item.
- Option order is shuffled on each visit.
- Progress (results per item) is saved in `localStorage` per exam. Handwriting strokes are kept in memory for the session only. "Reset section" clears a section's progress.

## iPad layout
- Designed for iPad portrait and landscape (768–1366 px wide); also works on phones.
- Touch targets ≥ 48 px; body text ≥ 20 px; large emoji pictures.
- Handwriting canvases use `touch-action: none` so drawing doesn't scroll the page.

## Pictures
Use emoji for pictures (no image assets). Pick only emoji that clearly name the target word. When an emoji could be read several ways, show the word after answering.

## Code layout
```
src/exams/formative-test-3/
  meta.ts, ExamPage.tsx      section grid + section view
  data/                      one file per section (question banks)
  TownMap.tsx                SVG map for "Read a Map"
src/components/quiz/         reusable question components (shared by future exams)
```

## Status
- [x] Spec
- [ ] Pages implemented
