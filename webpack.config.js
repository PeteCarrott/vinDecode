// The path module provides utilities for working with file and directory paths.
const path = require("path");
// This html plugin creates html files to serve the webpack bundles.
const HtmlWebpackPlugin = require('html-webpack-plugin');
// This plugin extracts css into separate files.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// This plugin removes build folders
const CleanWebpackPlugin = require('clean-webpack-plugin');
// A flag to set the webpack mode
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  // Where to start building out internal dependency graph.
  entry: './src/js/index.js',
  // Where to output the bundles and how to name the files.
  output: {
    filename: "bundle.[chunkhash].js",
    path: path.resolve(__dirname, "./dist"),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  // Tests for file types with loaders
  module: {
    rules: [{
        // Javascript
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['env']
          }
        }
      },
      {
        // Sass
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", // translates css into common js
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader", // compiles sass to css
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        // HTML
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: false
          }
        }
      },
      {
        // Images
        test: /\.(jpg|png|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: 'img/'
          }
        }]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[chunkhash].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin('dist', {})
  ],
  devServer: {
    contentBase: './dist',
    port: 8000
  },
  mode: devMode ? 'development' : 'production'
};