const {
    Service
} = require('egg')

class Authorization extends Service {
    async findOne(data) {
        var result = await this.app.mysql.get('passport_auth', {
            uid: data.uid,
            provider: data.provider
        })
        return result
    }
 }

module.exports = Authorization