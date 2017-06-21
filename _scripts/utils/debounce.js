/**
 * - 指定时间内，重复调用返回的函数不会执行
 * - From https://javascript30.com/
 * @param {function} func
 */
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function debounced(...args) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export default debounce;
