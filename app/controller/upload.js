const path = require('path');
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;
const fs = require('fs')
const pump = require('mz-modules/pump')

class UploadController extends Controller {
    async uploadImg() {
        var ctx = this.ctx
        var app = this.app

        //上传单个文件时，获取数据流的方式
        // var stream = await ctx.getFileStream()

        var mutiPart = ctx.multipart({
            autoFields: true
        });

        var files = []

        var receive = async function () {
            var stream = await mutiPart()
            if (stream == null) return
            var target = path.join(app.baseDir, 'app/public/upload/' + stream.filename)
            var writeStream = fs.createWriteStream(target)
            await pump(stream, writeStream)
            files.push({
                url: ctx.host + '/public/upload/' + stream.filename,
                name: stream.filename
            })
            return receive()
        }

        await receive()
        
        ctx.body = {
            files: files,
            field: mutiPart.field
        }

        ctx.status = 200
    }
}

module.exports = UploadController;