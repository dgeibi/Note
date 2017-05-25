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
  const state = {
    isHide: null,
    isNarrow: null,
    mode: null,
  };

  const presets = {
    narrow: {
      hideDefault: true,

      show() {
        aside.classList.remove('hide');
        aside.classList.add('narrow');
        return this;
      },

      hide() {
        aside.classList.add('hide');
        aside.classList.remove('narrow');
        return this;
      },
    },

    wide: {
      hideDefault: false,

      show() {
        body.classList.add('show-aside-left');
        aside.classList.remove('hide');
        return this;
      },

      hide() {
        body.classList.remove('show-aside-left');
        aside.classList.add('hide');
        return this;
      },
    },
  };

  const applyAside = (preset, hide) => {
    if (hide) {
      preset.hide();
    } else {
      preset.show();
    }
  };

  const media = window.matchMedia('(max-width: 799px)');

  const handleWidthChange = (mql) => {
    state.isNarrow = mql.matches;
    const currentMode = state.isNarrow ? 'narrow' : 'wide';
    const preset = presets[currentMode];

    if (!state.mode) {
      // init
      state.isHide = preset.hideDefault;
    }

    if (state.mode !== currentMode) {
      applyAside(preset, state.isHide);
    }

    state.mode = currentMode;
  };

  media.addListener(handleWidthChange);
  handleWidthChange(media);
  const toggle = () => {
    state.isHide = !state.isHide;
    applyAside(presets[state.mode], state.isHide);
  };

  slideBtn.addEventListener('click', toggle);

  // slide to left -> hide aside
  let startX = 0;

  aside.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (!state.isNarrow) return;
    startX = e.touches[0].clientX;
  });

  aside.addEventListener('touchend', (e) => {
    e.preventDefault();
    if (!state.isNarrow) return;
    const endX = e.changedTouches[0].clientX;
    const offsetX = endX - startX;
    if (offsetX < -40) {
      toggle();
    }
  });
}
