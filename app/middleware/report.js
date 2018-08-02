module.exports = options => {
    return async function report(ctx, next) {
        var start = Date.now()
        await next()
        console.log('report')
        var end = Date.now()
        var ms = end - start
        ctx.set('x-response-time', ms + 'ms')
    }
}