/**
 * @param {string} query
 * @param {Function} handleMediaChange
 */
function bindMedia(query, handleMediaChange) {
  const media = window.matchMedia(query)
  media.addListener(handleMediaChange)
  handleMediaChange(media)
  return media
}

export default bindMedia
