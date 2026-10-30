import { defineSection } from '../../../components/quiz/types'
import type { PartInput } from '../../../components/quiz/types'
import { choice, write } from '../helpers'

const dictation = (word: string) => write(undefined, word, { speak: word })
/** Two blanks: options like 'is … his', filled in one by one. */
const two = (prompt: string, a: string, b: string, others: string[]) =>
  choice(prompt, `${a} … ${b}`, others, { fills: [a, b] })

const spell = (source: string, words: string[]): PartInput => ({
  source,
  title: 'Spell the My Words to Know words. Tap 🔊 to hear each word.',
  columns: 2,
  items: words.map(dictation),
})

export const myWords = defineSection({
  id: 'words',
  title: 'My Words to Know',
  subtitle: 'I, see, the, look, they, with, where …',
  emoji: '⭐',
  group: 'Foundational Skills',
  parts: [
    // I, a, see, his, is
    {
      source: 'myView p.40',
      title: 'Complete the sentences with words from the box: a, I, is, his, see',
      columns: 2,
      items: [
        choice('___ am Tam.', 'I', ['A', 'See']),
        choice('I ___ Sam.', 'see', ['is', 'his']),
        two('Sam ___ at ___ mat.', 'is', 'his', ['his … is', 'see … I']),
        choice('I am at ___ mat.', 'a', ['I', 'see']),
      ],
    },
    // we, do, the, one, like
    {
      source: 'myView p.88',
      title: 'Complete the sentences with words from the box: we, do, the, one, like',
      columns: 2,
      items: [
        choice('I ___ the pan.', 'like', ['one', 'we']),
        choice('I tap ___.', 'one', ['we', 'like']),
        two('___ we tap ___ pan?', 'Do', 'the', ['The … do', 'We … like']),
        choice('___ can tap and tap.', 'We', ['Do', 'Like']),
      ],
    },
    {
      source: 'Phonics p.12',
      title: 'Circle the word that completes each sentence. Then read the sentences.',
      columns: 2,
      items: [
        choice('I see ___ cat.', 'one', ['like']),
        choice('I ___ the cat.', 'like', ['we']),
        choice('___ cat can nap.', 'The', ['Do']),
        choice('Can ___ nap?', 'we', ['the']),
        choice('We can ___ it!', 'do', ['one']),
      ],
    },
    spell('myView p.85', ['the', 'one']),
    // by, are, was, you, look
    {
      source: 'myView p.126',
      title: 'Complete the sentences with words from the box: by, are, was, you, look',
      columns: 2,
      items: [
        choice('___ at the cat!', 'Look', ['Are', 'Was']),
        two('It ___ ___ the bin.', 'was', 'by', ['by … was', 'are … you']),
        choice('I see a cat by ___.', 'you', ['are', 'look']),
        choice('We ___ by the bin.', 'are', ['was', 'you']),
      ],
    },
    {
      source: 'Phonics p.8',
      title: 'Use a word from the box to complete each sentence: by, are, was, you, look',
      columns: 2,
      items: [
        choice('Sam and Dan sat ___ the big mat.', 'by', ['was', 'are']),
        choice('A cat ___ on the mat.', 'was', ['are', 'you']),
        choice('Sam and Dan ___ at the cat.', 'look', ['by', 'you']),
        choice('"Look at ___ nap!"', 'you', ['by', 'are']),
        choice('Sam and Dan ___ not sad!', 'are', ['by', 'you']),
      ],
    },
    spell('myView p.123', ['look', 'you']),
    // up, two, that, have, they
    {
      source: 'myView p.170',
      title: 'Complete the sentences with words from the box: up, two, that, have, they',
      columns: 2,
      items: [
        two('___ are ___ the hill.', 'They', 'up', ['Up … they', 'Two … have']),
        choice('Hal and Deb ___ to dig.', 'have', ['two', 'that']),
        choice('The ___ dig in the hill.', 'two', ['have', 'up']),
        choice('Hal and Deb fill ___ pen.', 'that', ['they', 'have']),
      ],
    },
    {
      source: 'Phonics p.16',
      title: 'Circle the word that completes the sentence. Then read the sentences.',
      columns: 2,
      items: [
        choice('Peg and Ben ___ one cat.', 'have', ['up']),
        choice('___ see a dog.', 'They', ['That']),
        choice('The dog can jump ___.', 'up', ['have']),
        choice('Can Peg and Ben get ___ dog?', 'that', ['they']),
        choice('We can get ___!', 'two', ['have']),
      ],
    },
    spell('myView p.167', ['have', 'they']),
    // as, he, to, with, three
    {
      source: 'myView p.206',
      title: 'Complete the sentences with words from the box: as, he, to, with, three',
      columns: 2,
      items: [
        choice('Ken and Kim jog ___ Jim.', 'with', ['he', 'three']),
        choice('The ___ get hot in the sun.', 'three', ['he', 'as']),
        choice('Ken will run ___ the bus.', 'to', ['he', 'three']),
        two('___ is not ___ hot.', 'He', 'as', ['As … he', 'To … with']),
      ],
    },
    {
      source: 'Phonics p.20',
      title: 'Choose the missing word to complete each sentence: as, he, to, with, three',
      columns: 2,
      items: [
        choice('Ken will run ___ Kim.', 'with', ['he', 'three']),
        choice('___ will run with Jim.', 'He', ['As', 'To']),
        two('The ___ dogs will run ___ Sam.', 'three', 'to', ['to … three', 'as … he']),
        choice('They will not get ___ wet as Sam.', 'as', ['to', 'he']),
      ],
    },
    spell('myView p.204', ['to', 'with']),
    // go, me, for, here, where
    {
      source: 'myView p.227',
      title: 'Complete the sentences with words from the box: go, me, for, here, where',
      columns: 2,
      items: [
        choice('___ is Zak?', 'Where', ['Me', 'Go']),
        choice('He is ___.', 'here', ['for', 'go']),
        two('Zak will ___ to the vet with ___.', 'go', 'me', ['me … go', 'for … here']),
        choice('The tag is ___ Zak.', 'for', ['where', 'go']),
      ],
    },
    {
      source: 'Phonics p.24',
      title: 'Pick a word from the box to complete each sentence: go, me, for, here, where',
      columns: 2,
      items: [
        choice('___ is Vic?', 'Where', ['Me', 'For']),
        choice('Did he ___ up the hill?', 'go', ['here', 'me']),
        choice('We can look ___ him.', 'for', ['where', 'go']),
        choice('Run with ___ up the hill.', 'me', ['for', 'where']),
        choice('___ he is!', 'Here', ['Go', 'Me']),
      ],
    },
    spell('myView p.225', ['where', 'go']),
  ],
})
