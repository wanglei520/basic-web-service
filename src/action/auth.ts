import Serve from "/#/Serve";

/**
 * 请求认证
 * @param req 
 * @param res 
 * @returns {boolean}
 */
const tokenCheck = (req: any, res: any): boolean => {
  const token: string = req.headers.access_token
  // todo token认证
  if (token === 'djiweng5ege5wegs5a') {
    return true;
  }
  return false;
}

const auth = (app: any, serves: Serve[]): void => {
  // 这里是请求中间件--拦截请求做权限认证
  app.use(function (req: any, res: any, next: Function) {
    const _serve = serves.find(ser => {
      return ser.url === req.url
    })
    debugger
    if (_serve) {
      if (_serve.isAuth) {
        // todo 访问认证 如果token认证通过就可以访问
        if (tokenCheck(req, res)) {
          next();
        }
        res.status(401).send('认证信息不通过')
      } else {
        next();
      }
    } else {
      // TODO 处理返回结果
      next();
      // res.status(404).send('地址不存在！')
    }
    debugger
    console.log('%s %s', req.method, req.url);

  });

}

export default auth
