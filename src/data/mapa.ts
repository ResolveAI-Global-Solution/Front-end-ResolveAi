import type { OcorrenciaMapa } from '../types'

// Dados demonstrativos do protótipo, até a integração com a API.
export const bairroMapa = 'Vila Mariana'

export const ocorrencias: OcorrenciaMapa[] = [
  {
    id: 1,
    titulo: 'Buraco grande na faixa da direita',
    endereco: 'Rua Vergueiro, 1200',
    bairro: bairroMapa,
    categoria: 'buraco',
    status: 'confirmada',
    apoios: 12,
    tempo: 'há 3 dias',
    posicao: { x: 50, y: 34 },
  },
  {
    id: 2,
    titulo: 'Poste apagado há uma semana',
    endereco: 'R. Domingos de Morais, 300',
    bairro: bairroMapa,
    categoria: 'iluminacao',
    status: 'aberta',
    apoios: 4,
    tempo: 'há 1 dia',
    posicao: { x: 33.3, y: 60.5 },
  },
  {
    id: 3,
    titulo: 'Rua alaga com qualquer chuva',
    endereco: 'R. França Pinto, 80',
    bairro: bairroMapa,
    categoria: 'alagamento',
    status: 'reaberta',
    apoios: 31,
    tempo: 'há 2 meses',
    posicao: { x: 58.3, y: 77.5 },
  },
  {
    id: 4,
    titulo: 'Buraco próximo à praça',
    endereco: 'R. Joaquim Távora, 500',
    bairro: bairroMapa,
    categoria: 'buraco',
    status: 'aberta',
    apoios: 6,
    tempo: 'há 2 dias',
    posicao: { x: 14.5, y: 24.5 },
  },
  {
    id: 5,
    titulo: 'Iluminação da rua restabelecida',
    endereco: 'R. Humberto I, 400',
    bairro: bairroMapa,
    categoria: 'iluminacao',
    status: 'resolvida',
    apoios: 9,
    tempo: 'há 5 dias',
    posicao: { x: 81.2, y: 53.5 },
  },
]
