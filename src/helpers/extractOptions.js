export const extractCategories = (list) => {
  const values = list.map((item) => item.category).filter(Boolean)
  return [...new Set(values)]
}

export const extractBrands = (list) => {
  const values = list.map((item) => item.brand).filter(Boolean)
  return [...new Set(values)]
}
