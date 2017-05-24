// vecka.14islands.com/service-worker.js
// https://github.com/14islands/vecka.14islands.com/blob/master/server/service-worker.js

function fetchFromCache(request) {
  return caches.match(request).then((response) => {
    if (response) {
      return response;
    }
    throw Error(`${request.url} not found in cache`);
  });
}

function putCache(request, response, key) {
  if (response.ok) {
    const copy = response.clone();
    caches.open(key).then((cache) => {
      cache.put(request, copy);
    });
  }
  return response;
}

function offlineResponse(request) {
  if (!request.headers.get('accept').includes('text/html')) return undefined;
  return caches.match('offline.html');
}

function respondFromCacheThenNetwork(event, key) {
  const request = event.request;
  event.respondWith(
    fetchFromCache(request)
      .catch(() => fetch(request.clone()))
      .then(response => putCache(request, response, key))
      .catch(() => offlineResponse(request))
  );
}

function respondFromNetworkThenCache(event, key) {
  const request = event.request;
  event.respondWith(
    fetch(request.clone())
      .then(response => putCache(request, response, key))
      .catch(() => fetchFromCache(request))
      .catch(() => offlineResponse(request))
  );
}
