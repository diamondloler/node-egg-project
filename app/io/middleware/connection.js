module.exports = (appinfo) => {
    return async function connection(ctx, next) {
        ctx.socket.emit('res', '连接成功')
        await next()
        console.log('连接断开')
    }
}