export default function isStyleSheetLoaded(node) {
  return new Promise((resolve, reject) => {
    if (!node) {
      reject(Error(`node should be provided`))
      return
    }
    if (!node.sheet || !node.sheet.rules) {
      reject(Error(`node should be <style> or <link rel="stylesheet">`))
    }
    if (node.sheet.rules.length > 0) {
      resolve()
      return
    }
    node.addEventListener('load', () => {
      resolve()
    })
  })
}
