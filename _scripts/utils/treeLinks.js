import TreeitemLink from './treeitemLinks'

/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   File:   TreeLinks.js
*
*   Desc:   Tree widget that implements ARIA Authoring Practices
*           for a tree being used as a file viewer
*
*   Author: Jon Gunderson, Ku Ja Eun and Nicholas Hoyt
*/

/**
 *
 * @param {HTMLElement} node
 * @param {TreeLinks} tree
 * @param {(boolean|TreeitemLink)} group
 */
function findTreeitems(node, tree, group) {
  let elem = node.firstElementChild
  let ti = group
  while (elem) {
    // find role='treeitem' deep
    if (
      (elem.tagName.toLowerCase() === 'li' &&
        elem.firstElementChild.tagName.toLowerCase() === 'span') ||
      elem.tagName.toLowerCase() === 'a'
    ) {
      ti = new TreeitemLink(elem, tree, group)
      ti.init()
      tree.treeitems.push(ti)
      tree.firstChars.push(ti.label.substring(0, 1).toLowerCase())
    }
    if (elem.firstElementChild) {
      findTreeitems(elem, tree, ti)
    }
    elem = elem.nextElementSibling
  }
}

class TreeLinks {
  /**
   * @param {!HTMLElement} node
   */
  constructor(node) {
    // Check whether node is a DOM element
    if (typeof node !== 'object') {
      return
    }
    this.domNode = node

    /** @type {TreeitemLink[]} */
    this.treeitems = []

    /** @type {string[]} */
    this.firstChars = []

    /** @type {TreeitemLink} */
    this.firstTreeitem = null
    this.lastTreeitem = null
  }

  init() {
    // initialize pop up menus
    if (!this.domNode.getAttribute('role')) {
      this.domNode.setAttribute('role', 'tree')
    }
    findTreeitems(this.domNode, this, false)

    // set ti.isVisible, find firstTreeitem and lastTreeitem
    this.updateVisibleTreeitems()
    this.firstTreeitem.domNode.tabIndex = 0
  }

  /**
   * @param {TreeitemLink} treeitem
   */
  setFocusToItem(treeitem) {
    for (let i = 0; i < this.treeitems.length; i += 1) {
      const ti = this.treeitems[i]
      if (ti === treeitem) {
        ti.domNode.tabIndex = 0
        ti.domNode.focus()
      } else {
        ti.domNode.tabIndex = -1
      }
    }
  }

  /**
   * @param {TreeitemLink} currentItem
   */
  setFocusToNextItem(currentItem) {
    let nextItem = false
    for (let i = this.treeitems.length - 1; i >= 0; i -= 1) {
      const ti = this.treeitems[i]
      if (ti === currentItem) {
        break
      }
      if (ti.isVisible) {
        nextItem = ti
      }
    }
    if (nextItem) {
      this.setFocusToItem(nextItem)
    }
  }

  setFocusToPreviousItem(currentItem) {
    let prevItem = false
    for (let i = 0; i < this.treeitems.length; i += 1) {
      const ti = this.treeitems[i]
      if (ti === currentItem) {
        break
      }
      if (ti.isVisible) {
        prevItem = ti
      }
    }
    if (prevItem) {
      this.setFocusToItem(prevItem)
    }
  }

  setFocusToParentItem(currentItem) {
    if (currentItem.groupTreeitem) {
      this.setFocusToItem(currentItem.groupTreeitem)
    }
  }

  setFocusToFirstItem() {
    this.setFocusToItem(this.firstTreeitem)
  }

  setFocusToLastItem() {
    this.setFocusToItem(this.lastTreeitem)
  }

  expandTreeitem(currentItem) {
    if (currentItem.isExpandable) {
      currentItem.domNode.setAttribute('aria-expanded', true)
      this.updateVisibleTreeitems()
    }
  }

  expandAllSiblingItems(currentItem) {
    for (let i = 0; i < this.treeitems.length; i += 1) {
      const ti = this.treeitems[i]
      if (ti.groupTreeitem === currentItem.groupTreeitem && ti.isExpandable) {
        this.expandTreeitem(ti)
      }
    }
  }

  collapseTreeitem(currentItem) {
    let groupTreeitem = false
    if (currentItem.isExpanded()) {
      groupTreeitem = currentItem
    } else {
      groupTreeitem = currentItem.groupTreeitem
    }
    if (groupTreeitem) {
      groupTreeitem.domNode.setAttribute('aria-expanded', false)
      this.updateVisibleTreeitems()
      this.setFocusToItem(groupTreeitem)
    }
  }

  updateVisibleTreeitems() {
    this.firstTreeitem = this.treeitems[0]
    for (let i = 0; i < this.treeitems.length; i += 1) {
      const ti = this.treeitems[i]
      let parent = ti.domNode.parentNode
      ti.isVisible = true
      while (parent && parent !== this.domNode) {
        if (parent.getAttribute('aria-expanded') === 'false') {
          ti.isVisible = false
        }
        parent = parent.parentNode
      }
      if (ti.isVisible) {
        this.lastTreeitem = ti
      }
    }
  }

  setFocusByFirstCharacter(currentItem, _char) {
    let start
    let index
    const char = _char.toLowerCase()
    // Get start index for search based on position of currentItem
    start = this.treeitems.indexOf(currentItem) + 1
    if (start === this.treeitems.length) {
      start = 0
    }
    // Check remaining slots in the menu
    index = this.getIndexFirstChars(start, char)
    // If not found in remaining slots, check from beginning
    if (index === -1) {
      index = this.getIndexFirstChars(0, char)
    }
    // If match was found...
    if (index > -1) {
      this.setFocusToItem(this.treeitems[index])
    }
  }

  getIndexFirstChars(startIndex, char) {
    for (let i = startIndex; i < this.firstChars.length; i += 1) {
      if (this.treeitems[i].isVisible) {
        if (char === this.firstChars[i]) {
          return i
        }
      }
    }
    return -1
  }
}

export default TreeLinks

window.addEventListener('load', () => {
  const trees = document.querySelectorAll('[role="tree"]')

  for (let i = 0; i < trees.length; i += 1) {
    const t = new TreeLinks(trees[i])
    t.init()
  }
})
