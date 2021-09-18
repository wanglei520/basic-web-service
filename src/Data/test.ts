import Postgres from './Database/PostgresSql/postgresSql'
import { pgConnectionObj } from './Database/PostgresSql/interface'
const pgconobj: pgConnectionObj = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: '12345',
  port: '5432',
}

const pg = new Postgres(pgconobj, false)
pg.pgConnect()

pg.executeTrans(async (db) => {
  const result = await db.query('select now() as kms')
  console.log('result=>', result)
})


// const { Pool } = require('pg')
// const pool = new Pool({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'postgres',
//   password: '123456',
//   port: '5432',
// })
//   ; (async () => {
//     // note: we don't try/catch this because if connecting throws an exception
//     // we don't need to dispose of the client (it will be undefined)
//     const client = await pool.connect()
//     debugger
//     try {
//       await client.query('BEGIN')
//       await client.query('select now()')
//       await client.query('COMMIT')
//     } catch (e) {
//       await client.query('ROLLBACK')
//       throw e
//     } finally {
//       client.release()
//     }
//   })().catch(e => console.error(e.stack))
