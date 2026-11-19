import { Outlet, useMatch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  const paginaMapa = useMatch('/mapa')
  const paginaRegistro = useMatch('/registrar')

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar amplo={!!paginaRegistro} />
      <main className={`flex-1 ${paginaRegistro ? 'bg-[#f7f7f9]' : ''}`}>
        <Outlet />
      </main>
      {!paginaMapa && <Footer amplo={!!paginaRegistro} />}
    </div>
  )
}
