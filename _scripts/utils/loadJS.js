export default (url, done) => {
  if (url && typeof url === 'string') {
    const script = document.createElement('script')
    script.src = url
    if (done) {
      script.onload = done
    }
    script.onerror = () => {
      const err = new Error(`Failed to load script ${url}`)
      if (done) {
        done(err)
      } else {
        throw err
      }
    }
    document.head.appendChild(script)
  } else {
    throw Error('url should be a string')
  }
}
