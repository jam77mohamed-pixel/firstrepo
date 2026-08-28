import Banner from '../ui/catalog/Banner'
import FindBox from '../ui/catalog/FindBox'
import OrderSelect from '../ui/catalog/OrderSelect'
import FilterBar from '../ui/catalog/FilterBar'
import ItemGrid from '../ui/catalog/ItemGrid'
import Spinner from '../ui/shared/Spinner'
import FailBox from '../ui/shared/FailBox'
import { useStore } from '../state/StoreContext'

const CatalogView = () => {
  const { busy, failMsg, refreshCatalog, visible } = useStore()

  if (busy) return <Spinner />
  if (failMsg) return <FailBox message={failMsg} onRetry={refreshCatalog} />

  return (
    <div>
      <Banner />
      <div className="mx-auto max-w-6xl space-y-5 px-4 py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <FindBox />
          <OrderSelect />
        </div>

        <FilterBar />

        <p className="text-sm text-slate-500">{visible.length} gadgets showing</p>
        <ItemGrid />
      </div>
    </div>
  )
}

export default CatalogView
