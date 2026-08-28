import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

// pull two gadget categories and join them into one list
export const loadCatalog = async () => {
  const phoneRes = await api.get('/products/category/smartphones')
  const accessoryRes = await api.get('/products/category/mobile-accessories')

  const phones = phoneRes.data.products || []
  const accessories = accessoryRes.data.products || []

  return phones.concat(accessories)
}

// PUT with JSON body (request payload)
export const patchCatalogItem = async (id, payload) => {
  const res = await api.put(`/products/${id}`, payload)
  return res.data
}

// DELETE by path parameter
export const removeCatalogItem = async (id) => {
  const res = await api.delete(`/products/${id}`)
  return res.data
}

// POST with JSON payload to create a new item
export const createCatalogItem = async (payload) => {
  const res = await api.post('/products/add', payload)
  return res.data
}
