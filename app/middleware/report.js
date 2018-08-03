module.exports = options => {
    return async function report(ctx, next) {
        var start = Date.now()
        await next()
        var end = Date.now()
        var ms = end - start
        ctx.response.time = ms
    }
}