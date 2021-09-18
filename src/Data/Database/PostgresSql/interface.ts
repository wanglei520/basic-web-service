
export interface DBI<T> {
  add(info: T): boolean;
  update(info: T, id: number): boolean;
  delete(id: number): boolean;
  getAll(): void;
  query(params: Object): T[];
  queryByPage(pageInfo: string): T[]
}
export interface pgConnectionObj {
  user: string,
  host: string,
  database: string,
  password: string,
  port: string,
}
