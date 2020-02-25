import dotenv from 'dotenv'

import app from './config/koa'

import './database'

dotenv.config()
const { HOST = 'localhost', PORT = 3000 } = process.env

app.listen(PORT, () => console.info(`server listen on: http://${HOST}:${PORT}`))
