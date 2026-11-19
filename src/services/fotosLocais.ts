// As fotos ficam só neste navegador (IndexedDB): a API e o banco de dados não recebem nem guardam nenhuma.
// Servem para deixar as telas mais completas; se o armazenamento falhar, a ocorrência segue sem foto.

const NOME_BANCO = 'resolveai-fotos'
// Cada coleção guarda uma foto por ocorrência, com o id da ocorrência como chave.
// ocorrencias: foto do registro; apoios: foto de quem clicou em "Eu também vi".
// Ao criar coleção nova, suba a VERSAO para o navegador criá-la.
const COLECOES = ['ocorrencias', 'apoios'] as const
const VERSAO = 1

type Colecao = (typeof COLECOES)[number]

function abrirBanco(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('Armazenamento local indisponível.'))
      return
    }
    const pedido = indexedDB.open(NOME_BANCO, VERSAO)
    pedido.onupgradeneeded = () => {
      for (const colecao of COLECOES) {
        if (!pedido.result.objectStoreNames.contains(colecao)) pedido.result.createObjectStore(colecao)
      }
    }
    pedido.onsuccess = () => {
      pedido.result.onversionchange = () => pedido.result.close()
      resolve(pedido.result)
    }
    pedido.onerror = () => reject(pedido.error)
    pedido.onblocked = () => reject(new Error('Armazenamento local ocupado por outra aba.'))
  })
}

async function usarColecao<T>(
  colecao: Colecao,
  modo: IDBTransactionMode,
  acao: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const banco = await abrirBanco()
  try {
    return await new Promise<T>((resolve, reject) => {
      const transacao = banco.transaction(colecao, modo)
      const pedido = acao(transacao.objectStore(colecao))
      transacao.oncomplete = () => resolve(pedido.result)
      transacao.onabort = () => reject(transacao.error)
    })
  } finally {
    banco.close()
  }
}

/** Guarda a foto; devolve false se não conseguiu (sem espaço, modo anônimo etc.), sem lançar erro. */
export async function salvarFoto(colecao: Colecao, id: number, foto: Blob): Promise<boolean> {
  try {
    await usarColecao(colecao, 'readwrite', (store) => store.put(foto, id))
    return true
  } catch {
    return false
  }
}

export async function buscarFoto(colecao: Colecao, id: number): Promise<Blob | undefined> {
  try {
    const foto = await usarColecao<unknown>(colecao, 'readonly', (store) => store.get(id))
    return foto instanceof Blob ? foto : undefined
  } catch {
    return undefined
  }
}

/** Todas as fotos de uma coleção, por id da ocorrência. Usado na lista do mapa. */
export async function buscarFotos(colecao: Colecao): Promise<Map<number, Blob>> {
  const fotos = new Map<number, Blob>()
  try {
    const banco = await abrirBanco()
    try {
      await new Promise<void>((resolve, reject) => {
        const transacao = banco.transaction(colecao, 'readonly')
        const cursor = transacao.objectStore(colecao).openCursor()
        cursor.onsuccess = () => {
          const atual = cursor.result
          if (!atual) return
          if (typeof atual.key === 'number' && atual.value instanceof Blob) fotos.set(atual.key, atual.value)
          atual.continue()
        }
        transacao.oncomplete = () => resolve()
        transacao.onabort = () => reject(transacao.error)
      })
    } finally {
      banco.close()
    }
  } catch {
    // Sem armazenamento local, as ocorrências aparecem sem foto
  }
  return fotos
}
