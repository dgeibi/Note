import { context } from 'hyperscript'
import X from './x.svg'

export default opts => {
  const h = context()
  let params
  const t = typeof opts
  if (t === 'function') {
    params = opts(h)
    if (params === null || typeof params !== 'object') {
      throw Error('should return a object')
    }
  } else {
    if (opts === null || t !== 'object') {
      throw Error('should called with object or function')
    }
    params = opts
  }
  const { title, message, onClose, duration, clsPrefix } = params
  const prefix = typeof clsPrefix === 'string' ? clsPrefix : 'notify'
  const svg = document.createElement('span')
  svg.innerHTML = X
  let timer
  const close = () => {
    clearTimeout(timer)
    if (typeof onClose === 'function') onClose()
    document.body.removeChild(div) // eslint-disable-line
    h.cleanup()
  }

  const div = h(
    'div',
    {
      role: 'alert',
      className: prefix,
    },
    h('h4', { className: `${prefix}-title` }, title),
    h(
      'p',
      {
        className: `${prefix}-message`
      },
      message,
      h(
        'button',
        {
          className: `${prefix}-btn ${prefix}-btn-close`,
          type: 'button',
          title: 'Close',
          onclick: close,
        },
        svg
      )
    )
  )
  // div.addEventListener('click', handleClick)
  document.body.appendChild(div)
  timer = setTimeout(close, typeof duration === 'number' ? duration : 4500)
}
