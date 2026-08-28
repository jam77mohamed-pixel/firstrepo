import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Spinner from '../ui/shared/Spinner'
import FailBox from '../ui/shared/FailBox'
import { useStore } from '../state/StoreContext'
import { useNotify } from '../state/NotifyContext'

const emptyForm = {
  title: '',
  brand: '',
  category: '',
  price: '',
  rating: '',
  stock: '',
  description: '',
}

const EditItemView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { busy, failMsg, refreshCatalog, findById, editItem } = useStore()
  const { pushNote } = useNotify()
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const item = findById(id)

  useEffect(() => {
    if (!item) return
    setForm({
      title: item.title || '',
      brand: item.brand || '',
      category: item.category || '',
      price: item.price ?? '',
      rating: item.rating ?? '',
      stock: item.stock ?? '',
      description: item.description || '',
    })
  }, [item])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await editItem(id, form)
      pushNote('Item updated with PUT payload', 'ok')
      setTimeout(() => navigate(`/item/${id}`), 700)
    } catch (err) {
      console.log(err)
      pushNote('Update failed', 'bad')
    } finally {
      setSaving(false)
    }
  }

  if (busy) return <Spinner />
  if (failMsg) return <FailBox message={failMsg} onRetry={refreshCatalog} />

  if (!item) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Cannot edit missing item</h1>
        <Link to="/" className="mt-5 inline-block rounded-md bg-teal-700 px-4 py-2 text-white">
          Catalog
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link to={`/item/${id}`} className="text-sm text-teal-700 hover:underline">
        ← Details
      </Link>

      <form onSubmit={onSubmit} className="mt-5 space-y-4 rounded-md border border-slate-200 bg-white p-5 shadow-sm md:p-7">
        <h1 className="text-2xl font-bold">Edit gadget</h1>
        <p className="text-sm text-slate-500">
          Saves via PUT request body (payload), then updates Context.
        </p>

        <Field label="Name" name="title" value={form.title} onChange={onChange} required />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Brand" name="brand" value={form.brand} onChange={onChange} />
          <Field label="Category" name="category" value={form.category} onChange={onChange} required />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Price" name="price" type="number" value={form.price} onChange={onChange} required />
          <Field label="Rating" name="rating" type="number" step="0.01" value={form.rating} onChange={onChange} required />
          <Field label="Stock" name="stock" type="number" value={form.stock} onChange={onChange} required />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows="4"
            required
            value={form.description}
            onChange={onChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-teal-600 focus:ring-2"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-teal-700 px-4 py-2 text-white hover:bg-teal-800 disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Update item'}
          </button>
          <Link
            to={`/item/${id}`}
            className="rounded-md border border-slate-300 px-4 py-2 text-center text-slate-700"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

const Field = ({ label, name, value, onChange, type = 'text', step, required }) => (
  <div>
    <label className="mb-1 block text-sm font-medium">{label}</label>
    <input
      name={name}
      type={type}
      step={step}
      required={required}
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-teal-600 focus:ring-2"
    />
  </div>
)

export default EditItemView
