import queryString from 'query-string'

type WindowArea = {
  width: number
  height: number
  left?: number
  top?: number
  close?: Function
}

function authWindow (url: string) {
  const windowArea: WindowArea = {
    width: 600,
    height: 840,
  };

  windowArea.left = Math.floor(window.screenX + ((window.outerWidth - windowArea.width) / 2));
  windowArea.top = Math.floor(window.screenY + ((window.outerHeight - windowArea.height) / 8));

  const sep = url.indexOf('?') !== -1 ? '&' : '?';
  const extendedUrl = `${url}${sep}`;

  const windowOpts = `toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0,
    width=${windowArea.width},height=${windowArea.height},
    left=${windowArea.left},top=${windowArea.top}`;

  const authWindow = window.open(extendedUrl, 'producthuntPopup', windowOpts);

  const authPromise = new Promise<string>((resolve, reject) => {
    if (authWindow) {
      const interval = setInterval(() => {
        try {
          if (authWindow.location.search) {
            const params: { code?: string } = queryString.parse(authWindow.location.search)

            if (params.code) {
              resolve(params.code)
            } else {
              reject('no code found')
            }

            authWindow.close()
            clearInterval(interval)
          }
        } catch {}
      }, 100)
    }
  });

  return authPromise
}

export default authWindow