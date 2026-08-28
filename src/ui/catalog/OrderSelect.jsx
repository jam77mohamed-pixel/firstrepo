import { useStore } from '../../state/StoreContext'

const OrderSelect = () => {
  const { order, setOrder } = useStore()

  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        Order
      </label>
      <select
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        className="w-full min-w-[180px] rounded-md border border-slate-300 bg-white px-3 py-2 outline-none ring-teal-600 focus:ring-2"
      >
        <option value="none">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="ratingDesc">Rating: High to Low</option>
        <option value="titleAsc">Name: A to Z</option>
        <option value="titleDesc">Name: Z to A</option>
      </select>
    </div>
  )
}

export default OrderSelect
