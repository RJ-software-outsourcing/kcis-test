import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem } from '../../../components/quiz/types'

const listen = (word: string, options: string[]): ChoiceItem => ({
  kind: 'choice',
  speak: word,
  options,
  answer: word,
})

const fill = (prompt: string, answer: string, options: string[]): ChoiceItem => ({
  kind: 'choice',
  prompt,
  options,
  answer,
})

export const words = defineSection({
  id: 'words',
  title: 'My Words to Know',
  subtitle: 'as, he, to, with, there, go, me, for, here, where',
  emoji: '⭐',
  parts: [
    {
      source: 'Phonics p.20',
      title: 'Write the missing word to complete each sentence. Words: as, he, to, with, three',
      columns: 2,
      items: [
        fill('Ken will run ___ Kim.', 'with', ['with', 'as', 'he']),
        fill('___ will run with Jim.', 'He', ['He', 'To', 'As']),
        fill('The ___ dogs will run to Sam.', 'three', ['three', 'with', 'as']),
        fill('The three dogs will run ___ Sam.', 'to', ['to', 'he', 'with']),
        fill('They will not get ___ wet as Sam.', 'as', ['as', 'to', 'he']),
      ],
    },
    {
      source: 'Phonics p.24',
      title: 'Pick a word from the box to complete each sentence. Words: go, me, for, here, where',
      columns: 2,
      items: [
        fill('___ is Vic?', 'Where', ['Where', 'Me', 'For']),
        fill('Did he ___ up the hill?', 'go', ['go', 'here', 'me']),
        fill('We can look ___ him.', 'for', ['for', 'where', 'go']),
        fill('Run with ___ up the hill.', 'me', ['me', 'for', 'where']),
        fill('___ he is!', 'Here', ['Here', 'Go', 'Me']),
      ],
    },
    {
      title: 'Tap 🔊 to listen. Then tap the word you hear.',
      columns: 2,
      items: [
        listen('as', ['as', 'he', 'to', 'me']),
        listen('he', ['me', 'he', 'here', 'go']),
        listen('to', ['go', 'for', 'to', 'me']),
        listen('with', ['where', 'with', 'there', 'here']),
        listen('there', ['there', 'where', 'here', 'he']),
        listen('go', ['to', 'go', 'me', 'for']),
        listen('me', ['he', 'go', 'me', 'as']),
        listen('for', ['for', 'to', 'go', 'with']),
        listen('here', ['there', 'where', 'he', 'here']),
        listen('where', ['here', 'with', 'where', 'there']),
      ],
    },
    {
      title: 'Choose the word that completes the sentence.',
      columns: 2,
      items: [
        fill('Jim will play ___ his dog.', 'with', ['with', 'where', 'he']),
        fill('___ is my cup?', 'Where', ['Here', 'Where', 'Go']),
        fill('Can you play with ___?', 'me', ['he', 'as', 'me']),
        fill('We will ___ to the park.', 'go', ['go', 'as', 'for']),
        fill('This gift is ___ you.', 'for', ['with', 'for', 'go']),
        fill('Sam is ___ tall as Dad.', 'as', ['to', 'me', 'as']),
        fill('I walk ___ school.', 'to', ['to', 'he', 'as']),
        fill('Come ___ and sit with me.', 'here', ['where', 'here', 'as']),
        fill('Look over ___! I see a bug.', 'there', ['me', 'with', 'there']),
        fill('Ken has a hat. ___ likes it.', 'He', ['He', 'Me', 'Go']),
      ],
    },
  ],
})
