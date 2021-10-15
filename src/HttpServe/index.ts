import IPAdress from "../../utils/IPAdress";
// import auth from "../action/auth";
import Serve from "../../types/Serve";
import bodyParser from 'body-parser'
import {mapServe} from "../utils/mapServe";
import {LogRegister} from "../Log/index"

export default function HttpServe(swagger: Function = null) {
  const path = require('path')
  var express = require('express')
  var app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }));
  const requireContext = require('require-context')

  let ip = IPAdress()
  let serves: Serve[] = [];

  const serversContext = requireContext(path.join(__dirname, './Controller'), true, /\.ts$/)
  console.log('path：', __dirname)
  console.log('serversContext.keys()：', serversContext.keys())
  serves = mapServe(serversContext)

  //认证信息
  // auth(app, serves)
  // log注册
  LogRegister(app)
  // 注册Swagger
  // if (swagger) {
  //   // 注册swaggerapi
  //   const serve_swagger = swagger(app, express)
  //   serves.push(serve_swagger)

  // }
  // 服务注册
  serves.forEach(ser => {
    const { url, type,Middleware, response } = ser;
    // console.log(url)
    // Middleware[0]()
    app[type](url, Middleware, response);
    // app[ser.type](ser.url,...ser.Middleware, ser.response)
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
