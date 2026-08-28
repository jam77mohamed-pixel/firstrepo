import { Link, useNavigate } from 'react-router-dom'
import EmptyState from '../ui/shared/EmptyState'
import { useStore } from '../state/StoreContext'

const SavedItemsView = () => {
  const { saved, unsaveItem } = useStore()
  const navigate = useNavigate()

  if (!saved.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <EmptyState
          title="No saved gadgets"
          text="Use Save on a product card and it will appear here."
          actionLabel="Browse catalog"
          onAction={() => navigate('/')}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-5 text-2xl font-bold">Saved items ({saved.length})</h1>

      <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="hidden px-4 py-3 sm:table-cell">Brand</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {saved.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={item.thumbnail} alt="" className="h-12 w-12 object-contain" />
                    <div>
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <Link to={`/item/${item.id}`} className="text-teal-700 hover:underline">
                        View
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">{item.brand || '-'}</td>
                <td className="px-4 py-3 font-semibold">${item.price}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => unsaveItem(item.id)}
                    className="rounded-md bg-orange-700 px-3 py-1.5 text-white hover:bg-orange-800"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SavedItemsView
