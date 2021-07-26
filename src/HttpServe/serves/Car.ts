import Result from "../../../types/Result";
import Serve from "../../../types/Serve";

let ser1: Serve = new Serve();
ser1.url = '/cars'
ser1.type = 'get'
ser1.response = (req: any, res: any) => {
  let result: Result = new Result();
  result.code = 0
  result.message = "数据获取成功"
  result.result = { car: 'car' }
  res.send(result)
}
ser1.isAuth = true
export default ser1;
