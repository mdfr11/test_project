module.exports = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  dialect:  process.env.DB_DIALECT,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASS,
  logging: false,
  force: process.env.DB_FORCE_SYNC
};