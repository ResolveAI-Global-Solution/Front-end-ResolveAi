import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './routes/Home'
import Sobre from './routes/Sobre'
import Contato from './routes/Contato'
import Integrantes from './routes/Integrantes'
import Placeholder from './routes/Placeholder'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/mapa', element: <Placeholder titulo="Mapa" /> },
      { path: '/placar', element: <Placeholder titulo="Placar" /> },
      { path: '/sobre', element: <Sobre /> },
      { path: '/integrantes', element: <Integrantes /> },
      { path: '/faq', element: <Placeholder titulo="FAQ" /> },
      { path: '/contato', element: <Contato /> },
      { path: '/registrar', element: <Placeholder titulo="Registrar ocorrência" /> },
      // Rota dinâmica (requisito 02): /ocorrencias/123
      { path: '/ocorrencias/:id', element: <Placeholder titulo="Detalhe da ocorrência" /> },
      { path: '*', element: <Placeholder titulo="Página não encontrada" /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
