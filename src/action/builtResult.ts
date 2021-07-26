import Result from "../../types/Result";


/**
 * 
 * @param code 
 * @param message 
 * @param result 
 */
let buildResult: Function = (code: number, message: string, result: Object) => {
  let res: Result = new Result()
  res.code = code;
  res.message = message;
  res.result = result
}
export default buildResult;
