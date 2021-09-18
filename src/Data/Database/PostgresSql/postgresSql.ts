// var postgres = require('pg');
import { pgConnectionObj } from './interface'
const { Pool, Client } = require('pg')


// pg对象
export default class Postgres {
  constructor(_connectObj: pgConnectionObj, _isClient: boolean = false) {
    this.isClient = _isClient
    if (_isClient) {
      this.clientOrPool = new Client(_connectObj)
    } else {
      this.clientOrPool = new Pool(_connectObj)
    }

  }
  public async pgConnect() {

    let isSuccess: Boolean = false
    try {
      this.dbServer = await this.clientOrPool.connect()
      isSuccess = true
    } catch (err) {
      debugger
    }
    debugger
    return isSuccess
  }
  public clientOrPool: any
  public dbServer: any
  public isClient: boolean = false

  public async getAll(tableName: String | undefined) {
    const _QuerySQL = `SELECT * FROM ` + tableName
    try {
      const res = await this.dbServer.query(_QuerySQL, [])
      console.log(res.rows[0])
      return res
    } catch (err) {
      console.log(err)
      return err
    } finally {
      this.dbServer.release()
    }
  }
  // query(params: Object): T[] {
  //   throw new Error('Method not implemented.');
  // }
  public async query(text: String, values: string[]) {
    try {
      const res = await this.dbServer.query(text, values)
      console.log(res.rows[0])
      return res
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
      console.log(err)
    }
  }
  public async execute(text: String, values: string[]) {
    try {
      await this.dbServer.query('BEGIN')
      const res = await this.dbServer.query(text, values)
      console.log(res.rows[0])
      this.dbServer.query('COMMIT')
      return res
    } catch (e) {
      await this.dbServer.query('ROLLBACK')
      throw e
    } finally {
      this.dbServer.release()
    }
  }

  public async executeTrans(TRANS: Function) {
    try {
      await this.pgConnect()
      await this.dbServer.query('BEGIN')
      const res = await TRANS(this.dbServer)
      this.dbServer.query('COMMIT')
      return res
    } catch (e) {
      await this.dbServer.query('ROLLBACK')
      throw e
    } finally {
      debugger
      this.dbServer.release()
      console.log('完成')
    }
  }

}
declare type ExecFun<T> = () => Promise<T></T>
