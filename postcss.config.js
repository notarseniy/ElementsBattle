module.exports = {
  plugins: [
    require('precss')(),
    require('postcss-cssnext')(),
    require('postcss-inline-svg')()
  ]
};
