/* eslint-disable global-require, no-console */
const htmlclean = require('htmlclean');

module.exports = {
  title: 'Wikic',
  port: 4511,
  excludes: [
    'README.md',
    'yarn.lock',
    'LICENSE',
    'package.json',
    'gulpfile.js',
    'webpack.config.js',
  ],
  toc: {
    selectors: '.page-content > h2, .page-content > h3',
    minLength: 3,
    header: '<header>IN THIS ARTICLE</header>',
    id: '#toc',
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
    listTemplate: {
      headerTemplate({ level, index, typeName, typeSlug }) {
        return `<label for="${level}-${index}">${typeName}</label><input type="checkbox" id="${level}-${index}" data-type="${typeSlug}">`;
      },
    },
  },
  docsmap: {
    enable: true,
    output: 'docsmap.json',
  },
  logger: {
    file: 'error',
  },
  suites: [
    'wikic-suite-docslist',
    'wikic-suite-docsmap',
    {
      beforeWrite(context) {
        if (!context.data) return context;
        context.data = htmlclean(context.data); // eslint-disable-line
        return context;
      },
    },
  ],
  afterBuildTasks: ['./_scripts/sw'],
};
