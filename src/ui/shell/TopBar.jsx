import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../../state/StoreContext'

const TopBar = () => {
  const { saved } = useStore()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-teal-900/10 bg-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold tracking-wide text-teal-300">
          GadgetBay
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-teal-300' : 'text-slate-200 hover:text-white')}>
            Catalog
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) => (isActive ? 'text-teal-300' : 'text-slate-200 hover:text-white')}
          >
            Add
          </NavLink>
          <NavLink
            to="/saved"
            className={({ isActive }) =>
              isActive ? 'text-teal-300' : 'text-slate-200 hover:text-white'
            }
          >
            Saved ({saved.length})
          </NavLink>
        </nav>

        <button type="button" className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? '×' : '≡'}
        </button>
      </div>

      {open && (
        <div className="space-y-2 border-t border-slate-700 px-4 py-3 md:hidden">
          <NavLink to="/" onClick={() => setOpen(false)} className="block text-slate-200">
            Catalog
          </NavLink>
          <NavLink to="/add" onClick={() => setOpen(false)} className="block text-slate-200">
            Add
          </NavLink>
          <NavLink to="/saved" onClick={() => setOpen(false)} className="block text-slate-200">
            Saved ({saved.length})
          </NavLink>
        </div>
      )}
    </header>
  )
}

export default TopBar
