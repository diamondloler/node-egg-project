module.exports = {
    set time(v) {
        this.set('x-response-time', v + 'ms')
    }
 }