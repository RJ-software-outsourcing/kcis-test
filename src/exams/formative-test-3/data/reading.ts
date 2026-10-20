import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem } from '../../../components/quiz/types'

const q = (prompt: string, answer: string, others: string[]): ChoiceItem => ({
  kind: 'choice',
  prompt,
  options: [answer, ...others],
  answer,
})

export const reading = defineSection({
  id: 'reading',
  title: 'Making a Map',
  subtitle: 'Reading comprehension · steps in order',
  emoji: '📖',
  parts: [
    {
      title: 'Think about the text "Making a Map". Choose the best answer.',
      items: [
        q('What do maps help people do?', 'Maps help people find their way.', [
          'Maps help people bake a cake.',
          'Maps help people sing songs.',
        ]),
        q('What is the first thing you do when you make a map?', 'List the places you go.', [
          'Color the paper.',
          'Make a key.',
        ]),
        q('What shape shows buildings on the map?', 'Squares', ['Circles', 'Triangles']),
        q('What color should parks be on a map?', 'Green', ['Red', 'Black']),
        q('What does the map key show?', 'What the colors mean.', [
          'How big the buildings are.',
          'Where to buy food.',
        ]),
        q('What can you do after you finish your map?', 'Share it with others.', [
          'Throw it away.',
          'Hide it under the bed.',
        ]),
        q('What kind of text is "Making a Map"?', 'It tells how to make something.', [
          'It is a story about a dragon.',
          'It is a song about the sea.',
        ]),
      ],
    },
    {
      title: 'Steps in order. Read: "First, list some places you go. Next, color the places. Last, make a key."',
      items: [
        q('What do you do first?', 'List some places you go.', ['Make a key.', 'Color the places.']),
        q('What do you do next?', 'Color the places.', ['List the places.', 'Go to sleep.']),
        q('What do you do last?', 'Make a key.', ['List the places.', 'Go to the store.']),
        q('Which words tell the steps in order?', 'First, Next, Last', [
          'Red, Green, Blue',
          'Here, There, Where',
        ]),
        q('First, list places. ___, color the places.', 'Next', ['Last', 'Where']),
      ],
    },
    {
      title: 'Answer the questions in complete sentences.',
      items: [
        { kind: 'write', prompt: 'Name 3 places you would put on a map of your town.', lines: 2 },
        { kind: 'write', prompt: 'What colors would you use on a map of your street? Why?', lines: 2 },
        { kind: 'write', prompt: 'Why does a map need a key?', lines: 2 },
        {
          kind: 'write',
          prompt: 'Write the steps to make a map. Use First, Next, and Last.',
          lines: 3,
        },
      ],
    },
  ],
})
