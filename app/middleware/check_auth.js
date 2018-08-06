module.exports = (options) => {
    return async function checkAuth(ctx, next) {
        if (!ctx.session.user) {
            ctx.body = ctx.helper.formatResult(null, '请先登陆', 0)
            return
        } else {
            await next()
        }
    }
}