import Config from '../models/CfgUser'

export const index = async ctx => {
  try {
    const configs = await Config.findAll()
    ctx.body = configs
  } catch (error) {
    ctx.throw(error)
  }
}

export const get = async ctx => {
  try {
    const { id } = ctx.params
    const config = await Config.findByPk(id)
    ctx.body = config
  } catch (error) {
    ctx.throw(error)
  }
}

export const update = async ctx => {
  try {
    const { id, value } = ctx.params
    const config = await Config.findByPk(id)
    config.value = value
    await config.save()
    ctx.body = 'OK'
  } catch (error) {
    ctx.throw(error)
  }
}

export const remove = async ctx => {
  try {
    const { id } = ctx.params
    const config = await Config.findByPk(id)
    await config.remove()
    ctx.body = 'OK'
  } catch (error) {
    ctx.throw(error)
  }
}
