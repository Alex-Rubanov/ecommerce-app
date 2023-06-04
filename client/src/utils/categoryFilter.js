export const categoryFilter = (array, category) => {
  if (category === 'all') return array

  return array.filter(item => item.attributes.category === category)
}
