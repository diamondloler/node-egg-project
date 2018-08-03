const Subscription = require('egg').Subscription
const fs = require('fs')
const path = require('path')
const glob = require('glob')
class RemoveImg extends Subscription {
    static get schedule() {
        return {
            type: 'worker',
            interval: '5s',
            disable: true
        }
    }

    async subscribe() {
        var files = glob.sync(path.resolve(__dirname, '../public/upload/*'))
        var len = files.length      
        if (len > 0) {
            var randomIndex = Math.floor(Math.random() * (len - 1))
            var filePath = files.splice(randomIndex, 1)
            fs.unlinkSync(filePath[0])
            this.ctx.logger.info('operate successful')
        } else {
            this.ctx.logger.info('This upload files has been deleted')
        }    
    }
}

module.exports = RemoveImg