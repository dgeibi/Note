import escapeRegexp from 'escape-string-regexp'
import fetch from 'unfetch'
import $ from '../utils'

let docs = null

function fetchDocs() {
  fetch('/docsmap.json')
    .then(r => r.json())
    .then((data) => {
      docs = data
    })
}

(() => {
  const CONTAINER_CLASSNAME = 'search-result-container'
  const searchInput = $('[data-search-input]')
  const searchResult = $('[data-search-result]')
  const suggestions = $('[data-suggestions]', searchResult)
  const resultNumberSpan = $('.count', searchResult)
  if (!searchInput) return

  const searchResultParent = searchResult.parentNode
  fetchDocs()
  const findMatches = function findMatches(regex, docsInfos) {
    return docsInfos.filter(
      info =>
        regex.test(info.title) ||
        info.types.reduce((whetherFind, type) => {
          if (whetherFind) return true
          if (regex.test(type)) return true
          return false
        }, false)
    )
  }

  const displayMatches = function displayMatches() {
    if (!this.value) {
      searchResultParent.classList.remove(CONTAINER_CLASSNAME)
      resultNumberSpan.innerHTML = 0
      suggestions.innerHTML = ''
      return
    }
    const regex = new RegExp(escapeRegexp(this.value), 'ig')
    const matchArray = findMatches(regex, docs)
    searchResultParent.classList.add(CONTAINER_CLASSNAME)
    const html = matchArray
      .map((doc) => {
        const title = doc.title.replace(regex, '<span class="hl">$&</span>')
        const types = doc.types.map(type => type.replace(regex, '<span class="hl">$&</span>'))
        return `
          <li class="search-item">
            <h3 class="search-item__title"><a href="${doc.address}">${title}</a></h3>
            <span class="search-item__types">${types.join(' > ')}</span>
          </li>
      `
      })
      .join('')
    resultNumberSpan.innerHTML = matchArray.length
    suggestions.innerHTML = html
  }

  searchInput.addEventListener('input', displayMatches)
  searchInput.addEventListener('change', displayMatches)
})()
