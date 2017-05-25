function slide2left(options, toggle) {
  let startX = 0;
  window.addEventListener('touchstart', (e) => {
    if (!options.test) return;
    startX = e.touches[0].clientX;
  });

  window.addEventListener('touchend', (e) => {
    if (!options.test) return;
    const target = e.target;
    if (options.touchArea.contains(target)) {
      const endX = e.changedTouches[0].clientX;
      const offsetX = endX - startX;
      if (offsetX < -40) {
        toggle();
      }
    }
  });

  window.addEventListener('mousedown', (e) => {
    if (!options.test) return;
    const target = e.target;
    if (!options.touchArea.contains(target) && !options.isHide) {
      toggle();
    }
  });
}

export default slide2left;
