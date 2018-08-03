
const Key = Symbol('Application#Key');

module.exports = {
    get Key() {
        if (!this[Key]) {
            this[Key] = this.config.keys
        }
        return this[Key]
    }
}