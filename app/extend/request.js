module.exports = {
    get fqo() {
        return this.get('X-Requested-With');
    }
}