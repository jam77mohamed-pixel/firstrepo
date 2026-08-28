import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../state/StoreContext'
import { useNotify } from '../state/NotifyContext'

const AddItemView = () => {
  const navigate = useNavigate()
  const { addItem } = useStore()
  const { pushNote } = useNotify()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    brand: '',
    category: 'smartphones',
    price: '',
    rating: '4.2',
    stock: '',
    description: '',
    imageUrl: '',
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const created = await addItem(form)
      pushNote('New gadget added via POST', 'ok')
      setTimeout(() => navigate(`/item/${created.id}`), 700)
    } catch (err) {
      console.log(err)
      pushNote('Add request failed', 'bad')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link to="/" className="text-sm text-teal-700 hover:underline">
        ← Catalog
      </Link>

      <form
        onSubmit={onSubmit}
        className="mt-5 space-y-4 rounded-md border border-slate-200 bg-white p-5 shadow-sm md:p-7"
      >
        <h1 className="text-2xl font-bold">Add gadget</h1>
        <p className="text-sm text-slate-500">
          Creates an item with POST payload (includes image URL), then updates Context.
        </p>

        <Field label="Name" name="title" value={form.title} onChange={onChange} required />

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Brand" name="brand" value={form.brand} onChange={onChange} required />
          <div>
            <label className="mb-1 block text-sm font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={onChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-teal-600 focus:ring-2"
            >
              <option value="smartphones">smartphones</option>
              <option value="mobile-accessories">mobile-accessories</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Price" name="price" type="number" value={form.price} onChange={onChange} required />
          <Field
            label="Rating"
            name="rating"
            type="number"
            step="0.01"
            value={form.rating}
            onChange={onChange}
            required
          />
          <Field label="Stock" name="stock" type="number" value={form.stock} onChange={onChange} required />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Image URL <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input
            name="imageUrl"
            type="url"
            placeholder="https://cdn.example.com/gadget.png"
            value={form.imageUrl}
            onChange={onChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-teal-600 focus:ring-2"
          />
          {form.imageUrl ? (
            <div className="mt-3 flex justify-center rounded-md border border-slate-200 bg-slate-50 p-3">
              <img
                src={form.imageUrl}
                alt="Preview"
                className="max-h-36 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          ) : null}
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
            {saving ? 'Adding...' : 'Add to catalog'}
          </button>
          <Link
            to="/"
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

export default AddItemView
