import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem, WriteItem } from '../../../components/quiz/types'
import { choice, listen, pic, select, write, yesNo } from '../helpers'

const NOT_A = ['e', 'i', 'o', 'u']
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

/** What is the middle sound? (always short a here) */
const middle = (picture: string | undefined, word: string) =>
  sound(picture, word, undefined, 'a', NOT_A)

/** Does the picture name have the short a sound? */
const hasA = (picture: string | undefined, word: string, yes: boolean): ChoiceItem =>
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

/** Sentence with letters missing; not read aloud (that would give the letters away). */
const fill = (prompt: string, answer: string, others: string[], fills?: string[]): ChoiceItem =>
  choice(prompt, answer, others, { noSpeak: true, fills })

export const shortA = defineSection({
  id: 'short-a',
  title: 'Short a · Mm Ss Tt',
  subtitle: 'myView p.12–47 · Phonics p.2–5 · cat, mat, Sam',
  emoji: '🗺️',
  group: 'Foundational Skills',
  parts: [
    {
      source: 'myView p.12',
      title: 'Say each picture name. Listen to the middle sound. Which sound is in the middle?',
      columns: 3,
      items: [
        middle('🐈', 'cat'),
        middle('👒', 'hat'),
        middle('🪭', 'fan'),
        middle('🚕', 'cab'),
        middle('😞', 'sad'),
        middle('👜', 'bag'),
        middle('🍠', 'yam'),
        middle('🍳', 'pan'),
        middle('💵', 'cash'),
      ],
    },
    {
      source: 'myView p.13',
      title: 'Say each picture name. Does the word have the short a sound?',
      columns: 3,
      items: [
        hasA('🦇', 'bat', true),
        hasA('🥫', 'can', true),
        hasA('🐕', 'dog', false),
        hasA('🐀', 'rat', true),
        hasA(undefined, 'robe', false),
        hasA('🕯️', 'candle', true),
      ],
    },
    {
      source: 'myView p.20',
      title:
        'Draw a picture of something with the short a sound. Write the letter that spells that sound.',
      items: [write(undefined, 'a', { draw: true })],
    },
    {
      source: 'myView p.20',
      title: 'Say each picture name. Which vowel spells the middle sound?',
      columns: 2,
      items: [
        middle('🥫', 'can'),
        middle('🦇', 'bat'),
        middle('🐈', 'cat'),
        middle(undefined, 'mat'),
      ],
    },
    {
      source: 'myView p.21',
      title: 'Say each picture name. Write the letter that spells the middle sound.',
      columns: 2,
      items: [
        sound('🗺️', 'map', 'm___p', 'a', NOT_A),
        sound('👒', 'hat', 'h___t', 'a', NOT_A),
        sound('🍳', 'pan', 'p___n', 'a', NOT_A),
        sound('🪭', 'fan', 'f___n', 'a', NOT_A),
      ],
    },
    {
      source: 'myView p.21',
      title: 'Write a to finish the words in the sentence.',
      items: [fill('T___m is a c___t.', 'a', NOT_A)],
    },
    {
      source: 'myView p.39',
      title: 'Blend and read these words. Tap 🔊 and tap the word you hear.',
      columns: 3,
      items: [
        listen('sat', ['Sam', 'mat']),
        listen('Tam', ['Sam', 'am']),
        listen('mat', ['at', 'Tam']),
        listen('am', ['at', 'Sam']),
        listen('at', ['am', 'sat']),
        listen('Sam', ['sat', 'Tam']),
      ],
    },
    {
      source: 'myView p.43',
      title: 'Read these words. Tap 🔊 and tap the word you hear.',
      columns: 3,
      items: [
        listen('am', ['Sam', 'Tam']),
        listen('Sam', ['am', 'Tam']),
        listen('Tam', ['am', 'Sam']),
        listen('at', ['sat', 'mat']),
        listen('sat', ['at', 'mat']),
        listen('mat', ['at', 'sat']),
      ],
    },
    {
      source: 'myView p.43',
      title: 'Write m, s, or t to finish the words. Then read the sentences.',
      columns: 2,
      items: [
        fill('Sam ___a___.', 's … t', ['m … t', 't … m'], ['s', 't']),
        fill('Is Sam at a ___a___?', 'm … t', ['s … t', 't … m'], ['m', 't']),
      ],
    },
    {
      source: 'myView p.44',
      title:
        'Say each picture name. Write m, s, or t to finish each word. Listen to the first sound.',
      columns: 2,
      items: [
        sound('👨', 'man', '___an', 'm', ['s', 't']),
        sound('🏷️', 'tag', '___ag', 't', ['m', 's']),
        sound(undefined, 'mat', '___at', 'm', ['s', 't']),
        sound('😢', 'sad', '___ad', 's', ['m', 't']),
      ],
    },
    {
      source: 'myView p.44',
      title: 'Choose a word you wrote to finish the sentence.',
      items: [choice('Sam is at a ___.', 'mat', ['man', 'tag', 'sad'])],
    },
    {
      source: 'myView p.45–47',
      title: 'Read the story “At a Mat”. Tap the words.',
      items: [
        select(
          'Highlight the five words with the short a sound.',
          'At a Mat. I am Tam. I see Sam.',
          ['at', 'mat', 'am', 'Tam', 'Sam'],
        ),
        select('Underline the three words with the t sound.', 'I see a mat. Sam is at his mat.', [
          'mat',
          'at',
        ]),
        select(
          'Highlight the three words with the s sound.',
          'I sat at a mat. Sam sat at his mat.',
          ['sat', 'Sam'],
        ),
      ],
    },
    {
      source: 'Phonics p.2',
      title: 'Say the picture name. Does the picture name have the short a sound?',
      columns: 3,
      items: [
        hasA('🐈', 'cat', true),
        hasA('🐀', 'rat', true),
        hasA('🐕', 'dog', false),
        hasA('🪵', 'log', false),
        hasA(undefined, 'mat', true),
        hasA('👒', 'hat', true),
        hasA('🏏', 'bat', true),
        hasA('🖊️', 'pen', false),
      ],
    },
    {
      source: 'Phonics p.3',
      title: 'Write the letter S or s, m, or T or t to complete the words. Then read the sentence.',
      items: [
        fill('___am ___at.', 'S … s', ['s … S', 'S … S'], ['S', 's']),
        fill('Sa___ is at his ___at.', 'm', ['s', 't']),
        fill('___am sa___ at a ma___.', 'T … t … t', ['t … T … T', 'T … T … t'], ['T', 't', 't']),
      ],
    },
    {
      source: 'Phonics p.5',
      title: 'Choose the sound to complete the word.',
      columns: 2,
      items: [
        sound('🏏', 'bat', 'b___t', 'a', NOT_A),
        sound('🐀', 'rat', 'r___t', 'a', NOT_A),
        sound('🥫', 'can', 'c___n', 'a', NOT_A),
        sound('🗺️', 'map', 'm___p', 'a', NOT_A),
      ],
    },
    {
      source: 'Phonics p.5',
      title: 'Write the word to match the picture.',
      columns: 2,
      items: [name('🦇', 'bat'), name('🐈', 'cat'), name('👒', 'hat'), name(undefined, 'mat')],
    },
  ],
})
