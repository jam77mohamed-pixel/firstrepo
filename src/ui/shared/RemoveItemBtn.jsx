import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../state/StoreContext'
import { useNotify } from '../../state/NotifyContext'

const RemoveItemBtn = ({ itemId, goHome }) => {
  const { deleteItem } = useStore()
  const { pushNote } = useNotify()
  const navigate = useNavigate()
  const [ask, setAsk] = useState(false)
  const [working, setWorking] = useState(false)

  const runDelete = async () => {
    setWorking(true)
    try {
      await deleteItem(itemId)
      pushNote('Item removed from catalog', 'ok')
      setAsk(false)
      if (goHome) navigate('/')
    } catch (err) {
      console.log(err)
      pushNote('Delete request failed', 'bad')
    } finally {
      setWorking(false)
    }
  }

  if (!ask) {
    return (
      <button
        type="button"
        onClick={() => setAsk(true)}
        className="rounded-md bg-orange-700 px-3 py-1.5 text-sm text-white hover:bg-orange-800"
      >
        Delete
      </button>
    )
  }

  return (
    <div className="rounded-md border border-orange-200 bg-orange-50 p-3">
      <p className="mb-2 text-sm text-orange-800">Remove this item?</p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={working}
          onClick={runDelete}
          className="rounded-md bg-orange-700 px-3 py-1.5 text-sm text-white disabled:opacity-60"
        >
          {working ? 'Removing...' : 'Confirm'}
        </button>
        <button
          type="button"
          disabled={working}
          onClick={() => setAsk(false)}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm"
        >
          Keep
        </button>
      </div>
    </div>
  )
}

export default RemoveItemBtn
