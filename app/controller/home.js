'use strict';
const Controller = require('egg').Controller;
const fs = require('fs')
const path = require('path')

class HomeController extends Controller {

  //渲染主页
  async index() {
    const app = this.app
    app.redis.set('hello', 9527)
    var renderPower = {
      renderIf: {
        isTrue: false,
      },
      renderFor: [1, 2, 3, 4],
      name: 'fuck',
      description: 'you',
      renderForKeyV: {
        a: 1,
        b: 2,
        c: 3,
        d: 4
      }
    }
    await this.ctx.render('home/home', renderPower)
  }

  //获取用户信息
  async getUserInfo() {
    console.log(await this.app.redis.get('hello'), 'redis')
    var ctx = this.ctx
    var id = ctx.query.id || 0
    var result = await ctx.service.user.find(id)
    result.appKey = this.app.Key
    ctx.body = ctx.helper.formatResult(result)
  }

  //更新用户信息
  async updateUserInfo() {
    var ctx = this.ctx
    var data = ctx.request.body
    var id = parseInt(data.id) || 0
    var msg = ''
    var type = parseInt(data.type) || 0

    delete data.id

    if (type === 0) {
      if (id === 0) {
        await ctx.service.user.add(data)
        msg = '新增成功'
      } else {
        await ctx.service.user.update(id, data)
        msg = '修改成功'
      }
    } else if (type === -1) {
      await ctx.service.user.delete(id)
      msg = '删除成功'
    }

    ctx.body = ctx.helper.formatResult(null, msg)
  }


  // 获取用户列表
  async getUserList() {
    var ctx = this.ctx
    var body = ctx.request.body
    var pageIndex = parseInt(body.pageIndex) || 1
    var pageSize = parseInt(body.pageSize) || 5
    var result = await ctx.service.user.getField(pageIndex, pageSize)
    ctx.body = ctx.helper.formatResult(result)
  }

  async test() {
    this.ctx.status = 200
    this.ctx.body = '<p style="color:red;">哈哈哈哈或或或或或或或或或</p>'
    this.ctx.type = 'text/html'
  }

  async renderLayout() {
    var html = fs.readFileSync(path.resolve(__dirname, '../view/layout.html'))
    this.ctx.status = 200
    this.ctx.type = 'text/html'
    this.ctx.body = html
  }

  // 渲染登录页
  async renderLogin() {
    if (this.ctx.session.user) {
      this.ctx.redirect('/')
      return
    }
    await this.ctx.render('home/login')
  }

  // 登陆，记录session
  async userLogin() {
    const ctx = this.ctx
    var body =  ctx.request.body
    var phone = body.phone
    var email = body.email
    var rule = {
      email: 'string',
      phone: 'string'
    }
    var status = 0
    var msg = ''
    ctx.validate(rule)
    var result = await ctx.service.user.check(phone)
    if (result) {
      if (email === result.email) {
        status = 1
        msg = '登陆成功'
        ctx.session.user = result
      } else {
        status = 0
        msg = '密码不正确'
      }
    } else {
      status = 0
      msg = '用户不存在'
    }
    ctx.body = ctx.helper.formatResult(null, msg, status)
  }


  //授权
  auth() {
    var output = {}
    var user = this.ctx.session.user
    if (user) {
      output.user = user
      output.isLogin = true
    } else  {
      output.user = null
      output.isLogin = false
    }
    this.ctx.body = this.ctx.helper.formatResult(output)
  }

  //登出
  quit() {
    this.ctx.session.user = null
    this.ctx.body = this.ctx.helper.formatResult('操作成功')
  }
 
}

module.exports = HomeController;