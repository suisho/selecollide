var defaults = require("defaults")

var PseudoPseudo = function(opts){
  var options = defaults(opts, {
    prefix : "pseudo",
  })
  this.prefix = options.prefix

}

PseudoPseudo.prototype.elementReplacement = {
  "@" : "namespace",
  "(" : "lc",
  ")" : "r",
}
PseudoPseudo.prototype.classReplacement = {
  ":" : "pseudo",
}


PseudoPseudo.prototype.replaceNot = function(selector){
  return selector.replace(/:not\((.+)\)/g, "__NOT__$1")
}

PseudoPseudo.prototype.restoreNot = function(selector){
  return selector.replace(/__NOT__(\S+)+/g, ":not($1)")
}

PseudoPseudo.prototype.replaceAsElement = function(glyph){
  return this.prefix + "__" + this.elementReplacement[glyph] + "___"
}

PseudoPseudo.prototype.replaceAsClass = function(glyph){
  return "." + this.replaceAsElement(glyph)
}

PseudoPseudo.prototype.replace = function(str){
  str = this.replaceNot(str)
  for(var glyph in this.elementReplacement){
    var replaced = this.replaceAsElement(glyph)
    str = str.split(glyph).join(replaced)
  }
  for(var glyph in this.classReplacement){
    var replaced = this.replaceAsClass(glyph)
    str = str.split(glyph).join(replaced)
  }
  return str
}
PseudoPseudo.prototype.restore = function(str){
  str = this.restoreNot(str)

  for(var glyph in this.elementReplacement){
    var restored = this.replaceAsElement(glyph)
    str = str.split(restored).join(glyph)
  }
  for(var glyph in this.classReplacement){
    var restored = this.replaceAsClass(glyph)
    str = str.split(restored).join(glyph)
  }
  return str
}

module.exports = function(opts){
  return new PseudoPseudo(opts)
}
module.exports.PseudoPseudo = PseudoPseudo
