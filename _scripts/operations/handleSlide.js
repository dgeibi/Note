import $ from '../utils'
import slide2left from '../utils/slide2left'
import bindMedia from '../utils/bindMedia'

const aside = $('aside.sidebar')
const slideBtn = $('#slide-btn')
if (aside && slideBtn) {
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
    state.hided = !body.classList.contains('open-sidebar')
    aside.inert = state.hided
    slideBtn.setAttribute('aria-pressed', !state.hided)
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
}
