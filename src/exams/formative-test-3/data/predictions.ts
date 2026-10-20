import { defineSection } from '../../../components/quiz/types'

export const predictions = defineSection({
  id: 'predict',
  title: 'Predictions',
  subtitle: 'Make, check, and correct predictions',
  emoji: '🔮',
  parts: [
    {
      title: 'Read the story. Make a prediction. Then read on to check it.',
      items: [
        {
          kind: 'predict',
          before: 'Ben took his kite to the park. The wind was strong.',
          question: 'What will happen to the kite?',
          options: ['It will fly up high.', 'It will go into a box.', 'It will turn into a bug.'],
          answer: 'It will fly up high.',
          after: 'Ben let go of the string. Up, up, up went the kite!',
        },
        {
          kind: 'predict',
          before: 'Up went the kite! Then the wind stopped.',
          question: 'What will the kite do next?',
          options: ['It will come down.', 'It will fly to the moon.', 'It will eat lunch.'],
          answer: 'It will come down.',
          after: 'The kite came down on the grass. Ben ran to get it.',
        },
        {
          kind: 'predict',
          before: 'Pam saw dark clouds in the sky. She felt a cool wind.',
          question: 'What will happen next?',
          options: ['It will rain.', 'It will be very hot.', 'It will snow candy.'],
          answer: 'It will rain.',
          after: 'Drip, drop! Rain fell on Pam\'s hat. She ran home.',
        },
      ],
    },
    {
      title: 'Read the story. Make a prediction. Then read on to check it.',
      items: [
        {
          kind: 'predict',
          before: 'Jen made a map of her street. She ran to her friend Kim\'s house with the map.',
          question: 'What will Jen do next?',
          options: ['Show the map to Kim.', 'Throw the map away.', 'Take a nap.'],
          answer: 'Show the map to Kim.',
          after: '"Look, Kim! I made a map!" said Jen.',
        },
        {
          kind: 'predict',
          before: 'Kim looked at the map. She saw her own house on it!',
          question: 'How will Kim feel?',
          options: ['Happy', 'Sad', 'Mad'],
          answer: 'Happy',
          after: 'Kim smiled. "I like your map, Jen!"',
        },
        {
          kind: 'predict',
          before: 'Dad wrote a list: milk, eggs, and bread. He got in the car.',
          question: 'Where is Dad going?',
          options: ['To the grocery store.', 'To the library.', 'To the pond.'],
          answer: 'To the grocery store.',
          after: 'Dad went to the grocery store. He came home with milk, eggs, and bread.',
        },
      ],
    },
    {
      title: 'Read the story. Make a prediction. Then read on to check it.',
      items: [
        {
          kind: 'predict',
          before: 'Mom could not find her key. She looked under the bed. She looked in the car.',
          question: 'Where will Mom find the key?',
          options: ['In her bag.', 'In the pond.', 'On the moon.'],
          answer: 'In her bag.',
          after: 'At last, Mom looked in her bag. There it was!',
        },
        {
          kind: 'predict',
          before: 'Sam\'s dog ran to the door with a ball in its mouth.',
          question: 'What does the dog want?',
          options: ['To play outside.', 'To take a bath.', 'To read a book.'],
          answer: 'To play outside.',
          after: 'Sam took the dog to the field. They played ball in the sun.',
        },
        {
          kind: 'predict',
          before: 'The class went to the library. Each kid got a library card.',
          question: 'What will the kids do next?',
          options: ['Borrow books.', 'Buy food.', 'Swim in the pond.'],
          answer: 'Borrow books.',
          after: 'The kids picked books to borrow. Tom got a book about maps.',
        },
      ],
    },
    {
      title: 'Read. Write your own prediction.',
      items: [
        {
          kind: 'write',
          prompt: 'Tom put on his hat. He picked up his map and his bag. What will Tom do next?',
          lines: 2,
        },
        {
          kind: 'write',
          prompt: 'Lily has paper and crayons. She wants to show her friends where she lives. What will Lily make?',
          lines: 2,
        },
      ],
    },
  ],
})
