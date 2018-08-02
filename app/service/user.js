const { Service } = require('egg')

class UserService extends Service {
    async find(id) {
        var user  = await this.app.mysql.get('userinfo', {id: id})
        console.log(user)
        return { user }
    }

    async update(id, row) {
        row.updated_at = this.app.mysql.literals.now
        await this.app.mysql.update('userinfo', row, {where: {id: id}})
    }

    async add(row) {
        const literals = this.app.mysql.literals
        row.updated_at = literals.now
        row.created_at = literals.now
        await this.app.mysql.insert('userinfo', row)
    }
}

module.exports = UserService