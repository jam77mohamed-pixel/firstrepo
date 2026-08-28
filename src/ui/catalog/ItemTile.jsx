import { Link } from 'react-router-dom'
import HeartBtn from '../shared/HeartBtn'
import RemoveItemBtn from '../shared/RemoveItemBtn'

const ItemTile = ({ item }) => {
  const inStock = item.stock > 0

  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-44 items-center justify-center bg-slate-50 p-3">
        <img src={item.thumbnail} alt={item.title} className="max-h-full object-contain" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="min-h-[2.5rem] font-semibold text-slate-900 line-clamp-2">{item.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{item.brand || 'No brand'}</p>
        <p className="mt-1 text-xs capitalize text-teal-700">{item.category?.replaceAll('-', ' ')}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">${item.price}</span>
          <span className="text-sm text-amber-600">{item.rating} ★</span>
        </div>

        <p className={`mt-2 text-sm ${inStock ? 'text-teal-700' : 'text-orange-700'}`}>
          {inStock ? `Stock: ${item.stock}` : 'Out of stock'}
        </p>

        <div className="mt-auto flex flex-col gap-2 pt-4">
          <HeartBtn item={item} />
          <Link
            to={`/item/${item.id}`}
            className="rounded-md bg-slate-900 px-3 py-2 text-center text-sm text-white hover:bg-slate-800"
          >
            Open details
          </Link>
          <Link
            to={`/item/${item.id}/edit`}
            className="rounded-md border border-teal-700 px-3 py-2 text-center text-sm text-teal-800 hover:bg-teal-50"
          >
            Edit
          </Link>
          <RemoveItemBtn itemId={item.id} />
        </div>
      </div>
    </article>
  )
}

export default ItemTile
