import escapeRegexp from 'escape-string-regexp'
import fetch from 'unfetch'
import $ from '../utils'

const fetchJSON = url => fetch(url).then(r => r.json())

const bindSearch = (docs, view, methods) => {
  const { searchInput, resultNumberSpan, suggestionsEl } = view
  const { open, close, findMatches, generateHTML } = methods

  const showSearchResult = (e) => {
    const { value } = e.target
    if (!value) {
      if (close) close()
      return
    }

    const regex = new RegExp(escapeRegexp(value), 'ig')
    const matches = findMatches(regex, docs)

    suggestionsEl.innerHTML = generateHTML(regex, matches)
    resultNumberSpan.textContent = matches.length

    if (open) open()
  }

  searchInput.addEventListener('input', showSearchResult)
}

const searchResultEl = $('[data-search-result]')
const searchResultParent = searchResultEl.parentNode
const CONTAINER_CLASSNAME = 'search-result-container'

const view = {
  searchInput: $('[data-search-input]'),
  suggestionsEl: $('[data-suggestions]', searchResultEl),
  resultNumberSpan: $('.count', searchResultEl),
}

const methods = {
  close() {
    searchResultParent.classList.remove(CONTAINER_CLASSNAME)
  },

  open() {
    searchResultParent.classList.add(CONTAINER_CLASSNAME)
  },

  findMatches(regex, docs) {
    return docs.filter(info => regex.test(info.title) || info.types.some(type => regex.test(type)))
  },

  generateHTML(regex, matches) {
    const replacer = x => x.replace(regex, '<span class="hl">$&</span>')
    return matches
      .map(
        ({ title, types, address }) => `
          <li class="search-item">
            <h3 class="search-item__title"><a href="${address}">${replacer(title)}</a></h3>
            <span class="search-item__types">${types.map(replacer).join(' > ')}</span>
          </li>
      `
      )
      .join('')
  },
}

fetchJSON('/docsmap.json').then(docs => bindSearch(docs, view, methods))
