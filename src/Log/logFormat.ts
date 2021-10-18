var log4js = require('log4js');
var logsConfig = require('./config');
//加载配置文件
log4js.configure(logsConfig);
//调用预先定义的日志名称
var reqLogger = log4js.getLogger("reqLogger");
var resLogger = log4js.getLogger("resLogger");
var errorLogger = log4js.getLogger("errorLogger");
var handleLogger = log4js.getLogger("handleLogger");
var consoleLogger = log4js.getLogger();

// 格式化日志文本 加上日志头尾和换行方便查看 ==>  普通日志、请求日志、响应日志、操作日志、错误日志
var formatText = {
  info: function (info) {
    var logText = new String();
    //响应日志头信息
    logText += "\n" + "***************info log start ***************" + "\n";
    //响应内容
    logText += "info detail: " + "\n" + JSON.stringify(info) + "\n";
    //响应日志结束信息
    logText += "*************** info log end ***************" + "\n";
    return logText;
  },
  request: function (req, resTime): String {
    var logText = new String();
    debugger
    debugger
    var method = req.method;
    //访问方法
    logText += "request method: " + method + "\n";
    //请求原始地址
    logText += "request originalUrl:  " + req.originalUrl + "\n";
    //客户端ip
    logText += "request client ip:  " + req.ip + "\n";
    //开始时间
    // var startTime;
    //请求参数
    if (method === 'GET') {
      logText += "request query:  " + JSON.stringify(req.query) + "\n";
      // startTime = req.query.requestStartTime;
    } else {
      logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
      // startTime = req.body.requestStartTime;
    }
    //服务器响应时间
    logText += "request time: " + resTime + "\n";
    return logText;
  },
  response: function (ctx, resTime, result) {
    debugger
    var logText = new String();
    const request = { method: ctx.method, path: ctx.path, originalUrl: ctx.originalUrl, ip: ctx.ip, query: ctx.query, body: ctx.body }
    //响应日志开始
    logText += "\n" + "*************** response log start ***************" + "\n";
    //添加请求日志
    logText += formatText.request(request, resTime).toString();
    //响应状态码
    logText += "response status: " + ctx.status + "\n";
    //响应内容
    logText += "response body: " + "\n" + JSON.stringify(ctx.response.body) + "\n";
    //响应日志结束
    logText += "*************** response log end ***************" + "\n";
    return logText;
  },
  handle: function (info) {
    debugger
    var logText = new String();
    //响应日志开始
    logText += "\n" + "***************info log start ***************" + "\n";
    //响应内容
    logText += "handle info detail: " + "\n" + JSON.stringify(info).replace(/\\n/g, "\n") + "\n";
    //响应日志结束
    logText += "*************** info log end ***************" + "\n";
    return logText;
  },
  error: function (ctx, err, resTime) {
    debugger
    var logText = new String();
    const request = { method: ctx.method, path: ctx.path, originalUrl: ctx.originalUrl, ip: ctx.ip, query: ctx.query, body: ctx.body }
    //错误信息开始
    logText += "\n" + "*************** error log start ***************" + "\n";
    //添加请求日志
    logText += formatText.request(request, resTime).toString();
    //错误名称
    logText += "err name: " + err.name + "\n";
    //错误信息
    logText += "err message: " + err.message + "\n";
    //错误详情
    logText += "err stack: " + err.stack + "\n";
    //错误信息结束
    logText += "*************** error log end ***************" + "\n";
    return logText;
  }
}

export default {
  //封装普通日志
  logInfo: function (info) {
    if (info) {
      consoleLogger.info(formatText.info(info));
    }
  },
  //封装请求日志
  logRequest: function (ctx, resTime) {
    console.log('调用了log')
    if (ctx) {
      reqLogger.info(formatText.request(ctx, resTime));
    }
  },
  //封装响应日志
  logResponse: function (ctx, resTime, result = {}) {
    if (ctx) {
      resLogger.info(formatText.response(ctx, resTime, result));
    }
  },
  //封装操作日志
  logHandle: function (res) {
    if (res) {
      handleLogger.info(formatText.handle(res));
    }
  },
  //封装错误日志
  logError: function (ctx, error, resTime) {
    if (ctx && error) {
      errorLogger.error(formatText.error(ctx, error, resTime));
    }
  }
};
