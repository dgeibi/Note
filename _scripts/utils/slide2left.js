function slide2left(options) {
  let startX = 0
  const { toggle } = options
  window.addEventListener('touchstart', e => {
    if (!options.enable(e)) return
    startX = e.touches[0].clientX
  })

  window.addEventListener('touchend', e => {
    if (!options.enable(e)) return
    const target = e.target
    if (startX && options.touchArea.contains(target)) {
      const endX = e.changedTouches[0].clientX
      const offsetX = endX - startX
      if (offsetX < -95) {
        toggle()
      }
    }
    startX = null
  })

  window.addEventListener('mousedown', e => {
    if (!options.enable(e)) return
    const target = e.target
    if (options.shouldHideWhenBlur(e) && !options.touchArea.contains(target)) {
      toggle()
    }
  })
}

export default slide2left
