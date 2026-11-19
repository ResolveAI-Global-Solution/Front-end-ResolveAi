import type { RegistroOcorrenciaForm } from '../types'
import { validarOcorrencia } from './validarOcorrencia'

// Serviço demonstrativo: simula o envio sem publicar ou armazenar dados e fotos.
// Substituir a simulação por uma requisição quando a API de ocorrências estiver disponível.
export async function registrarOcorrencia(dados: RegistroOcorrenciaForm): Promise<void> {
  if (Object.keys(validarOcorrencia(dados)).length > 0) {
    throw new Error('Confira os campos da ocorrência antes de continuar.')
  }

  await new Promise((resolve) => setTimeout(resolve, 800))
}
