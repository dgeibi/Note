const htmlclean = require('htmlclean')

module.exports = {
  beforeWrite(context) {
    if (!context.data) return
    context.data = htmlclean(context.data) // eslint-disable-line
  },
}
