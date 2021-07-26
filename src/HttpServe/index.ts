import IPAdress from "../../utils/IPAdress";
import auth from "../action/auth";
import Serve from "../../types/Serve";

export default function HttpServe() {
  const path = require('path')
  var express = require('express')
  var app = express()

  const requireContext = require('require-context')

  let ip = IPAdress()
  let serves: Serve[] = [];

  const serversContext = requireContext(path.join(__dirname, './serves'), true, /\.ts$/)
  // const serversContext = requireContext(path.join(__dirname, './serves'), true, /\.ts$/)
  // const serversContext = requireContext(path.join(__dirname, './serves'), true, /\.ts$/)
  console.log('path：', __dirname)
  console.log('serversContext.keys()：', serversContext.keys())
  // 获取servers值
  // 将servers转换成mocks
  serversContext.keys().forEach((data: any) => {
    const serverModule = serversContext(data)
    /**
     * 兼容 import export 和 require module.export 两种规范
     */
    let servData: Serve = serverModule.default || serverModule
    serves.push(servData)
  })

  console.log(serves)
  //认证信息
  auth(app, serves)


  // 服务注册
  serves.forEach(ser => {
    app[ser.type](ser.url, ser.response)
  })


  debugger
  debugger
  const PORT = process.env.PORT || 8888;
  app.listen(PORT, function () {
    let serveAddress = `http://${ip}:${PORT}/`
    let localAddress = `http://localhost:${PORT}/`
    console.log(`Network地址：\x1B[36m${serveAddress}\x1B[0m`)
    console.log(`Local地址：  \x1B[36m${localAddress}\x1B[0m`)
  })
}
