import smoothscroll from 'smoothscroll-polyfill'
import { $, $$ } from './$'
/* eslint-disable func-names,no-console */

smoothscroll.polyfill()

const hostname = location.pathname
const types = hostname.split('/').slice(1, -1)
types.forEach((type) => {
  $(`[data-type=${type}]`).checked = true
})

/* sw */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((reg) => {
      console.log(`Registration succeeded. Scope is ${reg.scope}`)
    })
    .catch((error) => {
      console.log(`Registration failed with ${error}`)
    })
}

/* add table-wrapper */
$$('.page-content>table').forEach((table) => {
  const div = document.createElement('div')
  const range = document.createRange()
  div.className = '_table-wrapper'
  range.selectNode(table)
  range.surroundContents(div)
})

const slideBtn = $('#slide-btn')
const aside = $('aside')
let lastPos = null
if (slideBtn) {
  slideBtn.addEventListener('click', () => {
    const hadSingle = aside.classList.contains('single')
    if (!hadSingle) {
      lastPos = window.pageYOffset
    }
    aside.classList.toggle('single')
    if (!hadSingle) {
      // now has 'single'
      const listTop = $(`[data-type=${types[0]}]`)
      if (listTop) {
        listTop.scrollIntoView({
          behavior: 'smooth',
        })
      }
    } else if (lastPos !== null) {
      window.scroll({ top: lastPos, left: 0, behavior: 'smooth' })
    }
  })
}
