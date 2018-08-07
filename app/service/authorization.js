const {
    Service
} = require('egg')

class Authorization extends Service {
    async findOne(data) {
        var result = await this.app.mysql.get('auth', {
            uid: data.uid,
            provider: data.provider
        })
        return result
    }
 }

module.exports = Authorization