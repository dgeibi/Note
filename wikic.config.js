/* eslint-disable global-require, no-console */
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
  ],
  publicExcludes: ['config/**', 'sw.js', '*.config.js'],
  toc: {
    selectors: '.page-content > h2, .page-content > h3',
    minLength: 3,
    header: '<header>IN THIS ARTICLE</header>',
    id: '#toc',
    anchorTemplate(id) {
      return `&nbsp;<a class="anchor" href="#${id}"></a>`
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
    globPatterns: [
      'assets/**/*.{png,jpg,gif,svg,eot,ttf,woff}',
      'assets/js/bootstrap.js',
      'assets/js/app-0.js',
      'assets/js/offline-page.js',
      'assets/css/*.css',
      'index.html',
      'offline.html',
      '*.json',
    ],
  },
  suites: [
    'wikic-suite-docslist',
    'wikic-suite-docsmap',
    './config/suite-gensw',
    './config/suite-htmlclean',
    './config/suite-imagemin',
  ],
  watchHandlers: {
    setupAndBuild: ['config/**', '**/wikic.config.js', '_notes/*.md', '**/_config.yml'],
    custom: {
      sw: {
        matcher: 'sw.js',
        handler: require('./config/suite-gensw').afterBuild,
      },
    },
  },
}
