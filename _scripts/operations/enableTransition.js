import ensureStyleSheetLoaded from '../utils/ensureStyleSheetLoaded'

const removeClass = className => {
  const node = document.querySelector(`.${className}`)
  if (node) {
    node.classList.remove(className)
  }
}

ensureStyleSheetLoaded(document.querySelector('#css-main', document.head)).then(
  () => {
    setTimeout(() => {
      removeClass('_disable-transition')
    })
  }
)
