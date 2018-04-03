const execa = require('execa')

const gitDate = filepath =>
  execa('git', ['log', '-1', '--pretty=format:"%cd"', filepath])

module.exports = config => {
  const format =
    typeof config.dateFormatter === 'function'
      ? config.dateFormatter
      : date => date.toLocaleDateString()

  return {
    afterRead: async function addDate(context) {
      const outputs = (await gitDate(context.src)).stdout
      const date = outputs === '' ? new Date() : new Date(outputs)
      Object.assign(context.page, {
        updateDate: format(date),
      })
    },
  }
}
