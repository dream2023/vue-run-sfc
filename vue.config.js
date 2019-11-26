module.exports = {
  css: { extract: false },
  publicPath: './',
  configureWebpack: {
    entry: './example/main.js',
    output: {
      libraryExport: 'default'
    }
  }
}
