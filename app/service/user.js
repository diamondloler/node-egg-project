const {
    Service
} = require('egg')

class UserService extends Service {
    async find(id) {
        var user = await this.app.mysql.get('userinfo', {
            id: id
        })
        return {
            user
        }
    }

    async update(id, row) {
        row.updated_at = this.app.mysql.literals.now
        await this.app.mysql.update('userinfo', row, {
            where: {
                id: id
            }
        })
    }

    async delete(id) {
        await this.app.mysql.delete('userinfo', {
            id: id
        })
    }

    async add(row) {
        const literals = this.app.mysql.literals
        row.updated_at = literals.now
        row.created_at = literals.now
        await this.app.mysql.insert('userinfo', row)
    }

    async getField(index, size) {
        var ctx = this.ctx
        var app = this.app
        const result = await app.mysql.beginTransactionScope(async conn => {
           var results = await Promise.all(
                [
                    conn.query('SELECT COUNT(*) FROM `userinfo`'), 
                    conn.query('SELECT * FROM `userinfo` LIMIT ? ,?', [size * (index - 1), size])
                ]
            )

            var count = results[0][0]['COUNT(*)']
            var userList = results[1]

            if (!userList.length) {
                count = 0
                userList = []
            }
            
            return {
                count: count,
                userList
            };

        }, ctx);
        return result;
    }
}

module.exports = UserService