import { Link } from 'react-router-dom'

const MissingView = () => (
  <div className="mx-auto max-w-md px-4 py-20 text-center">
    <p className="text-5xl font-bold text-teal-700">404</p>
    <h1 className="mt-3 text-2xl font-semibold">Page not found</h1>
    <p className="mt-2 text-slate-500">That route does not exist in GadgetBay.</p>
    <Link to="/" className="mt-6 inline-block rounded-md bg-slate-900 px-4 py-2 text-white">
      Go to catalog
    </Link>
  </div>
)

export default MissingView
