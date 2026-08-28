import { useNotify } from '../../state/NotifyContext'

const NotifyStack = () => {
  const { notes, dropNote } = useNotify()

  if (!notes.length) return null

  return (
    <div className="fixed bottom-5 left-1/2 z-[80] w-[92%] max-w-md -translate-x-1/2 space-y-2">
      {notes.map((note) => {
        const toneClass =
          note.tone === 'bad'
            ? 'bg-orange-700'
            : note.tone === 'info'
              ? 'bg-slate-700'
              : 'bg-teal-700'

        return (
          <div
            key={note.id}
            className={`${toneClass} text-white rounded-md px-4 py-3 shadow-lg flex justify-between gap-3`}
          >
            <span className="text-sm">{note.text}</span>
            <button type="button" onClick={() => dropNote(note.id)} className="opacity-80 hover:opacity-100">
              ×
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default NotifyStack
