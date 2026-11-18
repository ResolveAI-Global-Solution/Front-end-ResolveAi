import type { ContatoForm } from '../types'

// Camada de serviço: toda a comunicação do formulário de contato fica aqui.
// Por enquanto simula o envio. Quando o endpoint da API Java existir,
// troque o corpo da função pelo fetch comentado abaixo.
export async function enviarContato(dados: ContatoForm): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  console.log('Contato enviado:', dados)

  // const resposta = await fetch(`${API_URL}/contatos`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(dados),
  // })
  // if (!resposta.ok) throw new Error('Falha ao enviar a mensagem')
}