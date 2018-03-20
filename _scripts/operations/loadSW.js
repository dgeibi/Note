/* eslint-disable no-console */
export const isSWUpdateAvailable = new Promise(resolve => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => {
        console.log(`Registration succeeded. Scope is ${reg.scope}`)
        reg.addEventListener('updatefound', () => {
          const installingWorker = reg.installing
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                resolve(true)
              } else {
                resolve(false)
              }
            }
          }
        })
      })
      .catch(error => {
        console.error(`Registration failed with ${error}`)
      })
  }
})

export const assetHasUpdate = new Promise((resolve) => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    const update = event => {
      if (event.data.type === 'update') {
        resolve(event.data.payload)
        navigator.serviceWorker.removeEventListener('message', update)
      }
    }
    navigator.serviceWorker.addEventListener('message', update)
  }
})
