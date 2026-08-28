export const applySort = (list, order) => {
  const copy = [...list]

  switch (order) {
    case 'priceAsc':
      copy.sort((a, b) => a.price - b.price)
      break
    case 'priceDesc':
      copy.sort((a, b) => b.price - a.price)
      break
    case 'ratingDesc':
      copy.sort((a, b) => b.rating - a.rating)
      break
    case 'titleAsc':
      copy.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'titleDesc':
      copy.sort((a, b) => b.title.localeCompare(a.title))
      break
    default:
      break
  }

  return copy
}
