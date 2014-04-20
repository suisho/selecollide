var defaults = require("defaults")
//var invert = require("invert-hash")
var PseudoPseudo = function(opts){
  var options = defaults(opts, {
    prefix : "pseudo",
  })
  this.prefix = options.prefix
}

PseudoPseudo.prototype.elementReplacement = {
  "@" : "namespace",
  "(" : "lc",
  ")" : "rc",
}
PseudoPseudo.prototype.classReplacement = {
  ":" : "colon",
}
PseudoPseudo.prototype.dataReplacement = {
  "+" : "plus",
}
// f**k
PseudoPseudo.prototype.replaceData = function(selector){
  return selector.replace(/\((.+)\+(.+)\)/g, "__val__$1__plus__$2")
}
PseudoPseudo.prototype.restoreData = function(selector){
  return selector.replace(/__val__(.+)__plus__(\S+)/g, "($1+$2)")
}

PseudoPseudo.prototype.replaceNot = function(selector){
  return selector.replace(/\:(not)\((.+)\)/g, "__fnc__$1__$2")
}
PseudoPseudo.prototype.restoreNot = function(selector){
  return selector.replace(/__fnc__(not)__(\S+)/g, ":$1($2)")
}

PseudoPseudo.prototype.replaceFunc = function(selector){
  selector = this.replaceData(selector)
  return selector.replace(/\:(.+)\((.+)\)/g, ".__fnc__$1__$2")
}

PseudoPseudo.prototype.restoreFunc = function(selector){
  selector = this.restoreData(selector)
  return selector.replace(/\.__fnc__(.+)__(\S+)/g, ":$1($2)")
}


PseudoPseudo.prototype._replace = function(key, array){
  return this.prefix + "__" + array[key] + "__"
}
PseudoPseudo.prototype.replaceAsElement = function(key){
  return this._replace(key, this.elementReplacement)
}

PseudoPseudo.prototype.replaceAsClass = function(key){
  return"." + this._replace(key, this.classReplacement)
}

PseudoPseudo.prototype.replaceHash = function(str, hash, fn){
  for(var key in hash){
    var replaced = fn.call(this, key)
    str = str.split(key).join(replaced)
  }
  return str
}
PseudoPseudo.prototype.restoreHash = function(str, hash, fn){
  for(var key in hash){
    var restored = fn.call(this, key)
    str = str.split(restored).join(key)
  }
  return str
}
PseudoPseudo.prototype.replace = function(str){
  str = this.replaceNot(str)
  str = this.replaceFunc(str)

  str = this.replaceHash(str, this.elementReplacement, this.replaceAsElement)
  str = this.replaceHash(str, this.classReplacement, this.replaceAsClass)

  return str
}
PseudoPseudo.prototype.restore = function(str){
  str = this.restoreNot(str)
  str = this.restoreFunc(str)

  str = this.restoreHash(str, this.elementReplacement, this.replaceAsElement)
  str = this.restoreHash(str, this.classReplacement, this.replaceAsClass)
  return str
}

module.exports = function(opts){
  return new PseudoPseudo(opts)
}
module.exports.PseudoPseudo = PseudoPseudo
