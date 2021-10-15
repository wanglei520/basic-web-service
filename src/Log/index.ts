
import Log from './logFormat'

const LogRegister = (app:any) =>{
  app.use(async (req: any, res: any, next: Function) => {
    debugger
    // const start = new Date();					          // 开始时间
    let intervals:Date;								              // 间隔时间
    try {
      await next();
      intervals = new Date() ;
      debugger
      Log.logRequest(req, intervals);  // 记录请求日志
      Log.logResponse(req, intervals);	  //记录响应日志\
      debugger
    } catch (error) {
      debugger
      intervals = new Date();
      Log.logError(req, error, intervals);//记录异常日志
    }
  });
  
}

export  {Log,LogRegister}
