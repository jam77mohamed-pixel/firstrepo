import { createContext, useContext, useEffect, useState } from 'react'
import { loadCatalog, patchCatalogItem, removeCatalogItem, createCatalogItem } from '../api/catalogApi'
import { applySearch } from '../helpers/applySearch'
import { applyFilters } from '../helpers/applyFilters'
import { applySort } from '../helpers/applySort'
import { extractBrands, extractCategories } from '../helpers/extractOptions'

const StoreContext = createContext(null)

export const StoreProvider = ({ children }) => {
  const [catalog, setCatalog] = useState([])
  const [busy, setBusy] = useState(true)
  const [failMsg, setFailMsg] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [brand, setBrand] = useState('all')
  const [order, setOrder] = useState('none')
  const [saved, setSaved] = useState([])

  useEffect(() => {
    refreshCatalog()
  }, [])

  const refreshCatalog = async () => {
    setBusy(true)
    setFailMsg('')

    try {
      const data = await loadCatalog()
      setCatalog(data)
    } catch (err) {
      console.log('catalog load failed', err)
      setFailMsg('Unable to fetch gadgets right now.')
    } finally {
      setBusy(false)
    }
  }

  const findById = (id) => catalog.find((item) => item.id === Number(id))

  const saveItem = (item) => {
    setSaved((prev) => {
      const exists = prev.some((x) => x.id === item.id)
      if (exists) return prev
      return [...prev, item]
    })
  }

  const unsaveItem = (id) => {
    setSaved((prev) => prev.filter((x) => x.id !== Number(id)))
  }

  const isSaved = (id) => saved.some((x) => x.id === Number(id))

  const resetControls = () => {
    setQuery('')
    setCategory('all')
    setBrand('all')
    setOrder('none')
  }

  const editItem = async (id, formData) => {
    const payload = {
      title: formData.title,
      brand: formData.brand,
      category: formData.category,
      price: Number(formData.price),
      rating: Number(formData.rating),
      stock: Number(formData.stock),
      description: formData.description,
    }

    const apiResult = await patchCatalogItem(id, payload)
    const current = findById(id)

    const merged = {
      ...current,
      ...payload,
      id: Number(id),
      title: apiResult.title || payload.title,
      price: apiResult.price ?? payload.price,
    }

    setCatalog((prev) => prev.map((item) => (item.id === Number(id) ? { ...item, ...merged } : item)))
    setSaved((prev) => prev.map((item) => (item.id === Number(id) ? { ...item, ...merged } : item)))

    return merged
  }

  const deleteItem = async (id) => {
    try {
      await removeCatalogItem(id)
    } catch (err) {
      // DummyJSON POST items are not real server records, DELETE may 404.
      // Keep UI usable by removing from Context anyway.
      console.log('API delete failed, removing locally', err)
    }

    setCatalog((prev) => prev.filter((item) => item.id !== Number(id)))
    setSaved((prev) => prev.filter((item) => item.id !== Number(id)))
  }

  const addItem = async (formData) => {
    const imageUrl = (formData.imageUrl || '').trim()

    const payload = {
      title: formData.title,
      brand: formData.brand,
      category: formData.category,
      price: Number(formData.price),
      rating: Number(formData.rating),
      stock: Number(formData.stock),
      description: formData.description,
    }

    // image url is optional - only attach when provided
    if (imageUrl) {
      payload.thumbnail = imageUrl
      payload.images = [imageUrl]
    }

    const apiResult = await createCatalogItem(payload)

    const created = {
      ...payload,
      ...apiResult,
      id: apiResult.id || Date.now(),
      thumbnail: imageUrl || apiResult.thumbnail || '',
      images: imageUrl ? [imageUrl] : apiResult.images || [],
      availabilityStatus: Number(formData.stock) > 0 ? 'In Stock' : 'Out of Stock',
    }

    setCatalog((prev) => [created, ...prev])
    return created
  }

  let visible = applySearch(catalog, query)
  visible = applyFilters(visible, category, brand)
  visible = applySort(visible, order)

  const value = {
    catalog,
    busy,
    failMsg,
    query,
    setQuery,
    category,
    setCategory,
    brand,
    setBrand,
    order,
    setOrder,
    saved,
    categories: extractCategories(catalog),
    brands: extractBrands(catalog),
    visible,
    refreshCatalog,
    findById,
    saveItem,
    unsaveItem,
    isSaved,
    resetControls,
    editItem,
    deleteItem,
    addItem,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore needs StoreProvider')
  return ctx
}
