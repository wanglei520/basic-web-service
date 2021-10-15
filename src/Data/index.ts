import Postgres from './Database/PostgresSql/postgresSql'

export { Postgres }

export interface ConnectionObj {
  user: string,
  host: string,
  database: string,
  password: string,
  port: string,
}
