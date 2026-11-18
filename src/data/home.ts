import type { Estatistica, NavLinkItem, Ods, Passo, PlacarItem } from '../types'

export const links: NavLinkItem[] = [
  { label: 'Início', to: '/' },
  { label: 'Mapa', to: '/mapa' },
  { label: 'Placar', to: '/placar' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Integrantes', to: '/integrantes' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contato', to: '/contato' },
]

export const estatisticas: Estatistica[] = [
  { valor: '33 dias', descricao: 'de espera média por serviços de calçada no SP156, contra 5 dias típicos do canal.', fonte: 'Câmara Municipal de SP, ago/2026' },
  { valor: '≈ 1,9 mi', descricao: 'de solicitações por ano no SP156. O pedido é individual e quase ninguém vê o resultado.', fonte: 'Prefeitura de SP, dados de 2022' },
  { valor: '99%', descricao: 'dos usuários de internet do Brasil acessam pelo celular. O app nasce leve.', fonte: 'TIC Domicílios 2025' },
]

export const passos: Passo[] = [
  { icone: 'pin', titulo: 'Registrar', descricao: 'Descreva o problema, marque o local e tire a foto no local.' },
  { icone: 'eye', titulo: 'Apoiar', descricao: 'Vizinhos tocam em "Eu também vi". Mais apoio, mais força.' },
  { icone: 'clock', titulo: 'Acompanhar', descricao: 'Avisos de status, previsão de prazo por IA e a foto do depois.' },
  { icone: 'chart', titulo: 'Comparar', descricao: 'O placar mostra como cada região responde, com dados abertos.' },
]

export const placar: PlacarItem[] = [
  { posicao: 1, nome: 'Pinheiros', resolvidoPct: 82, diasMedia: 8, porMilHab: 3.1 },
  { posicao: 2, nome: 'Vila Mariana', resolvidoPct: 78, diasMedia: 9, porMilHab: 4.2 },
  { posicao: 3, nome: 'Lapa', resolvidoPct: 71, diasMedia: 12, porMilHab: 3.8 },
]

export const ods: Ods[] = [
  { numero: 11, titulo: 'Cidades e comunidades sustentáveis', descricao: 'Metas 11.3 e 11.7: gestão participativa e espaços públicos seguros e inclusivos.' },
  { numero: 10, titulo: 'Redução das desigualdades', descricao: 'Meta 10.2: app gratuito, leve e com a mesma voz para moradores de qualquer bairro.' },
]