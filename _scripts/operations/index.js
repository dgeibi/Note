import { isSWUpdateAvailable, assetHasUpdate } from './loadSW'
import './handleSlide'
import './addTableWrapper'
import './bindSearch'
import './openTreeItem'
import './enableTransition'
import Notify from '../components/Notify'

let showed

function showRefreshUI() {
  if (showed) return
  showed = true

  Notify(h => {
    const title = 'The page has updated'
    const message = h(
      'span',
      h(
        'a',
        {
          href: '#',
          onclick: e => {
            e.preventDefault()
            window.location.reload()
          },
        },
        'Reload the page'
      ),
      ' to use the new version.'
    )

    return {
      title,
      message,
      duration: 10000,
    }
  })
}

if (process.env.NODE_ENV === 'development') {
  window.showRefreshUI = showRefreshUI
}

isSWUpdateAvailable.then(available => {
  if (available) {
    showRefreshUI()
  }
})

const urlsAreSame = (a, b) => {
  const keys = ['origin', 'pathname', 'search']
  const aurl = new URL(a)
  const burl = new URL(b)
  return keys.every(x => aurl[x] === burl[x])
}

assetHasUpdate.then(({ updatedUrl }) => {
  if (urlsAreSame(window.location.href, updatedUrl)) {
    showRefreshUI()
  }
})
