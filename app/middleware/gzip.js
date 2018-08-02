const zlib = require('zlib');

module.exports = options => {
    return async function gzipCompress(ctx, next) {
        await next();
        if (!ctx.body) return;

        if (ctx.body.length == 0 || ctx.body.length > options.threshold) return;

        var body = ctx.body

        if (typeof body === 'object' && body !== null) {
            //是对象但不是buffer
            if (!(body instanceof Buffer)) {
                body = JSON.stringify(ctx.body)
            } 

        } else {
            //普通值转换成字符串
            body = String(ctx.body)
        }
    
        var stream = zlib.createGzip()

        stream.end(body)
        ctx.body = stream     
        ctx.set('Content-Encoding', 'gzip');
    }
}