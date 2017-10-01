import $ from '../utils'
import slide2left from './slide2left'

// check types according to pathname
const types = location.pathname.split('/').slice(1, -1)
types.forEach((type) => {
  const target = $(`[data-type=${type}]`)
  if (target) {
    target.setAttribute('aria-expanded', true)
  }
})

/**
 * @param {string} query
 * @param {Function} handleMediaChange
 */
function bindMedia(query, handleMediaChange) {
  const media = window.matchMedia(query)
  media.addListener(handleMediaChange)
  handleMediaChange(media)
  return media
}

(() => {
  const aside = $('aside.sidebar')
  const slideBtn = $('#slide-btn')
  if (!aside || !slideBtn) return
  const body = document.body
  const state = {
    hided: true,
    isNarrow: null,
  }
  aside.inert = state.hided

  bindMedia('(max-width: 799px)', (mql) => {
    state.isNarrow = mql.matches
  })

  const toggle = () => {
    body.classList.toggle('open-sidebar')
    state.hided = !state.hided
    aside.inert = state.hided
  }

  slideBtn.addEventListener('click', toggle)

  const enable = () => state.isNarrow
  const shouldHideWhenBlur = () => !state.hided
  slide2left({
    touchArea: aside,
    enable,
    toggle,
    shouldHideWhenBlur,
  })
})()
