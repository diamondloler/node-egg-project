const assert = require('assert')


module.exports = app => {
  app.beforeStart(async () => {
    // 保证应用启动监听端口前数据已经准备好了
    // 后续数据的更新由定时任务自动触发
    // 手动执行定时任务
    //   await app.runSchedule('remove_img');
  });


  app.passport.verify(async (ctx, user) => {
    console.log(user, '用户信息')
    assert(user.provider, 'user.provider should exists')
    assert(user.id, 'user.id should exists')

    var auth = await ctx.service.authorization.findOne({
      uid: user.id,
      provider: user.provider
    })

    if (auth) {
      var existedUser = await ctx.service.user.find(auth.user_id)
      if (existedUser) return existedUser.user
    }

    var newUser = await ctx.service.user.register({
        uid: user.id,
        name: user.name,
        provider: user.provider,
    })

    return newUser
  })


  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
    console.log(user, '序列化')
    // 处理 user
    // ...
    // return user;
    var cacheUser = {}
    cacheUser.user_name = user.user_name
    cacheUser.id = user.id
    ctx.session.passportAuthUser = cacheUser
    return cacheUser
  });


  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user) => {
    console.log('反序列化')
    var cacheUser = ctx.session.passportAuthUser
    if (cacheUser) {
      var result = await ctx.service.user.find(cacheUser.id)
      return result.user
    }
    // 处理 user
    // ...
    // return user;
  });

};