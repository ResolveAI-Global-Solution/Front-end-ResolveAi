/** Pede ao navegador a localização real da pessoa (GPS ou Wi-Fi). O navegador pergunta antes. */
export function localizacaoAtual(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('Este navegador não informa a localização. Tente em outro navegador.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ latitude: coords.latitude, longitude: coords.longitude }),
      (erro) => {
        reject(new Error(erro.code === erro.PERMISSION_DENIED
          ? 'Permita o acesso à sua localização: só quem está a até 500 m do local pode apoiar.'
          : 'Não conseguimos pegar sua localização. Tente de novo.'))
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 },
    )
  })
}
