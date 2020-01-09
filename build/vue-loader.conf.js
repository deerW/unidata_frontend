var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : process.env.NODE_ENV === 'test' ? config.buildStaging.productionSourceMap : config.dev.cssSourceMap,
    extract: isProduction ? isProduction : process.env.NODE_ENV === 'test' ? true : false
  })
}
