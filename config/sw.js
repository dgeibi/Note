/* eslint-env serviceworker */
/* eslint-disable no-console */
importScripts('workbox-sw.prod.v2.0.3.js')

const workboxSW = new self.WorkboxSW({ clientsClaim: true, skipWaiting: true })
workboxSW.precache([])

// helpers start

const wrapHandler = (handler) => {
  if (typeof handler === 'function') return handler
  if (handler && typeof handler === 'object' && typeof handler.handle === 'function') {
    return input => handler.handle(input)
  }
  throw Error('fake handler')
}

// getMsg: info -> string
// throwTest: x -> boolean
const check = (getMsg, throwTest) => info => (x) => {
  const errMsg = getMsg(info)
  if (x === undefined || (throwTest && throwTest(x))) {
    console.error(errMsg)
    throw Error(errMsg)
  }
  return x
}

const checkResponse = check(
  ({ tag, url }) => `[SW]${tag ? ' ' : ''}${tag || ''}: fail to fetch ${url}`,
  response => !response.ok && response.status === 0
)

const withFallback = (url, handler) => {
  const callback = wrapHandler(handler)
  return input =>
    callback(input)
      .then(checkResponse({ url: input.event.request.url }))
      .catch(() => caches.match(url))
      .then(checkResponse({ url, tag: 'fallback' }))
}

const removeCaches = filter =>
  caches.keys().then(keys =>
    Promise.all(
      keys.map((key) => {
        if (filter(key)) return null
        return caches.delete(key)
      })
    )
  )

// helpers end

const SITE_PAGES = 'site-pages-v1'
const expecteds = [SITE_PAGES]

const pageBaseHandler = workboxSW.strategies.staleWhileRevalidate({
  cacheName: SITE_PAGES,
  cacheExpiration: {
    maxEntries: 20,
    maxAgeSeconds: 7 * 24 * 60 * 60,
  },
  cacheableResponse: {
    statuses: [0, 200],
  },
})

const rootRegex = /^\/[^/]*$/
workboxSW.router.registerRoute(
  ({ event, url }) => event.request.mode === 'navigate' && !rootRegex.test(url.pathname),
  withFallback(`${self.location.origin}/offline.html`, pageBaseHandler)
)

self.addEventListener('activate', (event) => {
  event.waitUntil(
    removeCaches(key => expecteds.includes(key) || /^workbox-precaching-revisioned-v1/.test(key))
  )
})
