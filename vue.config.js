module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/lanchapp/'
      : '/',
      configureWebpack:{
        devtool: 'source-map'
      }
  }