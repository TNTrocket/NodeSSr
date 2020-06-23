const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

const entries = () => {
  //遍历 entries目录下的入口
  const entriesFile = glob.sync(path.resolve(__dirname, './front/entries/*.ts'))
  const map = Object.create(null)
  for (let i = 0; i < entriesFile.length; i++) {
    const filePath = entriesFile[i]
    const match = filePath.match(/entries\/([a-zA-Z0-9-_]+)\.ts$/)
    map[match[1]] = filePath
  }

  return map
}


const config = {
  entry: entries(),
  mode: `${isDev ? 'development': 'production'}`,
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: isDev ? 'js/[name].js' : 'static/js/[name].[hash:7].js',
    publicPath: '../'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, './front')
        ],
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, './tsconfig.front.json')
          }
        }],
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: !isDev ? 'static/img/[name].[hash:7].[ext]' : 'img/[name].[ext]'
          }
        }]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: !isDev ? 'static/css/[name].[hash:7].css' : 'css/[name].css',
      chunkFilename: !isDev ? 'static/css/[name].[hash:7].css' : 'css/[name].css'
    }),
   
     new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname + '/front/components'),
          to: 'componentsViews'
       }
      ],
    }),
    new OptimizeCSSPlugin({ safe: true, map: false, discardComments: { removeAll: true } }),
  ],
  optimization : {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'app',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  }
}

Object.keys(config.entry).forEach(entry => {
  config.plugins.push(new HtmlWebpackPlugin({
    filename: 'views/' + entry + '.html',
    template: path.resolve(__dirname, `./front/views/${entry}.html`),
    chunks: ['app', entry],
    alwaysWriteToDisk: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: false,
      minifyCSS: true,
      minifyJS: true
    },
  }))
})
// if(isDev){
//   // dev模式，html在本地硬盘也生成一份
//   config.plugins.push(new HtmlWebpackHarddiskPlugin())
// }

module.exports = config