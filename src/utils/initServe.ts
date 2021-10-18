import Result from "../../types/Result";
import Serve from "./Serve";
import { Postgres, ConnectionObj } from "../Data"

// 从配置环境中获取信息
const pgconobj: ConnectionObj = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: '123456',
  port: '5432',
}

const pg = new Postgres(pgconobj, false)
// pg.pgConnect()
declare type Person = {
  id: number;
  name: string;
  age: number;
}

let ThrowError = (error, res, result: Result) => {
  result.code = 101
  result.message = error.message || '处理异常'
  result.result = JSON.stringify(error)
  res.send(result)
}

let ser1: Serve = new Serve();
ser1.url = '/api/cars'
ser1.type = 'get'
ser1.response = (req: any, res: any) => {
  let result: Result = new Result();
  result.message = "数据获取成功"
  // const { token, token } = req.query 这里是用于获取传入查询参数
  debugger
  // result.result = { car: 'car' }
  pg.executeTrans(async () => {
    const db_result = await pg.QueryBySql<Person>(`select id::int,name::text,age::int from public.person`)
    const db_result2 = await pg.QueryBySql<Person>(`select NOW() AS date`)
    debugger
    db_result.push(db_result2[0])
    result.result = db_result
    res.send(result)
  }).catch((err) => {
    ThrowError(err, res, result)
  })

}
ser1.isAuth = false
export default ser1;
