const fs = require('fs'); //文件模块
const path = require('path'); //路径模块
import Serve from "../../types/Serve";
const swagger = (app, express) => {
  let serve = new Serve()
  serve.url = '/'
  serve.type = 'get'
  serve.isAuth = false
  serve.isEnAble = true
  app.use(express.static(path.resolve(__dirname, './dist'))); // 设置静态项目访问路径(此处的dist为webpack打包生成的项目文件夹名称)
  app.get(serve.url, function (req, res) {
    console.log('访问了swagger')
    const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8'); // 设置所有访问服务请求默认返回index.html文件
    res.send(html);
  });

  return serve
}

export {
  swagger
}
// app.listen(port, hostName, function () {
//   console.log(`服务器运行在http://${hostName}:${port}`);
// });
