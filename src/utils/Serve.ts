
const middleware = async (req: any, res: any, next: Function) => {
  console.log('Middlewar 调用了')
  await next(); // TODO 必须有才可以返回结果，否则状态一直是等待，记得中间件一定要处理
  debugger
}
class Serve {
  url: string = '';
  type: string = '';
  response: any = () => { };
  Middleware: Function[] = [middleware]
  isAuth: boolean = false;
  isEnAble: boolean = true;
}

export default Serve;
