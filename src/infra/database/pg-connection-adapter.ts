import { Connection } from './connection';

import pgp from 'pg-promise'

export default class PgPromiseConnectionAdapter implements Connection {
  private readonly pgp: any
  private readonly db: any
  private static instance: PgPromiseConnectionAdapter
  private constructor () {
    this.pgp = pgp({})
    this.db = this.pgp(process.env.CONNECTION_STRING)
  }

  public static getInstance (): PgPromiseConnectionAdapter {
    if (!PgPromiseConnectionAdapter.instance) {
      PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter()
    }
    return PgPromiseConnectionAdapter.instance
  }

  async query (query: string, params: any[]): Promise<any> {
    return this.db.query(query, params)
  }
}
