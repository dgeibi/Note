/* eslint-env serviceworker, browser */
/* eslint-disable no-console, quotes, comma-dangle, no-undef */

importScripts('/assets/js/sw-toolkit.js')

const ASSETS_CACHE = '__name__-v__version__'
const PAGES_CACHE = 'pages-v1.0.0' // change to force update
const expectedCaches = [ASSETS_CACHE, PAGES_CACHE]
const urlsToCache = __urls__

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(ASSETS_CACHE)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
      .then(self.skipWaiting())
  )
})

function matchPath(path) {
  return regExp => regExp.test(path)
}

self.addEventListener('fetch', (event) => {
  if (!shouldHandleFetch(event.request)) return
  const request = event.request
  const url = new URL(request.url)
  const match = matchPath(url.pathname)
  if (match(/sw\.js$/) || match(/sw-toolkit\.js$/)) return
  if (request.headers.get('accept').includes('text/html')) {
    respondFromNetworkThenCache(event, PAGES_CACHE)
  } else if (match(/^\/(css|fonts|js|assets)\/.*$/)) {
    respondFromCacheThenNetwork(event, ASSETS_CACHE)
  } else {
    respondFromNetworkThenCache(event, ASSETS_CACHE)
  }
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map((key) => {
          if (expectedCaches.includes(key)) return undefined
          return caches.delete(key)
        })
      )
    )
  )
})

function shouldHandleFetch(request) {
  const url = new URL(request.url)
  const should = request.method.toLowerCase() === 'get' && url.origin === location.origin
  return should
}
