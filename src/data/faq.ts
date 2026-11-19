import type { PerguntaFaq } from '../types'

export const perguntas: PerguntaFaq[] = [
  {
    pergunta: 'O ResolveAI é de graça?',
    resposta:
      'Sim. Registrar, apoiar, acompanhar e ver o placar é gratuito. O app tem anúncios identificados; o Premium (R$ 9,90/mês) tira os anúncios e traz o relatório mensal dos bairros.',
  },
  {
    pergunta: 'Meu nome aparece para os vizinhos?',
    resposta: 'Não. O autor da ocorrência não aparece em público.',
  },
  {
    pergunta: 'Por que a foto precisa ser tirada no local?',
    resposta:
      'Para provar que o problema existe ali. A foto é conferida pelo GPS (até 30 m do ponto marcado) e pela hora do servidor, o que evita imagens antigas ou de outro lugar.',
  },
  {
    pergunta: 'Quem pode apoiar uma ocorrência?',
    resposta:
      'Quem está a até 500 m do local. Assim o apoio vem de vizinhos que realmente conhecem o problema, e cada "Eu também vi" dá mais força ao pedido.',
  },
  {
    pergunta: 'O Premium deixa meu pedido mais rápido?',
    resposta:
      'Não. O Premium só remove os anúncios e libera o relatório mensal. Não temos contrato com prefeituras e nenhuma assinatura muda a prioridade de uma ocorrência.',
  },
  {
    pergunta: 'E se for crime ou emergência?',
    resposta:
      'O ResolveAI não é canal de emergência. Ligue 190 para a Polícia Militar, 192 para o SAMU ou 193 para os Bombeiros.',
  },
  {
    pergunta: 'De onde vêm os dados do placar?',
    resposta:
      'Das ocorrências registradas no app e dos dados abertos do SP156, da Prefeitura de São Paulo. Com eles, o placar compara como cada subprefeitura responde.',
  },
]
