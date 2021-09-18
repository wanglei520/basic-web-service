

import IPAdress from "../../utils/IPAdress";

let ip = IPAdress()
// respond with "hello world" when a GET request is made to the homepage
let ws = require('nodejs-websocket');
const PORT: string = process.env.WS_PORT || '6896';


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
  constructor(port: string = PORT) {
    const _this = this
    this.Port = port
    let server = ws.createServer((connection: any) => {
      connection.on('text', function (request: string) {
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
      })
      connection.on('close', function (code: any) {
        console.log('关闭连接', code)
      })
      connection.on('error', function (code: any) {
        console.log('异常关闭', code)
      })
    }).listen(this.Port)
    this.Clients = server.connections
    let serveAddress: string = `ws://${ip}:${this.Port}/`
    let localAddress: string = `ws://localhost:${this.Port}/`
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






