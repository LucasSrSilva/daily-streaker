import pg from 'pg'
import { config } from '../config/env.js'


const base = config.databaseUrl
  ? {
      connectionString: config.databaseUrl,
      ssl: { rejectUnauthorized: false }
    }
  : {
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database
    }

const pool = new pg.Pool(base)

export default {
  query: (text, params) => pool.query(text, params)
}