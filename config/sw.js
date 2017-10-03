/* eslint-env serviceworker */
importScripts('workbox-sw.prod.v2.0.3.js')

const workboxSW = new self.WorkboxSW({ clientsClaim: true, skipWaiting: true })
workboxSW.precache([])

workboxSW.router.registerRoute(
  /.+\.html/,
  workboxSW.strategies.networkFirst({
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
)
