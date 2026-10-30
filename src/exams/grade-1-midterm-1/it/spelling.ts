import { defineSection } from '../../../components/quiz/types'
import type { MultiItem } from '../../../components/quiz/types'
import { write } from '../helpers'

// The units' spelling words: tap the right spelling (always in the mixed test), and the
// handwriting tasks (only when "✍️ Writing & drawing" is ticked).

/**
 * 🔊 Three words; tap the right spelling of each. The wrong ones are spellings a child
 * might write (wrong vowel, k for c, doubled letter), never another word that sounds the same.
 */
const spellRows = (...rows: [word: string, options: string[]][]): MultiItem => ({
  kind: 'multi',
  rows: rows.map(([word, options]) => ({ speak: word, options, answer: word })),
})

/** 🔊 Spelling dictation, self-checked against the word. */
const dictation = (word: string) => write(undefined, word, { speak: word })

export const spelling = defineSection({
  id: 'spelling',
  title: 'Spelling & writing',
  subtitle: 'Pick the right spelling · write the words you hear',
  emoji: '✏️',
  group: 'Foundational Skills',
  parts: [
    {
      // myView p.60, 85, 130, 146, 190, 204 · Phonics p.5
      source: 'myView & Phonics: spelling',
      title: 'Tap 🔊 to hear the word. Write it.',
      columns: 2,
      items: [
        'bat', 'cat', 'hat', 'mat',
        'it', 'sit', 'sip', 'pin', 'mitt', 'miss',
        'bib', 'fan', 'gas',
        'men', 'net', 'pet', 'ten',
        'sun', 'rug', 'bun', 'bug', 'hug', 'tug', 'dug',
      ].map(dictation),
    },
    {
      source: 'myView p.61, 191, 224, 229 · Phonics p.9, 13, 17, 21',
      title: 'Your turn to write.',
      items: [
        write('Write a sentence about Tim.', undefined, { lines: 2 }),
        write('Write a sentence with a short u word, like sun or bug.', undefined, { lines: 2 }),
        write('Write a sentence about Quinn and the quiz.', undefined, { lines: 2 }),
        write(
          'Write a sentence about two friends named Viv and Yaz. Then draw a picture of Viv and Yaz.',
          undefined,
          { lines: 2, draw: true },
        ),
        write(
          'Write two more words for each spelling pattern: _i_ (like pin), _o_ (like top), _e_ (like pet), _u_ (like sun).',
          undefined,
          { lines: 4 },
        ),
      ],
    },
    // Last, so the ids of the parts above stay the same (the mix memory keys on them).
    {
      source: 'myView & Phonics: spelling',
      title: 'Tap 🔊 to hear each word. Tap the right spelling.',
      items: [
        spellRows(['bat', ['bat', 'bet', 'bad']], ['it', ['et', 'it', 'itt']], ['men', ['man', 'men', 'menn']]),
        spellRows(['cat', ['kat', 'cat', 'cet']], ['sit', ['set', 'sit', 'sitt']], ['sun', ['san', 'sunn', 'sun']]),
        spellRows(['hat', ['het', 'hatt', 'hat']], ['mitt', ['mit', 'mitt', 'met']], ['net', ['nit', 'net', 'nett']]),
        spellRows(['mat', ['mat', 'met', 'matt']], ['miss', ['mis', 'mess', 'miss']], ['rug', ['rag', 'rug', 'rugg']]),
        spellRows(['fan', ['fen', 'fann', 'fan']], ['pin', ['pen', 'pin', 'pinn']], ['bug', ['bag', 'bugg', 'bug']]),
        spellRows(['gas', ['gaz', 'gas', 'gus']], ['pet', ['pat', 'pett', 'pet']], ['hug', ['heg', 'hug', 'hugg']]),
        spellRows(['bib', ['bib', 'bibb', 'beb']], ['ten', ['tin', 'ten', 'tenn']], ['tug', ['tag', 'tugg', 'tug']]),
        spellRows(['sip', ['sep', 'sip', 'sipp']], ['bun', ['ban', 'bun', 'bunn']], ['dug', ['dog', 'dug', 'dugg']]),
      ],
    },
  ],
})
