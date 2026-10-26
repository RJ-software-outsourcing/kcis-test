import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem } from '../../../components/quiz/types'
import { choice, select, write } from '../helpers'
import { WorkbookMap } from './TownMap'

const READING = '📖 Reading — read the story in myView first'
const CIRCLES = 'Color the circle next to the most correct answer.'
const SENTENCES = 'Answer the questions in complete sentences.'

/** Workbook multiple choice: the page's options, with the correct one given separately. */
const wb = (prompt: string, options: string[], answer: string): ChoiceItem => ({
  kind: 'choice',
  prompt,
  options,
  answer,
})

const CHARACTERS = ['The boy (the narrator)', 'Mama', 'Papa', 'Mrs. Johnson']
const label = (prompt: string, answer: string, bank: string[]): ChoiceItem =>
  choice(
    prompt,
    answer,
    bank.filter((w) => w !== answer),
  )

export const blackout = defineSection({
  id: 'blackout',
  title: 'The Blackout',
  subtitle: 'Characters · text evidence · first-person text',
  emoji: '🕯️',
  group: READING,
  readFirst: 'myView 1.1 p.16–35',
  links: [{ label: '🎧 Read-along video', url: 'https://youtu.be/Xe0u21isa2A' }],
  parts: [
    {
      source: 'IT LAW p.6',
      title: CIRCLES,
      items: [
        wb(
          'What happened during the storm?',
          [
            'The lights went out during the storm.',
            'Everything was noisy during the storm.',
            'Everyone was happy during the storm.',
          ],
          'The lights went out during the storm.',
        ),
        wb(
          'Who will check on Mr. Stevens?',
          [
            'Mama will check on Mr. Stevens.',
            'Martha and Todd will check on Mr. Stevens.',
            'Papa will check on Mr. Stevens.',
          ],
          'Mama will check on Mr. Stevens.',
        ),
        wb(
          'What does Mrs. Johnson need?',
          [
            'Mrs. Johnson needs her radio.',
            'She needs a battery for her radio.',
            'Her radio needs a flashlight.',
          ],
          'She needs a battery for her radio.',
        ),
      ],
    },
    {
      source: 'IT LAW p.6',
      title: SENTENCES,
      items: [
        write(
          'Why did everything go quiet?',
          'Everything went quiet because the lights went out in the storm.',
          { lines: 2 },
        ),
        write('Where does Mrs. Johnson live?', 'Mrs. Johnson lives upstairs.', { lines: 2 }),
      ],
    },
    {
      source: 'IT LAW p.7',
      title: 'Label the characters from the story. Read about each picture and choose its label.',
      columns: 2,
      items: [
        label('A woman with long hair smiles and holds a candle.', 'Mama', CHARACTERS),
        label(
          'An older woman with her hair in a bun leans over a radio.',
          'Mrs. Johnson',
          CHARACTERS,
        ),
        label(
          'A boy with curly hair and a jacket stands by a window.',
          'The boy (the narrator)',
          CHARACTERS,
        ),
        label('A man holds a flashlight and gives a thumbs up.', 'Papa', CHARACTERS),
      ],
    },
    {
      source: 'IT LAW p.10',
      title: CIRCLES,
      items: [
        wb(
          'What did the boy give to Mrs. Johnson?',
          [
            'He gave her his battery.',
            'The boy gave her his flashlight.',
            'He gave Mrs. Johnson his radio.',
          ],
          'He gave her his battery.',
        ),
        wb(
          'How long does everyone listen to the radio?',
          [
            'Everyone listens to the radio until the sun comes up.',
            'They keep listening until the storm is over.',
            'The radio plays until the lights come back on.',
          ],
          'The radio plays until the lights come back on.',
        ),
        wb(
          'What is the genre (what kind of story) of The Blackout? (Look on page 24!)',
          [
            'The Blackout is Animal Fantasy.',
            'It is Realistic Fiction.',
            'The story is Informational Text.',
          ],
          'It is Realistic Fiction.',
        ),
      ],
    },
    {
      source: 'IT LAW p.10',
      title: SENTENCES,
      items: [
        write(
          'What did Mrs. Johnson put in her radio?',
          "She put the boy's battery in her radio.",
          { lines: 2 },
        ),
        write('How do you feel when there is a big storm (like the one in the story)?', undefined, {
          lines: 2,
        }),
      ],
    },
    {
      source: 'IT LAW p.11',
      title:
        'Draw and describe another character from the story. (Think about what they do, look like, or how they act.)',
      items: [
        write(
          'Example: "The boy checks on Mrs. Johnson. He gives her his battery. He is helpful and kind. He looks cool." Now pick another character: Mama, Papa, or Mrs. Johnson. Write the name and 3 sentences.',
          undefined,
          { lines: 4, draw: true },
        ),
      ],
    },
    {
      source: 'myView p.41',
      title:
        'A character is a person or animal in a story. Describe the main character, the boy. Look back at the text. Use the pictures too.',
      items: [
        write('What he says:', 'I will check on Mrs. Johnson!', { lines: 2 }),
        write(
          'What he does:',
          'He goes upstairs to check on Mrs. Johnson. He gives her his battery.',
          { lines: 2 },
        ),
        write(
          'Turn and Talk: Tell the reason the boy goes upstairs.',
          'He goes upstairs to check on Mrs. Johnson and see if she is okay in the blackout.',
          { lines: 2 },
        ),
      ],
    },
    {
      source: 'myView p.42',
      title:
        'A first-person text is a story told by a character in the story. First-person texts use words such as I, me, my, and we.',
      items: [
        choice(
          'Which sentence is told by a character (first person)?',
          'I go upstairs with my flashlight.',
          ['He goes upstairs with his flashlight.', 'The boy goes upstairs with a flashlight.'],
        ),
        select(
          'Tap the words that show it is a first-person text.',
          'I go upstairs with my flashlight.',
          ['I', 'my'],
        ),
        write(
          'Write a sentence about something that happened to you. Use a word that shows it is a first-person text (I, me, my, we).',
          undefined,
          { lines: 3 },
        ),
      ],
    },
    {
      source: 'myView p.48',
      title: 'Draw the main character of The Blackout. Look back at the text.',
      items: [
        choice('Who is the main character of The Blackout?', 'The boy (the narrator)', [
          'Mama',
          'Papa',
          'Mrs. Johnson',
        ]),
        write('Draw the main character.', undefined, { lines: 0, draw: true }),
      ],
    },
  ],
})

const SETTINGS = ["Henry's House", 'The corner', 'The street', 'The park']
const QUESTIONS = [
  'Where can Henry ride?',
  'Who can Henry see on the street?',
  'What does Henry ride down the street?',
  'Why does Henry stop?',
]

export const henry = defineSection({
  id: 'henry',
  title: 'Henry on Wheels',
  subtitle: 'Setting · ask and answer questions',
  emoji: '🚴',
  group: READING,
  readFirst: 'myView 1.1 p.56–83',
  links: [{ label: '🎧 Read-along video', url: 'https://youtu.be/TVo3lEoffJA' }],
  parts: [
    {
      source: 'IT LAW p.14',
      title: CIRCLES,
      items: [
        wb(
          'What color bike does Henry have?',
          ['Henry has a red bike.', 'His bike is blue.', 'He has a yellow bike.'],
          'Henry has a red bike.',
        ),
        wb(
          'Can Henry ride by himself?',
          [
            'Yes, he can ride by himself.',
            "No, he can't ride by himself.",
            "The story doesn't say.",
          ],
          'Yes, he can ride by himself.',
        ),
        wb(
          'How many dogs does Henry ride past?',
          [
            'He rides past one dog.',
            'He sees two dogs on his ride.',
            'Henry sees three dogs when he is riding his bike.',
          ],
          'He sees two dogs on his ride.',
        ),
      ],
    },
    {
      source: 'IT LAW p.14',
      title: SENTENCES,
      items: [
        write('Who does Henry wave to?', 'Henry waves to his mom.', { lines: 2 }),
        write('Why do you think Henry likes to ride his bike?', undefined, { lines: 2 }),
      ],
    },
    {
      source: 'IT LAW p.15',
      title: 'Label the settings from the story. Read about each picture and choose its label.',
      columns: 2,
      items: [
        label(
          "Henry's mom plants flowers by the front door. Henry sits on his bike on the path.",
          "Henry's House",
          SETTINGS,
        ),
        label('A boy rides a trike by a fence. A girl jumps rope.', 'The corner', SETTINGS),
        label('Two kids in helmets ride their bikes side by side.', 'The street', SETTINGS),
        label(
          'A child plays on a swing. A sign says "SLOW — CHILDREN PLAYING".',
          'The park',
          SETTINGS,
        ),
      ],
    },
    {
      source: 'IT LAW p.18',
      title: CIRCLES,
      items: [
        wb(
          'What does Henry see when he turns the corner?',
          [
            'He sees a hot dog stand.',
            'A line of people is around the corner.',
            'Henry sees a boy riding a trike.',
          ],
          'A line of people is around the corner.',
        ),
        wb(
          'Who has a shovel?',
          [
            'Henry has a shovel.',
            'There is a woman with a shovel.',
            'Henry sees a man with a shovel.',
          ],
          'Henry sees a man with a shovel.',
        ),
        wb(
          'What does a bulldozer do?',
          ['A bulldozer pushes dirt.', 'The bulldozer backs up.', 'Bulldozers dig the dirt.'],
          'A bulldozer pushes dirt.',
        ),
      ],
    },
    {
      source: 'IT LAW p.18',
      title: SENTENCES,
      items: [
        write(
          'What is the setting of the story?',
          "The setting is Henry's neighborhood: his house, the corner, the street, and the park.",
          { lines: 2 },
        ),
        write("If you had a day like Henry's, what would you do?", undefined, { lines: 2 }),
      ],
    },
    {
      source: 'IT LAW p.19',
      title: 'Make questions about the settings. Which question goes with this answer?',
      items: [
        choice('Answer: "Henry can ride around the block."', QUESTIONS[0], [
          QUESTIONS[1],
          QUESTIONS[2],
          QUESTIONS[3],
        ]),
        choice('Answer: "Henry can see a boy on a trike on the street."', QUESTIONS[1], [
          QUESTIONS[0],
          QUESTIONS[2],
          QUESTIONS[3],
        ]),
        choice('Answer: "Henry rides his bike down the street."', QUESTIONS[2], [
          QUESTIONS[0],
          QUESTIONS[1],
          QUESTIONS[3],
        ]),
        choice('Answer: "Henry stops to watch. The bulldozer pushes dirt."', QUESTIONS[3], [
          QUESTIONS[0],
          QUESTIONS[1],
          QUESTIONS[2],
        ]),
      ],
    },
    {
      source: 'myView p.89',
      title:
        'The setting is where and when a story takes place. What is the setting of Henry on Wheels? Look back at the text.',
      items: [
        write(
          'The setting of Henry on Wheels is ___',
          "Henry's neighborhood: his house, the block, the corner, the street, and the park.",
          { lines: 2 },
        ),
        write(
          'What details in the story help you describe the setting?',
          'Henry rides around the block. He turns the corner, rides down the street, sees a bulldozer, and goes to the park.',
          { lines: 2 },
        ),
      ],
    },
    {
      source: 'myView p.96',
      title:
        'Asking and answering questions about the setting helps you understand the text. Draw the answer to one of your questions about Henry on Wheels. Look back at the text.',
      items: [
        write('Write your question. Then draw the answer.', undefined, { lines: 1, draw: true }),
      ],
    },
  ],
})

export const makingMap = defineSection({
  id: 'map',
  title: 'Making a Map',
  subtitle: 'Find graphics · map key · predictions',
  emoji: '🧭',
  group: READING,
  readFirst: 'myView 1.1 p.186–203',
  links: [{ label: '🎧 Read-along video', url: 'https://youtu.be/14HhSe0-8-4' }],
  parts: [
    {
      source: 'IT LAW p.22',
      title: CIRCLES,
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
      title: SENTENCES,
      items: [
        write('What do you think you will add to your own map? (Name 3 places.)', undefined, {
          lines: 2,
        }),
        write('How do you think your friends will feel when they see your map? Why?', undefined, {
          lines: 2,
        }),
      ],
    },
    {
      source: 'IT LAW p.23',
      title: 'Draw labels to some of the places on the map. Places A, B, and C have no label.',
      aside: WorkbookMap,
      items: [
        write(
          'What could places A, B, and C be? Write a label for each one (like "A: Toy Store").',
          undefined,
          { lines: 3 },
        ),
      ],
    },
    {
      source: 'IT LAW p.23',
      title: 'Link the map to yourself. Answer in full sentences.',
      aside: WorkbookMap,
      items: [
        write('What are some places on the map that you have near your home?', undefined, {
          lines: 2,
        }),
      ],
    },
    {
      source: 'IT LAW p.26',
      title: CIRCLES,
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
      title: SENTENCES,
      items: [
        write('What colors would go on a map of your neighborhood?', undefined, { lines: 2 }),
        write('What do you think is the most important part of making a map?', undefined, {
          lines: 2,
        }),
      ],
    },
    {
      source: 'IT LAW p.27',
      title: 'Read the story. When there is a break, make a prediction.',
      items: [
        {
          kind: 'predict',
          before:
            'Lila wanted to take the dog for a walk in the park. She saw dark clouds in the sky as she walked to the park.',
          question: 'Prediction 1: What do you think the clouds will do in the story?',
          after:
            '"I think it\'s going to rain," she said. Soon, she felt a cool breeze, and drops of water started falling.',
        },
      ],
    },
    {
      source: 'IT LAW p.27',
      title: "Lila's story, continued. Make your second prediction.",
      items: [
        {
          kind: 'predict',
          before:
            '"I think it\'s going to rain," she said. Soon, she felt a cool breeze, and drops of water started falling.',
          question: 'Prediction 2: What do you think Lila will do next?',
          after:
            'Lila smiled and opened her umbrella. "I\'m glad I brought this!" she said. She took her dog for a walk in the park, in the rain.',
        },
      ],
    },
    {
      source: 'myView p.207',
      title:
        'Graphics, such as pictures, help readers find or learn information. Write the word that names each part of the map. Look back at the text.',
      aside: WorkbookMap,
      columns: 2,
      items: [
        choice('The square called "My home" is a ___.', 'house', ['park', 'street', 'pond']),
        choice('The green part called "Hillside Park" is a ___.', 'park', [
          'house',
          'street',
          'pond',
        ]),
        choice('The long road called "Elm Street" is a ___.', 'street', ['house', 'park', 'pond']),
        choice('The blue water called "Long Pond" is a ___.', 'pond', ['house', 'park', 'street']),
      ],
    },
    {
      source: 'myView p.214',
      title:
        'A prediction tells what you think will happen next. Think about your prediction. Look back at the text.',
      items: [
        write(
          'Draw what made you change your prediction. Was your prediction correct? Write Yes or No.',
          undefined,
          { lines: 1, draw: true },
        ),
      ],
    },
  ],
})
