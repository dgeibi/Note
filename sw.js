/* eslint-disable no-console, no-restricted-globals, no-restricted-syntax */ /* eslint-env serviceworker */ /* global workbox */
importScripts(`${self.__workbox_prefix__}/workbox-sw.js`)
workbox.setConfig({
  modulePathPrefix: self.__workbox_prefix__,
})
workbox.precaching.precacheAndRoute([])
workbox.skipWaiting()

// helpers start
// wrapHandler :: (Handler a) => a -> Function | any
const wrapHandler = handler => {
  if (typeof handler === 'function') return handler
  if (
    handler &&
    typeof handler === 'object' &&
    typeof handler.handle === 'function'
  ) {
    return input => handler.handle(input)
  }
  return handler
}

// createHandler :: (Handler a) => (..., a) -> a
const createHandlerFactory = createHandler =>
  function handler(...args) {
    args[args.length - 1] = wrapHandler(args[args.length - 1]) // eslint-disable-line
    return createHandler.call(this, ...args)
  }

// getMsg :: (Any info) => info -> String
// throwTest :: (Any x) => x -> Boolean
const check = (getMsg, throwTest) => info => x => {
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
      keys.map(key => {
        if (filter(key)) return null
        return caches.delete(key)
      })
    )
  )

const runTimeCacheNames = self.__runTimeCacheNames__

const expecteds = [].concat(
  Object.values(runTimeCacheNames),
  Object.values(workbox.core.cacheNames)
)

// remove old store
self.addEventListener('activate', event => {
  event.waitUntil(removeCaches(key => expecteds.includes(key)))
})

const responsesAreSame = (a, b, names) =>
  names.every(x => a.headers.get(x) === b.headers.get(x))

const checkPageUpdatePlugin = ({ headersToCheck }) => ({
  cacheDidUpdate: ({ cacheName, oldResponse, newResponse, request }) => {
    if (
      !oldResponse ||
      responsesAreSame(oldResponse, newResponse, headersToCheck)
    ) {
      return null
    }
    return self.clients
      .matchAll({
        type: 'window',
      })
      .then(clientList => {
        const updatedUrl = request.url
        clientList.forEach(client => {
          setTimeout(() => {
            client.postMessage({
              type: 'update',
              payload: { cacheName, updatedUrl },
            })
          }, 500)
        })
      })
  },
})
// helpers end

const pageBaseHandler = workbox.strategies.staleWhileRevalidate({
  cacheName: runTimeCacheNames.sitePages,
  plugins: [
    checkPageUpdatePlugin({
      headersToCheck: ['content-length', 'etag', 'last-modified'],
    }),
    new workbox.expiration.Plugin({
      maxEntries: 40,
      maxAgeSeconds: 7 * 24 * 60 * 60,
    }),
    new workbox.cacheableResponse.Plugin({
      statuses: [0, 200],
    }),
  ],
})

const rootRegex = /^\/[^/]*$/
workbox.routing.registerRoute(
  ({ event, url }) =>
    event.request.mode === 'navigate' && !rootRegex.test(url.pathname),
  withFallback(`${self.location.origin}/offline.html`, pageBaseHandler)
)

workbox.routing.registerRoute(
  /.*\.(png|jpg|jpeg|gif)/,
  workbox.strategies.cacheFirst({
    cacheName: runTimeCacheNames.images,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  })
)
