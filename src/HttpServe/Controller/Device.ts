import Result from "../../../types/Result";
import Serve from "../../utils/Serve";
// import Log from '../../Log/logFormat'

let ser1: Serve = new Serve();
ser1.url = '/api/test1'
ser1.type = 'get'
ser1.response = async (req: any, res: any) => {
  debugger
  let result: Result = new Result();
  console.log('查询参数', req.body)
  result.code = 0
  result.message = "数据获取成功"
  result.result = { deviceID: '0665558kakpe669', deviceName: 'rebot-001' }
  debugger
  res.send(result)
  // Log.logResponse(req, new Date(), result)
}
export default ser1;
