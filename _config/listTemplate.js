module.exports = {
  group({ body, typeSlug, typeName }) {
    return `<li role="treeitem" aria-expanded="false" data-type="${typeSlug}">
    <span>${typeName}</span>
    <ul role="group">${body}</ul></li>`;
  },

  tree({ body }) {
    return `<ul role="tree">${body}</ul>`;
  },

  item({ title, address }) {
    return `<li role="none"><a href="${address}" role="treeitem">${title}</a></li>`;
  },
};
