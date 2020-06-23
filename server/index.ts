import Koa from 'koa'
import render from 'koa-ejs'
import path from 'path'
import router from 'koa-router'
import koatStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import home from './routers/home/'
import test from './routers/test/'
import './config/sequelize'

const app = new Koa();
const Router = new router()
app.use(bodyParser())
app.use(json())
render(app, {
    root: path.join(__dirname, '../dist/views'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
  });

Router.use('',  home.routes(), home.allowedMethods())
Router.use('',  test.routes(), test.allowedMethods())
app.use(Router.routes()).use(Router.allowedMethods())
app.use(koatStatic(path.resolve(__dirname, '../dist/')))


export default app