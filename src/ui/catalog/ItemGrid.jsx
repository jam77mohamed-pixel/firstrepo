import { useStore } from '../../state/StoreContext'
import EmptyState from '../shared/EmptyState'
import ItemTile from './ItemTile'

const ItemGrid = () => {
  const { visible, resetControls } = useStore()

  if (!visible.length) {
    return (
      <EmptyState
        title="Nothing matched"
        text="Change the search text or filters and try again."
        actionLabel="Reset filters"
        onAction={resetControls}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map((item) => (
        <ItemTile key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ItemGrid
