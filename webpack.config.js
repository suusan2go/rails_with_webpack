const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV
const DEBUG = NODE_ENV === 'development' || NODE_ENV === undefined
const devtool = DEBUG ? '#source-map' : 'eval'
const base_filename = DEBUG ? '[name]' : '[name]-[hash]'
const scss_loader =  "sass-loader"
const plugins = [
]
const babel_loaders = ['babel']
const entry_scripts = ['./frontend/javascripts/index.js']
const headers = DEBUG ? { "Access-Control-Allow-Origin": "http://localhost:3000", "Access-Control-Allow-Credentials": "true" } : {}
const publicPath = DEBUG ? 'http://localhost:3500/assets/' : '/assets/'

if(DEBUG) {
  entry_scripts.unshift(
    'webpack/hot/dev-server'
  )
  plugins.push(
    new webpack.NoErrorsPlugin()
  )
}

if(!DEBUG){
  plugins.push(
    new ManifestPlugin({
      fileName: 'webpack-manifest.json'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = {
  entry: {
    application: entry_scripts
  },
  output: {
    path: __dirname + '/public/assets',
    filename: `${base_filename}.js`,
    publicPath: publicPath
  },
  devtool: devtool,
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ["babel"]
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=image/svg+xml'
      },
      {
        test: /\.woff(\d+)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader?name=[path][name]-[hash].[ext]'
      }
    ]
  },
  resolve: {
    root: path.resolve(__dirname, 'frontend'),
    extensions: ['', '.js', '.jsx', '.js.jsx', '.css', '.scss'],
  },
  devServer: {
    headers: headers
  }
}
