import $ from '../utils'
import slide2left from '../utils/slide2left'
import bindMedia from '../utils/bindMedia'

const slideBtn = $('#slide-btn')
const aside = $('.sidebar')
const peer = $('.sidebar-peer')
const OPEN_CLASS = 'sidebar--open'

if (aside && slideBtn && peer) {
  const isHided = () => !aside.classList.contains(OPEN_CLASS)
  const state = {
    hided: isHided(),
    isNarrow: null,
  }
  aside.inert = state.hided
  bindMedia('(max-width: 799px)', mql => {
    state.isNarrow = mql.matches
  })
  const toggle = () => {
    aside.classList.toggle(OPEN_CLASS)
    state.hided = isHided()
    aside.inert = state.hided
    slideBtn.setAttribute('aria-pressed', !state.hided)
  }
  slideBtn.addEventListener('click', toggle)
  slide2left({
    toggle,
    touchArea: aside,
    enable: e => state.isNarrow && !slideBtn.contains(e.target),
    shouldHideWhenBlur: e => !state.hided && peer.contains(e.target),
  })
}
