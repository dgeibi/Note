const htmlclean = require('htmlclean');

exports.beforeWritePlugins = [
  (context) => {
    if (!context.data) return context;
    const html = htmlclean(context.data);
    return Object.assign({}, context, { data: html });
  },
];

exports.listTemplate = {
  headerTemplate(
    {
      level,
      index,
      typeName,
      typeSlug,
    }
  ) {
    return `<label for="${level}-${index}">${typeName}</label><input type="checkbox" id="${level}-${index}" data-type="${typeSlug}">`;
  },
};
