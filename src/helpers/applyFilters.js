export const applyFilters = (list, category, brand) => {
  let next = list

  if (category && category !== 'all') {
    next = next.filter((item) => item.category === category)
  }

  if (brand && brand !== 'all') {
    next = next.filter((item) => item.brand === brand)
  }

  return next
}
