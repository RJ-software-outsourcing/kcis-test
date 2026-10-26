import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem } from '../../../components/quiz/types'
import { choice, write } from '../helpers'

const READING = '📖 Reading — read the story in myView first'

/** LAW p.18: sort a word into Headings or Labels (always in that order). */
const sort = (word: string, answer: 'Heading' | 'Label'): ChoiceItem => ({
  kind: 'choice',
  prompt: `Is "${word}" a heading or a label?`,
  options: ['Heading', 'Label'],
  keepOrder: true,
  answer,
})

export const gardenParty = defineSection({
  id: 'garden',
  title: 'Garden Party',
  subtitle: 'Reading comprehension · visualize details · realistic fiction',
  emoji: '🌱',
  group: READING,
  readFirst: 'myView 1.1 p.142–143, 149–165',
  links: [{ label: '🎧 Read-along video', url: 'https://youtu.be/nmicnpRJX-s' }],
  parts: [
    {
      source: 'LT LAW p.6',
      title: 'Color the circle next to the most correct answer.',
      items: [
        choice('How does Jamal describe the garden?', 'Jamal says, "It\'s so big."', [
          'He calls the garden empty.',
          'He describes the garden as small but beautiful.',
        ]),
        choice('Who will help plant the garden?', 'Their neighbors will help.', [
          "Jamal's school friends will help.",
          'No one can help. They will do all the work.',
        ]),
        choice(
          'Who did they ask to help first?',
          'First, they went to the tall apartment building on State Street.',
          [
            'They went to the red brick houses near the park first.',
            'They went to all the little stores on Main Street.',
          ],
        ),
      ],
    },
    {
      source: 'LT LAW p.6',
      title: 'Answer the questions in complete sentences.',
      items: [
        write(
          'How did the neighbors help Jamal and his mom and dad?',
          'The neighbors helped them dig, plant, and water the garden.',
          { lines: 2 },
        ),
        write('How can you help your neighbors?', undefined, { lines: 2 }),
      ],
    },
    {
      source: 'LT LAW p.10',
      title: 'Draw two things the neighbors did to help the garden grow.',
      columns: 2,
      items: [
        write('Thing 1', undefined, { lines: 0, draw: true }),
        write('Thing 2', undefined, { lines: 0, draw: true }),
      ],
    },
    {
      source: 'LT LAW p.10',
      title: 'Describe how the neighbors helped in the garden. (Write a full sentence.)',
      items: [
        write(
          'How did the neighbors help in the garden?',
          'The neighbors dug, planted seeds, and watered the plants.',
          { lines: 2 },
        ),
      ],
    },
    {
      source: 'myView p.142',
      title: 'Spotlight on Genre: Realistic Fiction. Choose the best answer.',
      columns: 2,
      items: [
        choice('___ are the people in realistic fiction.', 'Characters', ['Details', 'Pictures']),
        choice('___ describe characters and the reasons for their actions.', 'Details', [
          'Characters',
        ]),
        choice('Your purpose for reading is your ___ for reading.', 'reason', ['picture']),
        choice('Your purpose could be to learn or to ___ .', 'have fun', ['be quiet']),
        choice('What kind of story is Garden Party?', 'realistic fiction', ['informational text']),
      ],
    },
    {
      source: 'myView p.143',
      title: 'Realistic Fiction Anchor Chart. Choose the best answer.',
      columns: 2,
      items: [
        choice('Character details come from the words and the ___ .', 'pictures', ['headings']),
        choice('Pam jumps up and down. "YES!" Pam said. How does Pam feel?', 'Pam is happy!', [
          'Pam is sad.',
          'Pam is scared.',
        ]),
      ],
    },
    {
      source: 'myView p.178',
      title: 'Visualize Details: How do you picture the neighbors in Garden Party?',
      items: [
        write('Draw the picture you see in your mind. Look back at the text.', undefined, {
          lines: 0,
          draw: true,
        }),
      ],
    },
  ],
})

export const clickClack = defineSection({
  id: 'click',
  title: 'Click, Clack, Click!',
  subtitle: 'Reading comprehension · describe characters',
  emoji: '🎶',
  group: READING,
  readFirst: 'myView 1.1 p.149–165',
  links: [{ label: '🎧 Read-along video', url: 'https://youtu.be/cyp7iSVBnig' }],
  parts: [
    {
      source: 'LT LAW p.9',
      title: 'Color the circle next to the most correct answer.',
      items: [
        choice(
          'Why do Amena and her mom go to the Community Center?',
          'They just moved here and want to meet friends.',
          [
            'They go to buy food and drinks.',
            'Amena and her mom go to play games with each other.',
          ],
        ),
        choice('How do you play the pieces of wood?', 'You clink the pieces of wood together.', [
          'You beat on them.',
          'You move the beads on the pieces of wood.',
        ]),
        choice(
          'Which instrument is Gabriel playing?',
          'The instrument Gabriel is playing is a gourd.',
          ['Gabriel is playing the pieces of wood.', 'He is playing a wooden box.'],
        ),
      ],
    },
    {
      source: 'LT LAW p.9',
      title: 'Answer the questions in complete sentences.',
      items: [
        write(
          'What instrument will Amena play in the neighborhood band?',
          'Amena will play a jar.',
          { lines: 2 },
        ),
        write('What musical instrument would you like to play?', undefined, { lines: 2 }),
      ],
    },
    {
      source: 'LT LAW p.11',
      title: 'Who are the main characters in each story?',
      items: [
        choice('Who is the main character of Garden Party?', 'Jamal', ['Amena', 'Gabriel']),
        choice('Who is the main character of Click, Clack, Click!?', 'Amena', ['Jamal', 'Gabriel']),
      ],
    },
    {
      source: 'LT LAW p.11',
      title: 'Compare and contrast the characters.',
      items: [
        write(
          'How are Jamal and Amena alike?',
          'Jamal and Amena both get to know their neighbors, and they are both happy at the end.',
          { lines: 2 },
        ),
        write(
          'How are Jamal and Amena different?',
          'Jamal works with his neighbors to plant a garden. Amena is new and plays music in a band at the Community Center.',
          { lines: 2 },
        ),
      ],
    },
    {
      source: 'myView p.171',
      title:
        'Describe Characters: Draw to compare and contrast how Jamal and Amena act. Look back at the texts.',
      items: [
        write(
          'Alike: How do Jamal and Amena act the same?',
          'Both meet new people in their neighborhood. Both are happy at the end.',
          { draw: true },
        ),
        write(
          'Different: How do Jamal and Amena act differently?',
          'Jamal plants a garden with his neighbors. Amena plays music in a band at the Community Center.',
          { draw: true },
        ),
      ],
    },
  ],
})

export const lookBothWays = defineSection({
  id: 'look',
  title: 'Look Both Ways!',
  subtitle: 'Reading comprehension · text features · text evidence',
  emoji: '🚸',
  group: READING,
  readFirst: 'myView 1.1 p.104–105, 111–121',
  links: [{ label: '🎧 Read-along video', url: 'https://youtu.be/xDdoJtIryjw' }],
  parts: [
    {
      source: 'LT LAW p.14',
      title: 'Color the circle next to the most correct answer.',
      items: [
        choice('What do lines on the street tell you?', 'Lines show you a safe place to cross.', [
          'On the street the lines show you where not to walk.',
          'Lines on the street show where crossing guards stand.',
        ]),
        choice('What must you do before crossing the street?', 'First, look both ways!', [
          'Walk slowly so cars can see you.',
          "Run across quickly so cars can't hit you.",
        ]),
        choice(
          'Who tells you when it is safe to cross the road?',
          'A crossing guard tells you when it is safe.',
          [
            'It is always safe to cross the road.',
            'Only a police officer can tell you it is safe to cross the road.',
          ],
        ),
      ],
    },
    {
      source: 'LT LAW p.14',
      title: 'Answer the questions in complete sentences.',
      items: [
        write(
          'Where is a good place to cross the street?',
          'A crosswalk is a good place to cross the street.',
          { lines: 2 },
        ),
        write('Does your school have a crossing guard? (If yes, say hello tomorrow!)', undefined, {
          lines: 2,
        }),
      ],
    },
    {
      source: 'LT LAW p.17',
      title: 'Color the circle next to the most correct answer.',
      items: [
        choice(
          'What does a green person tell you to do at a crosswalk?',
          'Walk when the picture shows a person.',
          [
            'A green person tells you to wait.',
            'The green person is a crossing guard and they tell you to stop.',
          ],
        ),
        choice('Where can you find lots of traffic?', 'There is lots of traffic on the road.', [
          'You can find traffic in a swimming pool.',
          'There is always more traffic at the top of a mountain.',
        ]),
        choice(
          'How can you always walk safely when you cross the road?',
          'You must look left, look right, and look left again.',
          [
            'Always wait for a crossing guard to tell you to stop.',
            'Never cross the road if there is traffic, even at a crosswalk.',
          ],
        ),
      ],
    },
    {
      source: 'LT LAW p.17',
      title: 'Answer the questions in complete sentences.',
      items: [
        write('What color are the lines of the crosswalks near your school?', undefined, {
          lines: 2,
        }),
        write(
          'Why is crossing safety important?',
          'Crossing safety is important because it keeps us safe from cars.',
          { lines: 2 },
        ),
      ],
    },
    {
      source: 'LT LAW p.18',
      title: 'Sort the headings and the labels.',
      columns: 2,
      items: [
        sort('Crosswalk', 'Label'),
        sort('Crossing Guards', 'Heading'),
        sort('Walk', 'Label'),
        sort('Safety', 'Heading'),
        sort('Lines', 'Heading'),
        sort('Pictures', 'Heading'),
        sort('Wait', 'Label'),
        sort('Traffic', 'Label'),
      ],
    },
    {
      source: 'LT LAW p.18',
      title: 'Answer the question.',
      items: [
        write(
          'What can you learn from a heading or a label?',
          'A heading tells what a section is about. A label tells what a picture shows.',
          { lines: 2 },
        ),
      ],
    },
    {
      source: 'LT LAW p.19',
      title: 'Draw an important thing that helps you cross the road safely.',
      items: [
        write(
          'How does the thing in your picture help you cross the road safely? (Write a full sentence.)',
          'For example: The walk signal shows a person when it is safe to walk. / The crossing guard tells me when it is safe to cross. / The crosswalk lines show me a safe place to cross.',
          { lines: 2, draw: true },
        ),
      ],
    },
    {
      source: 'myView p.104',
      title: 'Informational Text. Choose the best answer.',
      columns: 2,
      items: [
        choice('An informational text tells ___ about real people, things, or events.', 'facts', [
          'made-up stories',
        ]),
        choice('An informational text may have text features, such as ___ .', 'headings', [
          'characters',
        ]),
        choice('In "Neighborhoods", the word PLACES is a ___ .', 'heading', ['label']),
        choice('In "Neighborhoods", where do people buy food?', 'at a market', ['at a school']),
      ],
    },
    {
      source: 'myView p.104',
      title: 'Turn and Talk',
      items: [
        write(
          'What makes informational text different from realistic fiction?',
          'Informational text tells facts about real people, things, or events. Realistic fiction is a made-up story with characters that could be real.',
          { lines: 2 },
        ),
      ],
    },
    {
      source: 'myView p.105',
      title: 'Informational Text Anchor Chart. Choose the best answer.',
      columns: 2,
      items: [
        choice('A heading tells what a ___ is about.', 'section', ['picture']),
        choice('A heading helps you ___ information.', 'find', ['draw']),
      ],
    },
    {
      source: 'myView p.127',
      title: 'Find Text Features: What can you learn from the text features in Look Both Ways!?',
      items: [
        write(
          'Label: What did you learn from a label?',
          'The label "crosswalk" shows a safe place to cross the street.',
          { lines: 2 },
        ),
        write(
          'Heading: What did you learn from a heading?',
          'The heading "Crossing Guards" tells me this part is about people who help us cross.',
          { lines: 2 },
        ),
      ],
    },
    {
      source: 'myView p.134',
      title: 'Use Text Evidence: Draw the details that support the heading Crossing Guards.',
      items: [
        write('Look back at the text. Use the pictures too.', undefined, { lines: 0, draw: true }),
      ],
    },
  ],
})
