
import Serve from "../../types/Serve";

export function getPath(serversContext){
  console.log('testpath：', __dirname)
  console.log('testserversContext.keys()：', serversContext.keys())
}

export function mapServe(serversContext:any): Serve[]{
  let serves: Serve[] = [];
  serversContext.keys().forEach((data: any) => {
    const serverModule = serversContext(data)
    /**
     * 兼容 import export 和 require module.export 两种规范
     */
    let servData: Serve = serverModule.default || serverModule
    serves.push(servData)
  })
  // console.log('serves：', serves)
  return serves
}

