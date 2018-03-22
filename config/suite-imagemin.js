const imagemin = require('imagemin')
const { _extend: assign } = require('util')

exports.beforeWriteAsset = async context => {
  if (!/.+\.(png|jpg|gif|svg)$/.test(context.src)) return null
  const origLength = context.data.byteLength
  const mined = await imagemin.buffer(context.data)
  const saved = origLength - mined.byteLength
  if (saved > 0) {
    const finalContext = assign({}, context)
    finalContext.data = mined
    console.log(`save ${context.dist} ${saved} Byte`)
    return finalContext
  }
  return null
}
