import errorHandler from './handles/error.handler'

const modules = [errorHandler]

export default app => modules.forEach(lib => lib(app))
