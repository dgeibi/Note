import $ from '../utils'
import slide2left from '../utils/slide2left'

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

  if (!window.matchMedia) {
    body.classList.add('open-sidebar')
    aside.inert = false
    return
  }

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
