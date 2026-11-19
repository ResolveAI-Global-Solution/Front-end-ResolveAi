import { useState } from 'react'
import { Flag } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { categorias } from '../../components/ocorrencia/config'
import StatusBadge from '../../components/ocorrencia/StatusBadge'
import useOcorrencia from '../../hooks/useOcorrencia'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { historicoDaOcorrencia } from '../../services/ocorrenciaService'
import NaoEncontrada from '../NaoEncontrada'
import FotosAntesDepois from './FotosAntesDepois'
import Historico from './Historico'
import PainelApoio from './PainelApoio'
import PrevisaoPrazo from './PrevisaoPrazo'

function dataCurta(iso?: string) {
  if (!iso) return ''
  const data = new Date(iso)
  return Number.isNaN(data.getTime())
    ? ''
    : data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'America/Sao_Paulo' })
}

export default function Ocorrencia() {
  // Rota dinâmica: /ocorrencias/:id, onde o id é o da ocorrência salva
  const { id } = useParams()
  const { ocorrencia, estado, tentarNovamente } = useOcorrencia(Number(id))
  const [denunciada, setDenunciada] = useState(false)

  useTituloPagina(
    estado === 'nao-encontrada' ? 'Ocorrência não encontrada' : ocorrencia ? ocorrencia.titulo : 'Detalhe da ocorrência',
  )

  if (estado === 'nao-encontrada') {
    return (
      <NaoEncontrada
        titulo="Ocorrência não encontrada"
        texto="Essa ocorrência não existe ou foi removida."
        voltarPara={{ para: '/mapa', rotulo: 'Ver mapa de ocorrências' }}
      />
    )
  }

  if (estado === 'erro') {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" role="alert">
        <h1 className="text-2xl font-semibold">Não foi possível carregar a ocorrência</h1>
        <button type="button" onClick={tentarNovamente} className="mt-4 min-h-11 rounded-lg px-3 py-2 font-semibold text-blue-700 hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand">
          Tentar novamente
        </button>
      </section>
    )
  }

  if (!ocorrencia) {
    return <p className="mx-auto max-w-6xl px-4 py-20 text-neutral-600 sm:px-6" role="status">Carregando ocorrência...</p>
  }

  const { label: nomeCategoria, Icone: IconeCategoria } = categorias[ocorrencia.categoria]
  const registradaEm = dataCurta(ocorrencia.criadoEm)

  return (
    <div className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-16 sm:px-6 lg:pb-20">
        <nav aria-label="Trilha de navegação" className="flex items-center gap-2 text-sm">
          <Link to={`/mapa?ocorrencia=${ocorrencia.id}`} className="font-semibold text-brand hover:underline">Mapa</Link>
          <span className="text-neutral-500" aria-hidden>/</span>
          <span className="text-neutral-500" aria-current="page">Ocorrência #{ocorrencia.id}</span>
        </nav>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="flex min-w-0 flex-col gap-6">
            <FotosAntesDepois ocorrencia={ocorrencia} />

            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={ocorrencia.status} />
                <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700">
                  <IconeCategoria size={16} aria-hidden /> {nomeCategoria}
                </span>
              </div>
              <h1 className="break-words text-3xl font-semibold sm:text-4xl">{ocorrencia.titulo}</h1>
              <p className="text-neutral-500">
                {ocorrencia.endereco} · {ocorrencia.bairro} · {registradaEm ? `registrada em ${registradaEm}` : `registrada ${ocorrencia.tempo}`}
              </p>
              {ocorrencia.descricao && ocorrencia.descricao !== ocorrencia.titulo && (
                <p className="break-words text-neutral-700">{ocorrencia.descricao}</p>
              )}
            </div>

            <Historico eventos={historicoDaOcorrencia(ocorrencia)} ocorrencia={ocorrencia} />
          </div>

          <aside className="flex flex-col gap-4" aria-label="Ações e previsão">
            {/* key: ao trocar de ocorrência, o painel recomeça com o estado de apoio dela */}
            <PainelApoio key={ocorrencia.id} ocorrencia={ocorrencia} />
            {ocorrencia.status !== 'resolvida' && <PrevisaoPrazo />}
            {denunciada ? (
              <p role="status" className="text-sm text-neutral-600">Denúncia enviada. A publicação será analisada.</p>
            ) : (
              <button
                type="button"
                onClick={() => setDenunciada(true)}
                className="inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg px-2 text-sm font-semibold text-neutral-500 hover:text-neutral-700 focus-visible:outline-2 focus-visible:outline-brand"
              >
                <Flag size={16} aria-hidden /> Denunciar publicação
              </button>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
