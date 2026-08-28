import { Routes, Route } from 'react-router-dom'
import TopBar from './ui/shell/TopBar'
import SiteFooter from './ui/shell/SiteFooter'
import NotifyStack from './ui/shared/NotifyStack'
import CatalogView from './views/CatalogView'
import ItemDetailView from './views/ItemDetailView'
import EditItemView from './views/EditItemView'
import AddItemView from './views/AddItemView'
import SavedItemsView from './views/SavedItemsView'
import MissingView from './views/MissingView'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<CatalogView />} />
          <Route path="/add" element={<AddItemView />} />
          <Route path="/item/:id" element={<ItemDetailView />} />
          <Route path="/item/:id/edit" element={<EditItemView />} />
          <Route path="/saved" element={<SavedItemsView />} />
          <Route path="*" element={<MissingView />} />
        </Routes>
      </main>
      <SiteFooter />
      <NotifyStack />
    </div>
  )
}

export default App
