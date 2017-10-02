import $ from '../utils'
import '../utils/treeLinks'

const types = location.pathname.split('/').slice(1, -1)
types.forEach((type) => {
  const target = $(`[data-type=${type}]`)
  if (target) {
    target.setAttribute('aria-expanded', true)
  }
})
