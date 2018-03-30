/* eslint-disable global-require, no-console */
const PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  title: 'Wikic',
  port: 4511,
  server: 'wikic-live-server',
  excludes: [
    'README.md',
    'package-lock.json',
    'yarn.lock',
    'LICENSE',
    'package.json',
    'gulpfile.js',
    '.debug.log',
  ],
  publicExcludes: ['config/**', 'sw.js', '*.config.js'],
  toc: {
    selectors: '.page-content > h2, .page-content > h3',
    minLength: 3,
    header: '<header>IN THIS ARTICLE</header>',
    id: '#toc',
    anchorTemplate(id) {
      return `&nbsp;<a class="anchor" href="#${id}">#</a>`
    },
  },
  typeMap: {
    css: 'CSS',
    frontend: 'FrontEnd',
    webapi: 'Web API',
    html: 'HTML',
    ecmascript: 'ECMAScript',
    oop: '面向对象',
    '.': 'Home',
  },
  page: {
    layout: 'page',
    toc: true,
  },
  docslist: {
    enable: true,
    listTemplate: require('./config/listTemplate'),
  },
  docsmap: {
    enable: true,
    output: 'docsmap.json',
  },
  logger: {
    file: 'error',
  },
  workbox: {
    swSrc: `${__dirname}/sw.js`,
    define: {
      // defaults: replace `self.__workbox_prefix__` to `workbox-vx.x.x` relative to `swDist`
      'self.__runTimeCacheNames__': require('./config/runTimeCacheNames'),
    },
    globPatterns: [
      'assets/js/*.js',
      'assets/css/*.css',
      'index.html',
      'offline.html',
      '*.json',
    ],
  },
  suites: [
    'wikic-suite-docslist',
    'wikic-suite-docsmap',
    PRODUCTION && './config/suite-gensw',
    './config/suite-htmlclean',
    './config/suite-imagemin',
  ].filter(Boolean),
  watchHandlers: {
    setupAndBuild: [
      'config/**',
      '**/wikic.config.js',
      '_notes/*.md',
      '**/_config.yml',
    ],
  },
}
