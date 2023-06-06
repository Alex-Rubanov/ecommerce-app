export const filteredByCategory = (array, category) => {
  if (category === 'all') return array

  return array.filter(item => item.attributes.category === category)
}
