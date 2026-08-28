const EmptyState = ({ title, text, actionLabel, onAction }) => (
  <div className="rounded-md border border-dashed border-slate-300 bg-white/70 p-10 text-center">
    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    <p className="mt-2 text-slate-500">{text}</p>
    {onAction && (
      <button
        type="button"
        onClick={onAction}
        className="mt-4 rounded-md bg-teal-700 px-4 py-2 text-white hover:bg-teal-800"
      >
        {actionLabel}
      </button>
    )}
  </div>
)

export default EmptyState
