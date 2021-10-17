
// 这里将各个文件夹的服务注册到进程中 This is where the services for each folder are registered into the process
import '../Server.Config'
import HttpServe from './HttpServe/index'
import { swagger } from './swagger/index'
HttpServe(swagger)

// import './Data/test'

// import WebSocket from './socket/socket'

// let websocket = new WebSocket()


// websocket.Servers.push({Name:'environment',handle:(con: any, reqData: any)=>{
//    const environment = {
//     weather: { text: '多云', temperature: '16/22°C' },
//     comfort: '优',
//     wind: '东北风 3-4级',
//     light: '0.2Lux',
//     uvb: '弱',
//     pm25: '18',
//     co2: '18',
//     humidity: '18%',
//     o2: '37',
//     noise: '34'
//   }
//   const message = JSON.stringify(environment)
//   con.send(message)
//   return {}
// }})
