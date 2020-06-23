import webpack  from 'webpack'
import app from '../server/index'
import devMiddleware from '../server/middleware/webpack-dev-middleware'
import webpackConfig from '../webpack.config.js'

const compiler = webpack(webpackConfig as webpack.Configuration)
app.use(devMiddleware(compiler, {
  publicPath: '/'
}))

const port: number = Number(process.env.port) || 3000

app.listen(port, function():void{
  console.log(`listent on ${port}`)
})