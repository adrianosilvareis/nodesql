import fs from 'fs'
import path from 'path'

const resolveDir = url => path.resolve(__dirname, '..', url)
const resolveFile = (url, file) => path.resolve(__dirname, '..', url, file)

export default (app, url, matchFile) => {
  fs.readdirSync(resolveDir(url))
    .filter(file => file.match(matchFile))
    .forEach(route => require(resolveFile(url, route))(app))
}
