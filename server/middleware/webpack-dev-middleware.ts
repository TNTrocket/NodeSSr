import Koa from 'koa'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import { NextHandleFunction } from 'connect'
// 封装webpack-dev-middleware 为koa中间件
const devMiddleware = (compiler: webpack.ICompiler, opts: WebpackDevMiddleware.Options) => {
  let Options = {
    writeToDisk: true,
    publicPath: '/'
  }
  const middleware = WebpackDevMiddleware(compiler, Options)
  return async (ctx: Koa.Context, next: NextHandleFunction) => {
    await middleware(ctx.req, {
      // @ts-ignore
      end: (content:string) => {
        ctx.body = content
      },
      setHeader: (name: any, value: any) => {
        ctx.set(name, value)
      }
    }, next)
  }
}

export default devMiddleware