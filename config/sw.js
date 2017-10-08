/* eslint-env serviceworker */
/* eslint-disable no-console */
importScripts('workbox-sw.prod.js')

const workboxSW = new self.WorkboxSW({ clientsClaim: true, skipWaiting: true })
workboxSW.precache([])

// helpers start

// wrapHandler :: (Handler a) => a -> Function | any
const wrapHandler = (handler) => {
  if (typeof handler === 'function') return handler
  if (handler && typeof handler === 'object' && typeof handler.handle === 'function') {
    return input => handler.handle(input)
  }
  return handler
}

// createHandler :: (Handler a) => (..., a) -> a
const createHandlerFactory = createHandler => (...args) => {
  args[args.length - 1] = wrapHandler(args[args.length - 1]) // eslint-disable-line
  return createHandler.call(this, ...args)
}

// getMsg :: (Any info) => info -> String
// throwTest :: (Any x) => x -> Boolean
const check = (getMsg, throwTest) => info => (x) => {
  const errMsg = getMsg(info)
  if (throwTest(x)) {
    console.error(errMsg)
    throw Error(errMsg)
  }
  return x
}

const checkResponse = check(
  ({ tag, url }) => `[SW]${tag ? ' ' : ''}${tag || ''}: fail to fetch ${url}`,
  response => response === undefined || (!response.ok && response.status === 0)
)

// withFallback :: (Handler a) => (String, a) -> a
const withFallback = createHandlerFactory((url, handler) => input =>
  handler(input)
    .then(checkResponse({ url: input.event.request.url }))
    .catch(() => caches.match(url))
    .then(checkResponse({ url, tag: 'fallback' }))
)

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

const SITE_PAGES = 'site-pages-v3'
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
