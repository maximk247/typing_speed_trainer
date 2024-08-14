import { Faker, ru } from '@faker-js/faker';

const faker = new Faker({ locale: ru });

export const generateRandomWords = (numWords) => {
  const words = [];
  for (let i = 0; i < numWords; i++) {
    words.push(faker.lorem.word(i));
  }
  return words;
};
