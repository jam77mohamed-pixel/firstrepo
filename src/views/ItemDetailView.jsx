import { Link, useParams } from 'react-router-dom'
import HeartBtn from '../ui/shared/HeartBtn'
import RemoveItemBtn from '../ui/shared/RemoveItemBtn'
import Spinner from '../ui/shared/Spinner'
import FailBox from '../ui/shared/FailBox'
import { useStore } from '../state/StoreContext'

const ItemDetailView = () => {
  const { id } = useParams()
  const { busy, failMsg, refreshCatalog, findById } = useStore()

  if (busy) return <Spinner />
  if (failMsg) return <FailBox message={failMsg} onRetry={refreshCatalog} />

  const item = findById(id)

  if (!item) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Item missing</h1>
        <p className="mt-2 text-slate-500">It is not in the current catalog list.</p>
        <Link to="/" className="mt-5 inline-block rounded-md bg-teal-700 px-4 py-2 text-white">
          Back to catalog
        </Link>
      </div>
    )
  }

  const imageSrc = item.images?.[0] || item.thumbnail
  const status = item.availabilityStatus || (item.stock > 0 ? 'In Stock' : 'Out of Stock')

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link to="/" className="text-sm text-teal-700 hover:underline">
        ← Catalog
      </Link>

      <div className="mt-5 grid gap-6 rounded-md border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">
        <div className="flex min-h-[260px] items-center justify-center rounded-md bg-slate-50 p-4">
          <img src={imageSrc} alt={item.title} className="max-h-80 object-contain" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{item.title}</h1>
          <p className="mt-2 text-slate-500">
            Brand: <span className="font-medium text-slate-800">{item.brand || 'N/A'}</span>
          </p>
          <p className="mt-1 capitalize text-slate-500">
            Category: <span className="font-medium text-slate-800">{item.category?.replaceAll('-', ' ')}</span>
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-teal-800">${item.price}</span>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-800">
              {item.discountPercentage ? `${item.discountPercentage}% off` : 'No offer'}
            </span>
            <span className="text-amber-600">{item.rating} ★</span>
          </div>

          <div className="mt-4 space-y-1 text-sm text-slate-600">
            <p>Stock: {item.stock}</p>
            <p>Availability: {status}</p>
          </div>

          <p className="mt-5 leading-relaxed text-slate-700">{item.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <HeartBtn item={item} />
            <Link
              to={`/item/${item.id}/edit`}
              className="rounded-md border border-teal-700 px-3 py-1.5 text-sm text-teal-800 hover:bg-teal-50"
            >
              Edit
            </Link>
            <RemoveItemBtn itemId={item.id} goHome />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetailView
