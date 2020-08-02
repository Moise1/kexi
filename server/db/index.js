import Pool from 'pg-pool';
import url from 'url';
import dotenv from 'dotenv';

//Make connection to the database depending on the environment.

dotenv.config()
const params = url.parse(process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL
: process.env.DEV_ENV_URL);

const auth = params.auth.split(':');
const poolConfig = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true,
  NODE_TLS_REJECT_UNAUTHORIZED: process.env.NODE_TLS_REJECT_UNAUTHORIZED
}

const pool = new Pool(poolConfig) ;

export default pool;
