import { useStore } from '../../state/StoreContext'

const HeartBtn = ({ item }) => {
  const { saveItem, unsaveItem, isSaved } = useStore()
  const active = isSaved(item.id)

  const onClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (active) unsaveItem(item.id)
    else saveItem(item)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'rounded-md bg-teal-700 px-3 py-1.5 text-sm text-white'
          : 'rounded-md border border-teal-700 px-3 py-1.5 text-sm text-teal-800 hover:bg-teal-50'
      }
    >
      {active ? 'Saved' : 'Save'}
    </button>
  )
}

export default HeartBtn
