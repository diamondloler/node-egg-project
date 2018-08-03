module.exports = {
    formatResult(data, msg, status) { 
        return {
            status: status === 0 ? 0 : 1,
            data: data || null,
            msg: msg || '获取成功'
        }
    }
}