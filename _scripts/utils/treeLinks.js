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
  }

  /**
   * @param {TreeitemLink} treeitem
   */
  setFocusToItem(treeitem) {
    treeitem.domNode.focus()
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
}

export default TreeLinks

window.addEventListener('load', () => {
  const trees = document.querySelectorAll('[role="tree"]')

  for (let i = 0; i < trees.length; i += 1) {
    const t = new TreeLinks(trees[i])
    t.init()
  }
})
