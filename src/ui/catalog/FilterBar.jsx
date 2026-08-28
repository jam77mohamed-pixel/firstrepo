import { useStore } from '../../state/StoreContext'

const FilterBar = () => {
  const {
    categories,
    brands,
    category,
    setCategory,
    brand,
    setBrand,
    resetControls,
  } = useStore()

  return (
    <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800">Refine results</h2>
        <button
          type="button"
          onClick={resetControls}
          className="text-sm text-teal-700 hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Category</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory('all')}
              className={
                category === 'all'
                  ? 'rounded-full bg-teal-700 px-3 py-1 text-sm text-white'
                  : 'rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700'
              }
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={
                  category === c
                    ? 'rounded-full bg-teal-700 px-3 py-1 text-sm capitalize text-white'
                    : 'rounded-full bg-slate-100 px-3 py-1 text-sm capitalize text-slate-700'
                }
              >
                {c.replaceAll('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Brand</p>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2"
          >
            <option value="all">All brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
