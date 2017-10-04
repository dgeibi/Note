/* eslint-env serviceworker */
/* eslint-disable no-console */
importScripts('workbox-sw.prod.v2.0.3.js')

const workboxSW = new self.WorkboxSW({ clientsClaim: true, skipWaiting: true })
workboxSW.precache([])

const pageNetworkFirst = workboxSW.strategies.networkFirst({
  networkTimeoutSeconds: 3,
  cacheName: 'site-pages',
  cacheExpiration: {
    maxEntries: 20,
    maxAgeSeconds: 7 * 24 * 60 * 60,
  },
  cacheableResponse: {
    statuses: [0, 200],
  },
})

const wrapHandler = (handler) => {
  if (typeof handler === 'function') return handler
  if (handler && typeof handler === 'object' && typeof handler.handle === 'function') {
    return input => handler.handle(input)
  }
  throw Error('fake handler')
}

// getMsg: info -> string
const check = getMsg => info => (x) => {
  const errMsg = getMsg(info)
  if (x === undefined) {
    console.error(errMsg)
    throw Error(errMsg)
  }
  return x
}

const checkResponse = check(
  ({ tag, url }) => `[SW]${tag ? ' ' : ''}${tag || ''}: cache(${url}) not found`
)

const withFallback = (url, handler) => {
  const callback = wrapHandler(handler)
  return input =>
    callback(input)
      .then(checkResponse({ url: input.event.request.url }))
      .catch(() => caches.match(url))
      .then(checkResponse({ url, tag: 'fallback' }))
}

const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k)

const withAliases = (aliases, handler) => {
  const callback = wrapHandler(handler)
  const origin = self.location.origin

  return (input) => {
    const url = input.url
    if (url.origin === origin && has(aliases, url.pathname)) {
      const aliasURL = origin + aliases[url.pathname]
      console.log(`[SW] alias: trying ${url.pathname} -> ${aliasURL}...`)
      return self.caches
        .match(aliasURL)
        .then(checkResponse({ url: aliasURL, tag: 'alias' }))
        .catch(() => callback(input))
    }
    return callback(input)
  }
}

const aliases = {
  '/': '/index.html',
}

workboxSW.router.registerRoute(
  ({ event, url }) => event.request.mode === 'navigate' && url.pathname !== '/index.html',
  withAliases(aliases, withFallback(`${self.location.origin}/index.html`, pageNetworkFirst))
)
