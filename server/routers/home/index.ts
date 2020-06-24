import router from 'koa-router'
import homeCtrl from '../../controllers/homeCtrl'
let Router = new router()
Router.get('/tnt/home', async (ctx)=>{
let list = await homeCtrl.getHomeName()

 return await ctx.render('home', {page: 'home', list})
})


Router.post('/tnt/getAge', async (ctx)=>{
    let {name} = ctx.request.body
    let data = await homeCtrl.getAge(name)
    console.log('ctx.req=====', ctx.request.body)
    return ctx.response.body = {age: data.age}
})
Router.get('/tnt/getAge', async (ctx)=>{
    let {name} = ctx.request.query
    console.log('ctx.req=====', ctx.request.query)
    return ctx.response.body = {name}
})
Router.get('/:id/getAge', async (ctx)=>{
    let {name} = ctx.request.query
    let {id} = ctx.params
    console.log('ctx.req=====', ctx.request.query, id)
    return ctx.response.body = {name}
})
export default Router