import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem } from '../../../components/quiz/types'
import { choice, listen, matches, pic, write, yesNo } from '../helpers'

const dictation = (word: string) => write(undefined, word, { speak: word })
const letter = (prompt: string, answer: string, others: string[], fills?: string[]) =>
  choice(prompt, answer, others, { noSpeak: true, fills })

/** Yes / No: does the picture name have short u? 🔊 says the picture name. */
const hasU = (picture: string | undefined, word: string, yes: boolean): ChoiceItem =>
  picture
    ? yesNo(undefined, yes, { picture, speak: word, reveal: `${picture} ${word}` })
    : yesNo(word, yes)

/** "Circle the word that names the picture": the name must not be read aloud. */
const nameIt = (picture: string, answer: string, others: string[]): ChoiceItem => ({
  kind: 'choice',
  picture,
  noSpeak: true,
  reveal: `${picture} ${answer}`,
  options: [answer, ...others],
  answer,
})

export const shortU = defineSection({
  id: 'short-u',
  title: 'Short u · Rr Ww Jj Kk',
  subtitle: 'sun, bug, cup · r, w, j, k words',
  emoji: '☀️',
  group: 'Foundational Skills',
  parts: [
    {
      source: 'myView p.183',
      title: 'Blend and read these words. Tap 🔊 and tap the word you hear.',
      columns: 2,
      items: [
        listen('dug', ['hug', 'sub']),
        listen('fun', ['nut', 'bus']),
        listen('sub', ['bus', 'dug']),
        listen('nut', ['fun', 'hug']),
        listen('hug', ['dug', 'bus']),
        listen('bus', ['sub', 'fun']),
      ],
    },
    {
      source: 'myView p.190',
      title: 'Read these words. Tap 🔊 and tap the word you hear.',
      columns: 2,
      items: [
        listen('dug', ['hug', 'mug']),
        listen('hug', ['mug', 'dug']),
        listen('mug', ['dug', 'hug']),
        listen('but', ['nut', 'hut']),
        listen('nut', ['hut', 'but']),
        listen('hut', ['nut', 'but']),
      ],
    },
    {
      source: 'myView p.190',
      title: 'Say each picture name. Write the word on the lines. Read the words.',
      columns: 2,
      items: [
        write(undefined, 'sun', { picture: '☀️' }),
        write(undefined, 'bug', { picture: '🪲' }),
        write('No picture here. Tap 🔊 and write the word.', 'rug', { speak: 'rug' }),
        write('The bread of a burger is a ___.', 'bun', { picture: '🍔' }),
      ],
    },
    {
      source: 'myView p.191',
      title: 'Add u to make words. Read the words. Match each word to its picture.',
      items: [
        ...matches({ 's u n': '☀️', 'c u p': '🥤', 'n u t': '🌰', 't u b': '🛁' }),
        write('Write a sentence using words with short u.', undefined, { lines: 2 }),
      ],
    },
    {
      source: 'myView p.204',
      title: 'Read and spell the short u words. Tap 🔊 to hear each word.',
      columns: 2,
      items: [dictation('bug'), dictation('hug'), dictation('tug'), dictation('dug')],
    },
    {
      source: 'myView p.205',
      title: 'Say each picture name. Listen to the sound at the beginning. Which letter spells it?',
      columns: 2,
      items: [
        pic('🪨', 'rock', undefined, 'r', ['w', 'j', 'k']),
        pic('🕸️', 'web', undefined, 'w', ['r', 'j', 'k']),
        pic('🏺', 'jug', undefined, 'j', ['r', 'w', 'k']),
        pic('🪁', 'kite', undefined, 'k', ['r', 'w', 'j']),
      ],
    },
    {
      source: 'myView p.205',
      title: 'Read these words. Tap 🔊 and tap the word you hear.',
      columns: 2,
      items: [listen('rip', ['job', 'kit']), listen('job', ['rip', 'jet'])],
    },
    {
      source: 'myView p.209',
      title: 'Decode these words. Tap 🔊 and tap the word you hear.',
      columns: 2,
      items: [
        listen('rag', ['rat', 'rug']),
        listen('rat', ['rag', 'rug']),
        listen('rug', ['rag', 'rat']),
        listen('web', ['wag', 'wet']),
        listen('wag', ['web', 'wet']),
        listen('wet', ['web', 'wag']),
      ],
    },
    {
      source: 'myView p.209',
      title: 'Decode these words. Tap 🔊 and tap the word you hear.',
      columns: 2,
      items: [
        listen('jet', ['jug', 'Jan']),
        listen('jug', ['jet', 'Jan']),
        listen('Jan', ['jet', 'jug']),
        listen('Ken', ['kit', 'kid']),
        listen('kit', ['Ken', 'kid']),
        listen('kid', ['Ken', 'kit']),
      ],
    },
    {
      source: 'myView p.209',
      title: 'Write the letter r, w, j, or k to finish the words. Then read the sentences.',
      items: [
        letter('___im will ___og.', 'K … j', ['J … k', 'R … w'], ['K', 'j']),
        letter('Wes ___ill ___un.', 'w … r', ['r … w', 'j … k'], ['w', 'r']),
        letter('Can ___im win?', 'K', ['R', 'W']),
      ],
    },
    {
      source: 'myView p.210',
      title:
        'Choose the word that completes each sentence. Think about the sounds the letters spell.',
      columns: 2,
      items: [
        choice('We sit on the ___.', 'rug', ['web', 'jug']),
        choice('I see a big ___.', 'web', ['rug', 'kit']),
        write('Write a sentence that includes words with r, w, j, or k.', undefined, { lines: 2 }),
      ],
    },
    {
      source: 'Phonics p.18',
      title: 'Say the picture name. Does the word have the short u sound?',
      columns: 3,
      items: [
        hasU('🛁', 'tub', true),
        hasU('🪲', 'bug', true),
        hasU(undefined, 'rug', true),
        hasU('🚲', 'bike', false),
        hasU('🪙', 'penny', false),
        hasU('🚌', 'bus', true),
        hasU('☀️', 'sun', true),
        hasU('☕', 'cup', true),
      ],
    },
    {
      source: 'Phonics p.19',
      title: 'Say the picture name. Choose the word that names the picture.',
      columns: 2,
      items: [
        nameIt('🐀', 'rat', ['rip', 'run']),
        nameIt('🏺', 'jug', ['jet', 'jam']),
        nameIt('🧒', 'kid', ['kin', 'kit']),
        nameIt('🕸️', 'web', ['win', 'wet']),
      ],
    },
    {
      source: 'Phonics p.21',
      title: 'Short u is a middle sound: _u_. Choose the ending sound and finish the word.',
      columns: 2,
      items: [
        pic('🐞', 'bug', 'b___', 'ug', ['un', 'ut']),
        pic('☕', 'cup', 'c___', 'up', ['ug', 'ub']),
        pic('🚴', 'fun', 'f___', 'un', ['ug', 'ut']),
        pic('🧸', 'hug', 'h___', 'ug', ['up', 'ub']),
        pic('🥜', 'nut', 'n___', 'ut', ['ug', 'un']),
        pic('🏃', 'run', 'r___', 'un', ['ug', 'ut']),
        pic('☀️', 'sun', 's___', 'un', ['ug', 'ut']),
        pic('🛁', 'tub', 't___', 'ub', ['ug', 'up']),
        write('Write two more words that match the spelling pattern _u_.'),
      ],
    },
  ],
})
