/* eslint-disable no-param-reassign, class-methods-use-this */
import TreeLinks from './treeLinks' // eslint-disable-line
/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   File:   TreeitemLink.js
*
*   Desc:   Treeitem widget that implements ARIA Authoring Practices
*           for a tree being used as a file viewer
*
*   Author: Jon Gunderson, Ku Ja Eun and Nicholas Hoyt
*/

class TreeitemLink {
  /**
   * @param {HTMLElement} node - role='treeitem'
   * @param {TreeLinks} treeObj
   * @param {(boolean|TreeitemLink)} group
   */
  constructor(node, treeObj, group) {
    // Check whether node is a DOM element
    if (typeof node !== 'object') {
      return
    }
    node.tabIndex = -1
    this.tree = treeObj

    /** @type {(boolean|TreeitemLink)} */
    this.groupTreeitem = group

    /** @type {HTMLElement} */
    this.domNode = node

    this.stopDefaultClick = false

    /** @type {string} */
    this.label = node.textContent.trim()
    if (node.getAttribute('aria-label')) {
      this.label = node.getAttribute('aria-label').trim()
    }

    this.isExpandable = false
    this.isVisible = false

    this.inGroup = false
    if (group) {
      this.inGroup = true
    }

    // set first ul's role to `group`
    let elem = node.firstElementChild
    while (elem) {
      if (elem.tagName.toLowerCase() === 'ul') {
        elem.setAttribute('role', 'group')
        this.isExpandable = true
        break
      }
      elem = elem.nextElementSibling
    }

    this.keyCode = Object.freeze({
      RETURN: 13,
      SPACE: 32,
      PAGEUP: 33,
      PAGEDOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
    })
  }

  init() {
    this.domNode.tabIndex = -1
    if (!this.domNode.getAttribute('role')) {
      this.domNode.setAttribute('role', 'treeitem')
    }
    this.domNode.addEventListener('keydown', this.handleKeydown)
    this.domNode.addEventListener('click', this.handleClick)
    this.domNode.addEventListener('focus', this.handleFocus)
    this.domNode.addEventListener('blur', this.handleBlur)
    if (this.isExpandable) {
      // add listeners for <span />
      this.domNode.firstElementChild.addEventListener(
        'mouseover',
        this.handleMouseOver
      )
      this.domNode.firstElementChild.addEventListener(
        'mouseout',
        this.handleMouseOut
      )
    } else {
      this.domNode.addEventListener('mouseover', this.handleMouseOver)
      this.domNode.addEventListener('mouseout', this.handleMouseOut)
    }
  }

  isExpanded() {
    if (this.isExpandable) {
      return this.domNode.getAttribute('aria-expanded') === 'true'
    }
    return false
  }

  /* EVENT HANDLERS */
  handleKeydown = event => {
    let flag = false
    const char = event.key

    /**
     * @param {string} str
     */
    function isPrintableCharacter(str) {
      return str.length === 1 && str.match(/\S/)
    }

    /**
     * @param {TreeitemLink} item
     */
    function printableCharacter(item) {
      if (char === '*') {
        item.tree.expandAllSiblingItems(item)
        flag = true
      } else if (isPrintableCharacter(char)) {
        item.tree.setFocusByFirstCharacter(item, char)
        flag = true
      }
    }

    this.stopDefaultClick = false
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return
    }
    if (event.shift) {
      if (
        event.keyCode === this.keyCode.SPACE ||
        event.keyCode === this.keyCode.RETURN
      ) {
        event.stopPropagation()
        this.stopDefaultClick = true
      } else if (isPrintableCharacter(char)) {
        printableCharacter(this)
      }
    } else {
      switch (event.keyCode) {
        case this.keyCode.SPACE:
        case this.keyCode.RETURN:
          if (this.isExpandable) {
            if (this.isExpanded()) {
              this.tree.collapseTreeitem(this)
            } else {
              this.tree.expandTreeitem(this)
            }
            flag = true
          } else {
            event.stopPropagation()
            this.stopDefaultClick = true
          }
          break
        case this.keyCode.UP:
          this.tree.setFocusToPreviousItem(this)
          flag = true
          break
        case this.keyCode.DOWN:
          this.tree.setFocusToNextItem(this)
          flag = true
          break
        case this.keyCode.RIGHT:
          if (this.isExpandable) {
            if (this.isExpanded()) {
              this.tree.setFocusToNextItem(this)
            } else {
              this.tree.expandTreeitem(this)
            }
          }
          flag = true
          break
        case this.keyCode.LEFT:
          if (this.isExpandable && this.isExpanded()) {
            this.tree.collapseTreeitem(this)
            flag = true
          } else if (this.inGroup) {
            this.tree.setFocusToParentItem(this)
            flag = true
          }
          break
        case this.keyCode.HOME:
          this.tree.setFocusToFirstItem()
          flag = true
          break
        case this.keyCode.END:
          this.tree.setFocusToLastItem()
          flag = true
          break
        default:
          if (isPrintableCharacter(char)) {
            printableCharacter(this)
          }
          break
      }
    }
    if (flag) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  handleClick = event => {
    // only process click events that directly happened on this treeitem
    if (
      event.target !== this.domNode &&
      event.target !== this.domNode.firstElementChild
    ) {
      return
    }
    if (this.isExpandable) {
      if (this.isExpanded()) {
        this.tree.collapseTreeitem(this)
      } else {
        this.tree.expandTreeitem(this)
      }
      event.stopPropagation()
    }
  }

  handleFocus = () => {
    let node = this.domNode
    if (this.isExpandable) {
      node = node.firstElementChild
    }
    node.classList.add('focus')
  }

  handleBlur = () => {
    let node = this.domNode
    if (this.isExpandable) {
      node = node.firstElementChild
    }
    node.classList.remove('focus')
  }

  handleMouseOver = event => {
    event.currentTarget.classList.add('hover')
  }

  handleMouseOut = event => {
    event.currentTarget.classList.remove('hover')
  }
}

export default TreeitemLink
