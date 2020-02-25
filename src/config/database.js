// const dotenv = require('dotenv')

// const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env

// dotenv.config()

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'onairda1',
  database: 'sqlnode',
  define: {
    timestamps: true,
    underscored: true
  }
}
