// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../server/views/index.html'),
    assetsRoot: path.resolve(__dirname, '../server/views/'),
    assetsSubDirectory: '../public',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8089,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/movie/coming': 'http://localhost:9091',
      '/movie/hot': 'http://localhost:9091',
      '/movie/info': 'http://localhost:9091',
      '/movie/evaluation': 'http://localhost:9091',
      '/movie/cinema': 'http://localhost:9091',
      '/movie/cinema_detail': 'http://localhost:9091',
      '/movie/swip/movie/cityer': 'http://localhost:9091',
      '': 'http://localhost:9091'

    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
