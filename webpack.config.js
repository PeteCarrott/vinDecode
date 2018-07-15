// The path module provides utilities for working with file and directory paths.
const path = require("path");
// This html plugin creates html files to serve the webpack bundles.
const HtmlWebpackPlugin = require('html-webpack-plugin');
// This plugin extracts css into separate files.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// This plugin removes build folders
const CleanWebpackPlugin = require('clean-webpack-plugin');
// Webpack allows the use of hot module reloading.
const webpack = require("webpack");
// Browser sync
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = (env, argv) => {
  // Check for mode
  let devMode = true;

  if (argv.mode === 'production') {
    devMode = false;
    console.log("************** Building for production **************");
  } else {
    console.log("************** Building for development **************");
  }

  return {
    // Where to start building out internal dependency graph.
    entry: {
      index: './src/js/index.js',
      results: './src/js/results.js'
    },
    // Where to output the bundles and how to name the files.
    output: {
      filename: devMode ? '[name].js' : "[name].bundle_[chunkhash].js",
      path: path.resolve(__dirname, "./dist"),
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          indexStyles: {
            name: 'index',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          },
          resultsStyles: {
            name: "results",
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
      //new webpack.HotModuleReplacementPlugin(),
      //new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        chunks: ['index'],
        filename: 'index.html',
        template: 'src/index.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['results'],
        filename: 'results.html',
        template: 'src/results.html'
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].bundle_[chunkhash].css',
        chunkFilename: devMode ? '[name].css' : '[name].[hash].css'
      }),
      new CleanWebpackPlugin('dist', {}),
      new BrowserSyncPlugin({
        host: "localhost",
        port: 3000,
        proxy: "http://localhost:3000/"
      }, {
        reload: false
      })
    ],
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 3000
    },
    mode: devMode ? 'development' : 'production'
  }
};