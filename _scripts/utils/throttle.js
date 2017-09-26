/**
 * 指定时间内，重复调用返回的函数仅执行一次
 * @param {function} func
 * @returns {function}
 */
function throttle(func, wait = 100, immediate = true) {
  let timeout
  return function throttled(...args) {
    const context = this
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    if (!timeout) {
      timeout = setTimeout(later, wait)
      if (immediate) func.apply(context, args)
    }
  }
}

export default throttle
