import { $$ } from '../utils'

/* add table-wrapper */
$$('.page-content>table').forEach(table => {
  const div = document.createElement('div')
  const range = document.createRange()
  div.className = '_table-wrapper'
  range.selectNode(table)
  range.surroundContents(div)
})
