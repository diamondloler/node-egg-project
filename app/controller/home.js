'use strict';
const Controller = require('egg').Controller;
const fs = require('fs')
const path = require('path')

class HomeController extends Controller {

  //渲染主页
  async index() {
    var renderPower = {
      renderIf: {
        isTrue: false,
      },
      renderFor:  [1, 2, 3, 4],
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
    var ctx = this.ctx
    var id = ctx.query.id || 0
    var result = await ctx.service.user.find(id)
    ctx.status = 200
    ctx.body = result
  }

  //更新用户信息
  async updateUserInfo() {
    var ctx = this.ctx
    var data = ctx.request.body
    var id = data.id
    var msg = ''

    delete data.id

    if (parseInt(id) === 0) {
      await ctx.service.user.add(data)
      msg = '新增成功'
    } else {
      await ctx.service.user.update(id, data)
      msg = '修改成功'
    }

    ctx.body = {msg: msg}
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
}

module.exports = HomeController;
