const Spinner = () => (
  <div className="py-24 flex flex-col items-center gap-3 text-slate-600">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-200 border-t-teal-700" />
    <p>Fetching gadgets...</p>
  </div>
)

export default Spinner
