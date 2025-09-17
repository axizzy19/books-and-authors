const pgp = require('pg-promise')();
require('dotenv').config();

const cn = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

const db = pgp(cn);

db.one('SELECT NOW ()')
  .then(data => console.log('db connected at ', data.now))
  .catch(error => {
    console.log('can not connect to db: ', error);
    process.exit(1);
  })

module.exports = db;