// Nesta versão não há login (evolução). O site age sempre como este morador de exemplo,
// que existe no banco da API (tb_usuario). Para trocar, basta mudar o id e o nome aqui.
export const USUARIO_DEMO = { id: 8, nome: 'Hugo Ferreira' }

// Quem registra pelo site é sempre o USUARIO_DEMO, e a API não deixa o autor apoiar a própria ocorrência.
// Por isso cada "Eu também vi" entra como um destes vizinhos de exemplo (também em tb_usuario),
// o primeiro que ainda não apoiou e não é o autor. Assim dá para testar o apoio em qualquer ocorrência.
export const VIZINHOS_DEMO = [
  { id: 1, nome: 'Ana Souza' },
  { id: 2, nome: 'Bruno Lima' },
  { id: 3, nome: 'Carla Mendes' },
  { id: 4, nome: 'Diego Alves' },
  { id: 5, nome: 'Elisa Rocha' },
  { id: 6, nome: 'Fabio Nunes' },
  { id: 7, nome: 'Gabriela Dias' },
]
