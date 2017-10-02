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
  const searchInput = $('.docs-search-input')
  const searchResult = $('.search-result')
  const suggestions = $('.suggestions', searchResult)
  const resultNumberSpan = $('.count', searchResult)
  if (!searchInput) return

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
    console.log('??')
    if (!this.value) {
      searchResult.classList.remove('open')
      resultNumberSpan.innerHTML = 0
      suggestions.innerHTML = ''
      return
    }
    const regex = new RegExp(escapeRegexp(this.value), 'ig')
    const matchArray = findMatches(regex, docs)
    searchResult.classList.add('open')
    const html = matchArray
      .map((doc) => {
        const title = doc.title.replace(regex, '<span class="hl">$&</span>')
        const types = doc.types.map(type => type.replace(regex, '<span class="hl">$&</span>'))
        return `
          <li>
            <h3 class="title"><a href="${doc.address}">${title}</a></h3>
            <span class="types">${types.join(' > ')}</span>
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
