export default (url) => {
  const head = document.head
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  head.appendChild(link)
}
