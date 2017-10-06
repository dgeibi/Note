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
    'webpack.config.js',
  ],
  publicExcludes: ['config/**'],
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
    swSrc: `${__dirname}/config/sw.js`,
    globPatterns: [
      '**/*.{png,jpg,gif,svg,eot,ttf,woff}',
      'assets/js/bootstrap.js',
      'assets/js/app-0.js',
      'assets/css/*.css',
      'index.html',
      'offline.html',
      '*.json',
    ],
  },
  suites: [
    'wikic-suite-docslist',
    'wikic-suite-docsmap',
    require('./config/suite-gensw'),
    require('./config/suite-htmlclean'),
  ],
}
