import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './routes/Home'
import Sobre from './routes/Sobre'
import Contato from './routes/Contato'
import Mapa from './routes/Mapa'
import Registrar from './routes/Registrar'
import Integrantes from './routes/Integrantes'
import Integrante from './routes/Integrante'
import Faq from './routes/Faq'
import Ocorrencia from './routes/Ocorrencia'
import Placar from './routes/Placar'
import Placeholder from './routes/Placeholder'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/mapa', element: <Mapa /> },
      { path: '/placar', element: <Placar /> },
      { path: '/sobre', element: <Sobre /> },
      { path: '/integrantes', element: <Integrantes /> },
      { path: '/integrantes/:id', element: <Integrante /> },
      { path: '/faq', element: <Faq /> },
      { path: '/contato', element: <Contato /> },
      { path: '/registrar', element: <Registrar /> },
      // Rota dinâmica (requisito 02): /ocorrencias/123
      { path: '/ocorrencias/:id', element: <Ocorrencia /> },
      { path: '*', element: <Placeholder titulo="Página não encontrada" /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
