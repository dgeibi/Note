import isStyleSheetLoaded from '../utils/isStyleSheetLoaded'

const removeClass = className => {
  const node = document.querySelector(`.${className}`)
  if (node) {
    node.classList.remove(className)
  }
}

isStyleSheetLoaded(document.querySelector('#css-main', document.head)).then(
  () => {
    removeClass('_disable-transition')
  }
)
