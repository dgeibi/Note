import $ from '../utils';
import slide2left from './slide2left';

// check types according to pathname
const types = location.pathname.split('/').slice(1, -1);
types.forEach((type) => {
  const target = $(`[data-type=${type}]`);
  if (target) {
    target.checked = true;
  }
});

// do something with aside and slideBtn
((aside, slideBtn) => {
  if (!aside || !slideBtn) return;
  const body = document.body;

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
        return this;
      },

      hide() {
        aside.classList.add('hide');
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

  // use media-query to detect width change
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
  const media = window.matchMedia('(max-width: 799px)');
  media.addListener(handleWidthChange);
  handleWidthChange(media);

  // add listener to slideBtn
  const toggle = () => {
    state.isHide = !state.isHide;
    applyAside(presets[state.mode], state.isHide);
  };
  slideBtn.addEventListener('click', toggle);

  // apply slide2left gesture
  slide2left(
    {
      touchArea: aside,
      get test() {
        return state.isNarrow;
      },
      get isHide() {
        return state.isHide;
      },
    },
    toggle
  );
})($('aside'), $('#slide-btn'));
