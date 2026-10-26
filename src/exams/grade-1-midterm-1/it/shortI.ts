import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem, WriteItem } from '../../../components/quiz/types'
import { choice, pic, write, yesNo } from '../helpers'

const NOT_I = ['a', 'e', 'o', 'u']
const LISTEN = 'Tap 🔊 to hear the picture name.'

/** A picture item; without an emoji only 🔊 says the picture name. */
const sound = (
  picture: string | undefined,
  word: string,
  prompt: string | undefined,
  answer: string,
  others: string[],
): ChoiceItem =>
  picture
    ? pic(picture, word, prompt, answer, others)
    : choice(prompt ?? LISTEN, answer, others, { speak: word, reveal: `🔊 ${word}` })

/** Does the picture name have the short i sound? */
const hasI = (picture: string | undefined, word: string, yes: boolean): ChoiceItem =>
  yesNo(
    picture ? undefined : LISTEN,
    yes,
    picture
      ? { picture, speak: word, reveal: `${picture} ${word}` }
      : { speak: word, reveal: `🔊 ${word}` },
  )

/** Write the word that names the picture. */
const name = (picture: string | undefined, word: string): WriteItem =>
  write(picture ? undefined : LISTEN, word, { picture, speak: word })

/** 🔊 Spelling dictation. */
const spell = (word: string): WriteItem => write(undefined, word, { speak: word })

/** Sentence or word with letters missing; not read aloud (that would give the letters away). */
const fill = (prompt: string, answer: string, others: string[], fills?: string[]): ChoiceItem =>
  choice(prompt, answer, others, { noSpeak: true, fills })

export const shortI = defineSection({
  id: 'short-i',
  title: 'Short i · Cc Pp Nn',
  subtitle: 'myView p.52–92 · Phonics p.10–13 · pin, sit, cap',
  emoji: '🧷',
  group: 'Foundational Skills',
  parts: [
    {
      source: 'myView p.60',
      title: 'Say each picture name. Write the words. Read the words.',
      columns: 2,
      items: [
        name(undefined, 'Tim'),
        name(undefined, 'sit'),
        name('🧷', 'pin'),
        name(undefined, 'sip'),
      ],
    },
    {
      source: 'myView p.61',
      title: 'Write the letter i to finish the words. Read the sentence.',
      items: [fill('T___m can s___t.', 'i', NOT_I)],
    },
    {
      source: 'myView p.61',
      title: 'Write a sentence about Tim.',
      items: [write('Tim …', undefined, { lines: 2 })],
    },
    {
      source: 'myView p.85',
      title: 'Spell the short i words. Tap 🔊 to hear each word.',
      columns: 2,
      items: [spell('it'), spell('sit'), spell('mitt'), spell('miss')],
    },
    {
      source: 'myView p.91',
      title: 'Write c, p, or n to finish the words. Then read the sentence.',
      items: [fill('We ___at the ___at.', 'p … c', ['c … p', 'p … n'], ['p', 'c'])],
    },
    {
      source: 'myView p.91',
      title: 'Write c, p, or n to finish the word. Then read the sentence.',
      items: [fill('The cat can ___ap.', 'n', ['c', 'p'])],
    },
    {
      source: 'myView p.92',
      title: 'Say each picture name. Write c, p, or n to complete the words. Then read the words.',
      columns: 2,
      items: [
        sound('🗺️', 'map', 'ma___', 'p', ['c', 'n']),
        sound('🍳', 'pan', '___an', 'p', ['c', 'n']),
        sound('🧷', 'pin', 'pi___', 'n', ['c', 'p']),
        sound('🐈', 'cat', '___at', 'c', ['p', 'n']),
      ],
    },
    {
      source: 'myView p.92',
      title: 'Write a sentence about one of the pictures: map, pan, pin, or cat.',
      items: [write(undefined, undefined, { lines: 2 })],
    },
    {
      source: 'Phonics p.10',
      title: 'Say the picture name. Does the picture name have the short i sound?',
      columns: 3,
      items: [
        hasI('🧷', 'pin', true),
        hasI('🐷', 'pig', true),
        hasI('🐈', 'cat', false),
        hasI(undefined, 'bib', true),
        hasI('🖊️', 'pen', false),
        hasI(undefined, 'wig', true),
        hasI(undefined, 'zip', true),
        hasI('🍎', 'apple', false),
      ],
    },
    {
      source: 'Phonics p.11',
      title: 'Say the picture name. Write the missing letter. Then read the words.',
      columns: 2,
      items: [
        sound(undefined, 'nap', '___ap', 'n', ['c', 'p']),
        sound('🧷', 'pin', '___in', 'p', ['c', 'n']),
        sound('🐈', 'cat', '___at', 'c', ['p', 'n']),
        sound('🧢', 'cap', '___ap', 'c', ['p', 'n']),
        sound('🍳', 'pan', '___an', 'p', ['c', 'n']),
        sound('🗺️', 'map', 'ma___', 'p', ['c', 'n']),
        sound('🥫', 'can', 'ca___', 'n', ['c', 'p']),
        sound('👨', 'man', 'ma___', 'n', ['c', 'p']),
      ],
    },
    {
      source: 'Phonics p.13',
      title:
        'Choose the sound to complete the word. Letter bank: i k s i i x i t (each letter is used once).',
      columns: 2,
      items: [
        fill('___t', 'i', ['k', 's']),
        fill('___n', 'i', ['k', 'x']),
        fill('___id', 'k', ['s', 't']),
        fill('___ix', 's', ['k', 't']),
        fill('p___n', 'i', ['x', 'k']),
        fill('s___p', 'i', ['t', 'k']),
        fill('si___', 't', ['k', 'i']),
        fill('mi___', 'x', ['k', 's']),
      ],
    },
    {
      source: 'Phonics p.13',
      title: 'Write two more words that match the spelling pattern _i_ (like pin).',
      columns: 2,
      items: [write(undefined), write(undefined)],
    },
  ],
})
