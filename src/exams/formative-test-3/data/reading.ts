import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem } from '../../../components/quiz/types'

const q = (prompt: string, answer: string, others: string[]): ChoiceItem => ({
  kind: 'choice',
  prompt,
  options: [answer, ...others],
  answer,
})

/** Workbook multiple choice (options are shuffled like all others, so position can't be remembered). */
const wb = (prompt: string, options: string[], answer: string): ChoiceItem => ({
  kind: 'choice',
  prompt,
  options,
  answer,
})

export const reading = defineSection({
  id: 'reading',
  title: 'Making a Map',
  subtitle: 'Reading comprehension · steps in order',
  readFirst: 'myView 1.1 p.186–203',
  emoji: '📖',
  parts: [
    {
      source: 'IT LAW p.22',
      title: 'Color the circle next to the most correct answer.',
      items: [
        wb(
          'What do maps help people do?',
          [
            'Maps help people play games like a treasure hunt.',
            'A map can help people find their way.',
            'They can help you make friends.',
          ],
          'A map can help people find their way.',
        ),
        wb(
          'What is the first thing you should do when making a map?',
          [
            'You should draw pictures.',
            'The first thing you should do is color your paper.',
            'First, you should list places you go.',
          ],
          'First, you should list places you go.',
        ),
        wb(
          'What shape is used to show buildings on the map?',
          [
            'Circles show buildings.',
            'You should use triangles.',
            'Squares are used to show buildings.',
          ],
          'Squares are used to show buildings.',
        ),
      ],
    },
    {
      source: 'IT LAW p.22',
      title: 'Answer the questions in complete sentences.',
      items: [
        {
          kind: 'write',
          prompt: 'What do you think you will add to your own map? (Name 3 places.)',
          lines: 2,
        },
        {
          kind: 'write',
          prompt: 'How do you think your friends will feel when they see your map? Why?',
          lines: 2,
        },
      ],
    },
    {
      source: 'IT LAW p.26',
      title: 'Color the circle next to the most correct answer.',
      items: [
        wb(
          'What color should you use for parks on a map?',
          [
            'Parks are blue on a map.',
            'Red is used to show a park on a map.',
            'You should color parks green.',
          ],
          'You should color parks green.',
        ),
        wb(
          'What does the key on the map show?',
          [
            'A map key shows the size of the buildings.',
            'The key shows what the colors mean.',
            'It shows where to find food on the map.',
          ],
          'The key shows what the colors mean.',
        ),
        wb(
          'What might you do after you finish your map?',
          [
            'I might throw it away.',
            'You should share it with others.',
            'After you finish you should color it again.',
          ],
          'You should share it with others.',
        ),
      ],
    },
    {
      source: 'IT LAW p.26',
      title: 'Answer the questions in complete sentences.',
      items: [
        { kind: 'write', prompt: 'What colors would go on a map of your neighborhood?', lines: 2 },
        {
          kind: 'write',
          prompt: 'What do you think is the most important part of making a map?',
          lines: 2,
        },
      ],
    },
    {
      source: 'myView p.208',
      title:
        'Authors use First, Next, Last to show steps in order: "First, list some places you go. Next, color the places. Last, make a key."',
      items: [
        {
          kind: 'write',
          prompt:
            'Write sentences that tell how to make or do something. Use words that tell the steps in order.',
          lines: 3,
        },
      ],
    },
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
      title:
        'Steps in order. Read: "First, list some places you go. Next, color the places. Last, make a key."',
      items: [
        q('What do you do first?', 'List some places you go.', [
          'Make a key.',
          'Color the places.',
        ]),
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
        {
          kind: 'write',
          prompt: 'What colors would you use on a map of your street? Why?',
          lines: 2,
        },
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
