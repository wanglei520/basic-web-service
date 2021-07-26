/**
 * 定义服务返回结果类
 */
class Result {
  public code: number = 0;
  public message: string = '';
  public timestamp: number = 0;
  public datetime: string = '';
  public result: any;
}

export default Result;
