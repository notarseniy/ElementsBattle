module.exports = {
  plugins: [
    require('postcss-import')(),
    require('precss')(),
    require('postcss-cssnext')(),
    require('postcss-inline-svg')()
  ]
};
