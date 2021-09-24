import Postgres from './Database/PostgresSql/postgresSql'
import { pgConnectionObj } from './Database/PostgresSql/interface'
const pgconobj: pgConnectionObj = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: '123456',
  port: '5432',
}

const pg = new Postgres(pgconobj, false)
// pg.pgConnect()
declare type Person = {
  id: number;
  name: string;
  age: number;
}

pg.executeTrans(async () => {
  const result = await pg.QueryBySql<Person>(`select id::int,name::text,age::int from public.person`)
  // pg.QueryBySql<Person>(`select 1 as kms,369 as num`)
  //await db.query(`select * from public.query_persons();`)
  debugger
  console.log('result=>', result)
})
