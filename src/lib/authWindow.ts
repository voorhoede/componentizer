type WindowArea = {
  width: number
  height: number
  left?: number
  top?: number
  close?: Function
}

function authWindow (url: string): Promise<string> {
  const windowArea: WindowArea = {
    width: 600,
    height: 800,
  };

  console.log(url)

  windowArea.left = Math.floor(window.screenX + ((window.outerWidth - windowArea.width) / 2));
  windowArea.top = Math.floor(window.screenY + ((window.outerHeight - windowArea.height) / 8));

  const sep = url.indexOf('?') !== -1 ? '&' : '?';
  const extendedUrl = `${url}${sep}`;

  const windowOpts = `toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0,
    width=${windowArea.width},height=${windowArea.height},
    left=${windowArea.left},top=${windowArea.top}`;

  const authWindow = window.open(extendedUrl, 'producthuntPopup', windowOpts);

  const authPromise = new Promise<string>((resolve, reject) => {
    window.addEventListener('message', e => {
      if (e.data) {
        resolve(e.data);

        if (authWindow) {
          authWindow.close();
        }
      } else {
        if (authWindow) {
          authWindow.close();
        }

        reject('Unauthorised');
      }
    }, false);
  });

  return authPromise
};

export default authWindow;
