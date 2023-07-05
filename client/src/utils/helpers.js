export const filteredByCategory = (array, category) => {
  if (category === 'all') return array;

  return array.filter((item) => item.attributes.category === category);
};

export const getRandomNumber = (min, max) => {
  const range = max - min + 1;

  const randomNumber = Math.floor(Math.random() * range) + min;

  return randomNumber;
};

export const redirect = (num, id, callback) => {
  if (id === '20' && num > 0) return;
  if (id === '1' && num < 0) return;

  const currentId = Number(id);

  if (num > 0) {
    const newId = currentId + num;
    return callback(`/item/${newId}`);
  }

  const newId = currentId + num;
  return callback(`/item/${newId}`);
};
