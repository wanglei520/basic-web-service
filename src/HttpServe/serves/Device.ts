import Result from "../../../types/Result";
import Serve from "../../../types/Serve";

let ser1: Serve = new Serve();
ser1.url = '/api/test1'
ser1.type = 'get'
ser1.response = (req: any, res: any) => {
  debugger
  debugger
  let result: Result = new Result();
  console.log('查询参数', req.body)
  result.code = 0
  result.message = "数据获取成功"
  result.result = { deviceID: '0665558kakpe669', deviceName: 'rebot-001' }
  res.send(result)
}
export default ser1;
