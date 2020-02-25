import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import json from 'koa-json'
import logger from 'koa-logger'

import middlewares from '../middlewares'
import modules from '../modules'

const app = new Koa()

app.use(logger()) // log4js
app.use(bodyParser())
app.use(helmet())
app.use(json())

middlewares(app)
modules(app)

export default app
