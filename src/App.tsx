import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/home/Home'
import Placeholder from './pages/Placeholder'
import Sobre from './pages/sobre/Sobre'
export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mapa" element={<Placeholder titulo="Mapa" />} />
          <Route path="/placar" element={<Placeholder titulo="Placar" />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/integrantes" element={<Placeholder titulo="Integrantes" />} />
          <Route path="/faq" element={<Placeholder titulo="FAQ" />} />
          <Route path="/contato" element={<Placeholder titulo="Contato" />} />
          <Route path="/registrar" element={<Placeholder titulo="Registrar ocorrência" />} />
          {/* Rota dinâmica (requisito 02): /ocorrencias/123 */}
          <Route path="/ocorrencias/:id" element={<Placeholder titulo="Detalhe da ocorrência" />} />
          <Route path="*" element={<Placeholder titulo="Página não encontrada" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}