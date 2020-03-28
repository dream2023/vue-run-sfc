module.exports = {
  productionSourceMap: false,
  css: { extract: false },
  outputDir: './docs/',
  publicPath: './',
  configureWebpack: {
    entry: './example/main.js',
    output: {
      libraryExport: 'default'
    }
  }
}
