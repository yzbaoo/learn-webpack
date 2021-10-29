/**
 * 配置文件
 * 作用：当运行webpack指令时，会加载里面的配置
 * 所有构建工具都是基于nodejs平台运行，模块化默认采用commonjs
 */
/**
 * loader: 1.下载   2.使用
 * plugins: 1.下载   2.引入   3.使用
 */
// resolve用来拼接绝对路径
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  /** 1 */ 
  entry:'./src/index.js',
  /** 2 */ 
  output: {
    filename:'built.js',
    // __dirname：nodejs变量，代表当前文件的目录绝对路径
    path:resolve(__dirname,'build'),
  },
  /** 3 */ 
  module: {
    rules:[
      // 详细的loader配置
      {
        test: /\.css$/, // 匹配文件
        use: [
          // 'style-loader', // 创建style标签，将样式添加到head中
          MiniCssExtractPlugin.loader, // 代替style-loader
          'css-loader' // 将css文件变成commonjs模块加载js中，里面内容是字符串
        ] // 使用哪些loader
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader, // 代替style-loader
          'css-loader',
          // 需要下载less-loader和less
          'less-loader'
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  /** 4 */ 
  plugins: [
    // 详细插件配置
    // html-webpack-plugin,默认是空的html
    new HtmlWebpackPlugin({
      // 需求：需要有结构的html
      template: './src/index.html'
    }),
    // 提取css为单独文件
    new MiniCssExtractPlugin({
      // filename: 'css/built.css',
      filename: 'css/[name].css',
    })
  ],
  /** 5 */ 
  mode: 'development',
  // mode: 'production'

  // 开发服务器
  // 启动指令：npx webpack serve (需下载webpack-dev-server)
  devServer: {
    static: {
      directory: resolve(__dirname,'build'),
    },
    // 启动gzip压缩
    compress: true, 
    port: 3000,
    // 打包完自动启动浏览器
    open: true 
  },
  
  optimization: {
    splitChunks: {
      // 自动提取所有公共模块到单独 bundle
      chunks: 'all'
    }
  },
}