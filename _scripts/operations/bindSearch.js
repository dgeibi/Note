import escapeRegexp from 'escape-string-regexp'
import fetch from 'unfetch'
import $ from '../utils'

const fetchDocs = () => fetch('/docsmap.json').then(r => r.json())

const findMatches = (regex, docsInfos) =>
  docsInfos.filter(info => regex.test(info.title) || info.types.some(type => regex.test(type)))

const bindSearch = async () => {
  const CONTAINER_CLASSNAME = 'search-result-container'
  const searchInput = $('[data-search-input]')
  const searchResult = $('[data-search-result]')
  const suggestions = $('[data-suggestions]', searchResult)
  const resultNumberSpan = $('.count', searchResult)
  if (!searchInput || !searchResult) return

  const searchResultParent = searchResult.parentNode
  const docs = await fetchDocs()

  const displayMatches = function displayMatches() {
    if (!this.value) {
      searchResultParent.classList.remove(CONTAINER_CLASSNAME)
      return
    }
    const regex = new RegExp(escapeRegexp(this.value), 'ig')
    const matchArray = findMatches(regex, docs)
    searchResultParent.classList.add(CONTAINER_CLASSNAME)
    const highlightString = '<span class="hl">$&</span>'
    const replacer = x => x.replace(regex, highlightString)
    const html = matchArray
      .map(
        ({ title, types, address }) => `
          <li class="search-item">
            <h3 class="search-item__title"><a href="${address}">${replacer(title)}</a></h3>
            <span class="search-item__types">${types.map(replacer).join(' > ')}</span>
          </li>
      `
      )
      .join('')
    resultNumberSpan.innerHTML = matchArray.length
    suggestions.innerHTML = html
  }

  searchInput.addEventListener('input', displayMatches)
}

bindSearch()
