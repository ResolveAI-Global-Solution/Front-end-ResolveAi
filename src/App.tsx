import { Outlet, useMatch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  const paginaMapa = useMatch('/mapa')

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {!paginaMapa && <Footer />}
    </div>
  )
}
