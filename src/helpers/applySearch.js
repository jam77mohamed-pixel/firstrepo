export const applySearch = (list, query) => {
  const q = (query || '').trim().toLowerCase()
  if (!q) return list

  return list.filter((item) => {
    const titleOk = (item.title || '').toLowerCase().includes(q)
    const brandOk = (item.brand || '').toLowerCase().includes(q)
    return titleOk || brandOk
  })
}
