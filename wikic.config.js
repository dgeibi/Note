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
    selectors: '.page-content h2, .page-content h3',
    minLength: 3,
    header: '<h2>Contents</h2>',
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
    layout: 'default',
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
  beforeWritePlugins: [
    (context) => {
      if (!context.data) return context;
      const html = htmlclean(context.data);
      return Object.assign({}, context, { data: html });
    },
  ],
  suites: [
    require('wikic-suite-docslist'),
    require('wikic-suite-docsmap'),
    {
      beforeBuild() {
        console.time('build');
      },
      afterBuild() {
        console.timeEnd('build');
      },
    },
  ],
};
