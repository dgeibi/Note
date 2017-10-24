if ('caches' in window) {
  (async () => {
    const cache = await window.caches.open('site-pages-v3')
    const keys = await cache.keys()
    const header = '<p>以下页面可离线浏览：</p>'
    if (keys.length > 0) {
      const map = await fetch('/docsmap.json').then(r => r.json())
      const html = keys.map(({ url }) => {
        const pathname = new URL(url).pathname
        const matched = map.filter(x => x.address === pathname)[0]
        if (matched) {
          const { title, types, address } = matched
          return `<li class="page-item"><h3 class="page-item__title"><a href="${address}">${title}</a></h3><span class="page-item__types">${types.join(' > ')}</span></li>`
        }
        return ''
      }).join('')
      document.querySelector('.page-content').insertAdjacentHTML('beforeend', `${header}<ul class="page-list">${html}</ul>`)
    }
  })()
}
