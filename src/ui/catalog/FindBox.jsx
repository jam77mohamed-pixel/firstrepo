import { useStore } from '../../state/StoreContext'

const FindBox = () => {
  const { query, setQuery } = useStore()

  return (
    <div className="flex-1">
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        Find
      </label>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type product name or brand"
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none ring-teal-600 focus:ring-2"
      />
    </div>
  )
}

export default FindBox
