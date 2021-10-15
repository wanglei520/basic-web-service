const middleware = () => { console.log('Middlewar 调用了') }
class Serve {
  url: string = '';
  type: string = '';
  response: any = () => { };
  Middleware: Function[] = [middleware]
  isAuth: boolean = false;
  isEnAble: boolean = true;
}

export default Serve;
