const dbConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  dialect:  process.env.DB_DIALECT,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASS
}

module.exports = dbConfig;
