const zlib = require('zlib');

module.exports = options => {
    return async function gzipCompress(ctx, next) {
        await next();

        var body = ctx.body

        if (!body) return;
        if (body.length == 0 || body.length > options.threshold) return;

        if (typeof body === 'object' && body !== null) {
            //是对象但不是buffer
            if (!(body instanceof Buffer)) {
                body = JSON.stringify(body)
            } 
        } else {
            //普通值转换成字符串
            body = String(body)
        }
    
        var stream = zlib.createGzip()
        stream.end(body)
        
        ctx.body = stream     
        ctx.set('Content-Encoding', 'gzip');
    }
}