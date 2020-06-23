import router from 'koa-router'

let Router = new router()
Router.get('/tnt/test', async (ctx)=>{
 await ctx.render('test', {name: 'test'})
})

export default Router