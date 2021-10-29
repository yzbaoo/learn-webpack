/**
 * webpack入口文件
 * 开发环境运行指令：webpack ./src/index.js -o ./build/built.js --mode=development
 * -o: 输出到
 * 生产环境运行指令：webpack ./src/index.js -o ./build/built.js --mode=production
 * 结论：
 * 1.webpack只能处理js、json
 * 2.生产环境比开发环境多一个压缩js代码
 * 3.生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化
 */ 
import React from 'react';
import ReactDOM from 'react-dom';
import data from './data.json';
import './js/pink'
import './js/red'

function App() {
  return (
    <div>这是一个jsx</div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);