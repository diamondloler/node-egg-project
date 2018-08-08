module.exports = (appinfo) => {
    return async function packet(ctx, next) {
        ctx.socket.emit('res', '接受到数据包')
        await next()
    }
}