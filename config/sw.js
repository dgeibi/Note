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

const withFallback = (url, handler) => input =>
  handler.handle(input).then((x) => {
    if (x !== undefined) return x
    console.error(`[SW] cache for ${input.event.request.url} not found`)
    return caches.match(url).catch(() => {
      throw Error(`[SW] fallback cache(${url}) not found`)
    })
  })

workboxSW.router.registerRoute(
  ({ event }) => event.request.mode === 'navigate',
  withFallback(`${self.location.origin}/index.html`, pageNetworkFirst)
)
