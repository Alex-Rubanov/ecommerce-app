export const filteredByCategory = (array, category) => {
  if (category === 'all') return array;

  return array.filter((item) => item.attributes.category === category);
};

export const getRandomNumber = (min, max) => {
  if (max < 0) max = 0;
  const range = max - min + 1;

  const randomNumber = Math.floor(Math.random() * range) + min;

  return randomNumber;
};

export const redirect = (num, id, callback, maxId) => {
  if (id === maxId && num > 0) return;
  if (id === '1' && num < 0) return;

  const nextId = Number(id) + num;
  if (nextId > maxId) return;

  if (num > 0) {
    return callback(`/item/${nextId}`);
  }

  return callback(`/item/${nextId}`);
};
