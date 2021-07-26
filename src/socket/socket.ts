

import IPAdress from "../../utils/IPAdress";

let ip = IPAdress()
// respond with "hello world" when a GET request is made to the homepage
let ws = require('nodejs-websocket');
const PORT = process.env.WS_PORT || 6896;


// module.exports = createServer
interface Serve {
  Name: string,
  handle: (con: any, reqData: any) => {}
}
interface websocket {
  url: string;
  Servers: Serve[]
}

class WebSocket implements websocket {
  constructor(port: string) {
    const _this = this
    this.Port = port
    let server = ws.createServer((connection: any) => {
      connection.on('text', function (request: string) {
        // connection.send('{"name":"MenuBadge","data":{ "inbreakMonitoring": 13, "accessMonitoring": 2, "fireMonitoring": 1 }}')
        // connection.send(
        //   '[{"serviceName": "CDR服务器", "status": 1, "usageData": {"diskUsage": 60, "CPUUsage": 40, "memoryUsage": 53 } },{"serviceName": "ETL服务器", "status": 1, "usageData": {"diskUsage": 70, "CPUUsage": 20, "memoryUsage": 73 } },{"serviceName": "APP服务器", "status": 0, "usageData": {"diskUsage": 50, "CPUUsage": 60, "memoryUsage": 63 } },{"serviceName": "ODS服务器", "status": 1, "usageData": {"diskUsage": 30, "CPUUsage": 40, "memoryUsage": 83 } }]')
        // console.log('发送消息', result)
        // _this.Servers.forEach(server => {
        //   server(connection, request)
        // })
        if (request === 'ping') {
          console.log('接收消息：', request)
          connection.send('{"message":"pong"}')
          return
        }
        const reqObj: any = JSON.parse(request)
        const serve = _this.Servers.find(server => {
          return server.Name === reqObj?.name
        })
        if (!serve) return
        serve?.handle(connection, request)
      })
      connection.on('connect', function (code: any) {
        console.log('开启连接', code)
        // connection.sendText('{"name":"MenuBadge","data":{ "inbreakMonitoring": 13, "accessMonitoring": 2, "fireMonitoring": 1 }}')
      })
      connection.on('close', function (code: any) {
        console.log('关闭连接', code)
      })
      connection.on('error', function (code: any) {
        console.log('异常关闭', code)
      })
    }).listen(this.Port)
    this.Clients = server.connections
    let serveAddress: string = `ws://${ip}:${PORT}/`
    let localAddress: string = `ws://localhost:${PORT}/`
    console.log(`Network 地址：\x1B[36m${serveAddress}\x1B[0m`)
    console.log(`Local地址：  \x1B[36m${localAddress}\x1B[0m`)
    debugger
    debugger
    return
  }

  public url: string = ""
  public Servers: Serve[] = []
  public Clients: any[];
  public readonly Port: string
}

export default WebSocket






