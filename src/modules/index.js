import auth from './auth'
const modules = [auth]

export default app => modules.forEach(lib => lib(app))
