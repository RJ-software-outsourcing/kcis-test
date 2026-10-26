import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem, WriteItem } from '../../../components/quiz/types'
import { choice, matches, order, pic, select, write } from '../helpers'

const NOT_O = ['a', 'e', 'i', 'u']
const AIO = ['a', 'i', 'o']
const BFG = ['b', 'f', 'g']
const LISTEN = 'Tap 🔊 to hear the picture name.'

const without = (all: string[], answer: string) => all.filter((x) => x !== answer)

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

/** 🔊 Spelling dictation. */
const spell = (word: string): WriteItem => write(undefined, word, { speak: word })

/** Sentence with letters missing; not read aloud (that would give the letters away). */
const fill = (prompt: string, answer: string, others: string[], fills?: string[]): ChoiceItem =>
  choice(prompt, answer, others, { noSpeak: true, fills })

export const shortO = defineSection({
  id: 'short-o',
  title: 'Short o · Ff Bb Gg',
  subtitle: 'myView p.101–130 · Phonics p.6–9 · top, mop, big',
  emoji: '🍲',
  group: 'Foundational Skills',
  parts: [
    {
      source: 'myView p.108',
      title: 'Say each picture name. Write the letter o to finish the word. Then read the words.',
      columns: 2,
      items: [
        sound('🍲', 'pot', 'p___t', 'o', NOT_O),
        sound(undefined, 'mop', 'm___p', 'o', NOT_O),
        sound(undefined, 'top', 't___p', 'o', NOT_O),
        sound(undefined, 'pop', 'p___p', 'o', NOT_O),
      ],
    },
    {
      source: 'myView p.109',
      title: 'Read the sentence. Underline the short o words. Listen for the short o sound in mop.',
      items: [
        select('Tap the short o words.', 'Tom can see the pot on top.', [
          'Tom',
          'pot',
          'on',
          'top',
        ]),
      ],
    },
    {
      source: 'myView p.109',
      title:
        'Draw a picture to show the sentence about Tom. Label the picture with a short o word.',
      items: [write('Tom can see the pot on top.', undefined, { draw: true })],
    },
    {
      source: 'myView p.123',
      title: 'Alphabetize the words by the first letter.',
      items: [order('Tap the words in ABC order.', ['cot', 'got', 'not', 'pot'])],
    },
    {
      source: 'myView p.129',
      title: 'Write f, b, or g to finish the words. Then read the sentence.',
      items: [fill('Can the wi___ ___it?', 'g … f', ['f … g', 'b … f'], ['g', 'f'])],
    },
    {
      source: 'myView p.129',
      title: 'Write f, b, or g to finish the word. Then read the sentence.',
      items: [fill('The wig is ___ig.', 'b', ['f', 'g'])],
    },
    {
      source: 'myView p.130',
      title: 'Draw a line from each word to the picture it names.',
      items: matches({ bib: '👶 a baby wears it to eat', fan: '🪭', gas: '⛽' }),
    },
    {
      source: 'myView p.130',
      title: 'Write the words. Tap 🔊 to hear each word.',
      columns: 3,
      items: [spell('bib'), spell('fan'), spell('gas')],
    },
    {
      source: 'myView p.130',
      title: 'Choose one word you wrote (bib, fan, or gas). Write a sentence with that word.',
      items: [write(undefined, undefined, { lines: 2 })],
    },
    {
      source: 'Phonics p.6',
      title: 'Say the picture name. Circle the word that names the picture. Then read the words.',
      columns: 3,
      items: [
        choice('a small bed for camping', 'cot', ['cat']),
        choice('You wash the floor with it.', 'mop', ['map']),
        // The answer is the picture's name, so 🔊 is off.
        {
          kind: 'choice',
          picture: '🍲',
          noSpeak: true,
          reveal: '🍲 pot',
          options: ['pot', 'pit'],
          answer: 'pot',
        },
      ],
    },
    {
      source: 'Phonics p.6',
      title: 'Write o to complete the words. Then read the words.',
      columns: 2,
      items: [
        choice('t___p', 'o', NOT_O, { speak: 'top', reveal: '🔊 top' }),
        choice('p___p', 'o', NOT_O, { speak: 'pop', reveal: '🔊 pop' }),
      ],
    },
    {
      source: 'Phonics p.7',
      title: 'Match the pictures to the words.',
      items: matches({ '🪭': 'fan', '🏏': 'bat', '🛍️': 'bag' }),
    },
    {
      source: 'Phonics p.7',
      title: 'Write the letter f, b, or g to complete the words. Then read the sentence.',
      items: [
        fill(
          'Can it ___it in the bi___ ___in?',
          'f … g … b',
          ['b … g … f', 'g … b … f'],
          ['f', 'g', 'b'],
        ),
      ],
    },
    {
      source: 'Phonics p.9',
      title: 'Circle and write the sound to complete the word.',
      columns: 2,
      items: [
        sound('🦊', 'fox', '___ox', 'f', without(BFG, 'f')),
        sound(undefined, 'on', '___n', 'o', without(AIO, 'o')),
        sound('👩‍🍼', 'mom', 'm___m', 'o', without(AIO, 'o')),
        sound('🚫', 'not', 'n___t', 'o', without(AIO, 'o')),
        sound('🪵', 'log', 'lo___', 'g', without(BFG, 'g')),
        sound(undefined, 'got', '___ot', 'g', without(BFG, 'g')),
        sound(undefined, 'pop', 'p___p', 'o', without(AIO, 'o')),
        sound(undefined, 'mop', 'm___p', 'o', without(AIO, 'o')),
      ],
    },
    {
      source: 'Phonics p.9',
      title: 'Write two more words that match the spelling pattern _o_ (like top).',
      columns: 2,
      items: [write(undefined), write(undefined)],
    },
  ],
})
