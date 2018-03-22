const removeClass = className => {
  const node = document.querySelector(`.${className}`)
  if (node) {
    node.classList.remove(className)
  }
}

removeClass('_disable-transition')
