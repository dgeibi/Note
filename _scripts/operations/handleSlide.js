import $ from '../utils';

const hostname = location.pathname;
const body = document.body;

// check type
const types = hostname.split('/').slice(1, -1);
types.forEach((type) => {
  const target = $(`[data-type=${type}]`);
  if (target) {
    target.checked = true;
  }
});

const slideBtn = $('#slide-btn');
const aside = $('aside');

if (aside && slideBtn) {
  let hide;
  let small;
  const resetForSmall = () => {
    body.classList.remove('show-aside-left');
  };

  const resetForWide = () => {
    aside.classList.remove('single');
  };

  const showAsideLeft = () => {
    body.classList.add('show-aside-left');
    aside.classList.remove('hide');
  };

  const hideAsideLeft = () => {
    body.classList.remove('show-aside-left');
    aside.classList.add('hide');
  };

  const hideSingleAside = () => {
    aside.classList.add('hide');
    aside.classList.remove('single');
  };

  const showSingleAside = () => {
    aside.classList.remove('hide');
    aside.classList.add('single');
  };

  const toggleAsideNotSmall = () => {
    // toggle hide
    if (hide) {
      hideAsideLeft();
    } else {
      showAsideLeft();
    }
  };

  const toggleAsideIfSmall = () => {
    if (hide) {
      hideSingleAside();
    } else {
      showSingleAside();
    }
  };

  const handleResize = (event) => {
    const init = !event;
    small = window.matchMedia('(max-width: 799px)').matches;

    if (init) {
      // hide if small default
      hide = small;
    }

    if (small) {
      resetForSmall();
      toggleAsideIfSmall();
    } else {
      resetForWide();
      toggleAsideNotSmall();
    }
  };

  handleResize();
  window.addEventListener('resize', $.throttle(handleResize, 100));

  slideBtn.addEventListener('click', () => {
    hide = !hide;
    if (small) {
      toggleAsideIfSmall();
    } else {
      toggleAsideNotSmall();
    }
  });
}
