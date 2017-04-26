const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './javascript/index',
  output: {
    path: __dirname,
    filename: 'build/bundle.js',
    sourceMapFilename: 'sourcemap'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      css: path.resolve(__dirname, 'css'),
      javascript: path.resolve(__dirname, 'javascript'),
      classes:    path.resolve(__dirname, 'javascript', 'classes'),
      math:       path.resolve(__dirname, 'javascript', 'math'),
      utility:    path.resolve(__dirname, 'javascript', 'utility')
    }
  },
  module: {
    rules: [
      {
        test: /\.css|.scss$/,
        use: ExtractTextPlugin.extract({
          loader: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        })
      }
    ]
  },
  devtool: '#inline-source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: 'build/style.css',
      allChunks: true
    })
  ]
}
