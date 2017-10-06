import $ from '../utils'
import slide2left from '../utils/slide2left'
import bindMedia from '../utils/bindMedia'

const slideBtn = $('#slide-btn')
const aside = $('.sidebar')
const opener = $('.sidebar-opener')
const OPEN_KEY = 'sidebar-opener--open'

if (aside && slideBtn && opener) {
  const state = {
    hided: true,
    isNarrow: null,
  }
  aside.inert = state.hided

  bindMedia('(max-width: 799px)', (mql) => {
    state.isNarrow = mql.matches
  })

  const toggle = () => {
    opener.classList.toggle(OPEN_KEY)
    state.hided = !opener.classList.contains(OPEN_KEY)
    aside.inert = state.hided
    slideBtn.setAttribute('aria-pressed', !state.hided)
  }
  slideBtn.addEventListener('click', toggle)

  const enable = e => state.isNarrow && !slideBtn.contains(e.target)
  const shouldHideWhenBlur = () => !state.hided
  slide2left({
    touchArea: aside,
    enable,
    toggle,
    shouldHideWhenBlur,
  })
}
