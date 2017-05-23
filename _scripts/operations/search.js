import fetch from 'unfetch';
import $ from '../utils';

const searchInput = $('aside input[type=search]');
const searchResult = $('.search-result');
const suggestions = searchResult.querySelector('.suggestions');
const resultNumberSpan = searchResult.querySelector('.count');

let docs = null;

if (searchInput) {
  $.depend(
    '//cdn.bootcss.com/native-promise-only/0.8.1/npo.js',
    () => {
      if (typeof Promise !== 'object') return true;
      return false;
    },
    () => {
      fetch('/docsmap.json').then(r => r.json()).then((data) => {
        docs = data;
      });
    }
  );

  const findMatches = function findMatches(wordToMatch, docsInfos) {
    return docsInfos.filter((info) => {
      const regex = new RegExp(wordToMatch, 'ig');
      return (
        regex.test(info.title) ||
        info.types.reduce((whetherFind, type) => {
          if (whetherFind) return true;
          if (regex.test(type)) return true;
          return false;
        }, false)
      );
    });
  };

  const displayMatches = function displayMatches() {
    const regex = new RegExp(this.value, 'ig');
    const matchArray = findMatches(this.value, docs);
    if (!this.value) {
      searchResult.classList.remove('open');
    } else {
      searchResult.classList.add('open');
    }
    const html = matchArray
      .map((doc) => {
        const title = doc.title.replace(regex, '<span class="hl">$&</span>');
        const types = doc.types.map(type => type.replace(regex, '<span class="hl">$&</span>'));
        return `
          <li>
            <h3 class="title"><a href="${doc.address}">${title}</a></h3>
            <span class="types">${types.join(' > ')}</span>
          </li>
      `;
      })
      .join('');
    resultNumberSpan.innerHTML = matchArray.length;
    suggestions.innerHTML = html;
  };

  searchInput.addEventListener('input', displayMatches);
}
