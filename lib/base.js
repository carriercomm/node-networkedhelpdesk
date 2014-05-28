function BaseObject(options) {
  for (var i in options) {
    if (this.constructor._fields.indexOf(i) !== -1) {
      this[i] = options[i]
    }
  }
}

module.exports = BaseObject
