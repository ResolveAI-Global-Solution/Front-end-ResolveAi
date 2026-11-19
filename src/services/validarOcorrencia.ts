import { categoriasRegistro, limitesRegistro, TAMANHO_MAXIMO_FOTO, TIPOS_FOTO } from '../data/registro'
import type { RegistroOcorrenciaErros, RegistroOcorrenciaForm } from '../types'

export function validarFoto(foto: File | null): string | undefined {
  if (!foto) return 'Adicione uma foto do problema.'
  if (!TIPOS_FOTO.includes(foto.type)) return 'Selecione uma foto em JPG, PNG ou WebP.'
  if (foto.size <= 0) return 'A foto está vazia. Selecione outro arquivo.'
  if (foto.size > TAMANHO_MAXIMO_FOTO) return 'A foto deve ter no máximo 5 MB.'
  return undefined
}

export function validarOcorrencia(dados: RegistroOcorrenciaForm): RegistroOcorrenciaErros {
  const erros: RegistroOcorrenciaErros = {}

  if (!categoriasRegistro.some(({ valor }) => valor === dados.categoria)) {
    erros.categoria = 'Selecione o tipo de problema.'
  }

  if (dados.descricao.trim().length < limitesRegistro.descricao.min) {
    erros.descricao = 'Descreva o problema com pelo menos 10 caracteres.'
  } else if (dados.descricao.trim().length > limitesRegistro.descricao.max) {
    erros.descricao = 'A descrição deve ter no máximo 280 caracteres.'
  }

  if (dados.endereco.trim().length < limitesRegistro.endereco.min) {
    erros.endereco = 'Informe a rua e o número ou ponto de referência.'
  } else if (dados.endereco.trim().length > limitesRegistro.endereco.max) {
    erros.endereco = `O endereço deve ter no máximo ${limitesRegistro.endereco.max} caracteres.`
  }

  if (dados.bairro.trim().length < limitesRegistro.bairro.min) {
    erros.bairro = 'Informe o bairro.'
  } else if (dados.bairro.trim().length > limitesRegistro.bairro.max) {
    erros.bairro = 'O bairro deve ter no máximo 80 caracteres.'
  }

  // A foto ainda não é enviada à API (evolução), então não é exigida no registro.
  // validarFoto continua aqui para o campo de foto, quando ele voltar.

  if (!dados.posicao
    || !Number.isFinite(dados.posicao.x)
    || !Number.isFinite(dados.posicao.y)
    || dados.posicao.x < 0 || dados.posicao.x > 100
    || dados.posicao.y < 0 || dados.posicao.y > 100) {
    erros.posicao = 'Marque uma posição válida no mapa.'
  }

  return erros
}
