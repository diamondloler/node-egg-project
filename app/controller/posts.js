const Controller = require('egg').Controller

class PostsController extends Controller {
    async index() {
        var ctx = this.ctx
        ctx.status = 200
        ctx.body = '[1, 2, 3, 4, 5]'
    }

    async show() {
        var ctx = this.ctx
        ctx.status = 200
        ctx.body = ctx.params.id
    }

    async create() {
        console.log(this.ctx.request.body, '请求头部')
        var createRule = {
            title: {
                type: 'string'
            },
            content: {
                type: 'string'
            }
        }
        this.ctx.validate(createRule)
        this.ctx.body = {name: 'Alex Cheung', sex: 'man'}
        this.ctx.status = 200
    }
}

module.exports = PostsController