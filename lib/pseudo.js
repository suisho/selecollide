var defaults = require("defaults")
/*
var Replacer = function(){}
Replacer.prototype.func = function(selector){
  return selector.replace(/\:(.+)\((.+)\)/g, "__$1__$2")
}
Replacer.prototype.map = function(){
}


var Restorer = function(){}
Restorer.prototype.func = function(selector){
  return selector.replace(/__(.+)__(\S+)/g, ":$1($2)")
}
Restorer.prototype.map = function(){
}
*/

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


PseudoPseudo.prototype.replaceFunc = function(selector){
  return selector.replace(/\:(.+)\((.+)\)/g, "__fnc__$1__$2")
}

PseudoPseudo.prototype.restoreFunc = function(selector){
  return selector.replace(/__fnc__(.+)__(\S+)/g, ":$1($2)")
}


PseudoPseudo.prototype._replace = function(glyph, array){
  return this.prefix + "__" + array[glyph] + "__"
}
PseudoPseudo.prototype.replaceAsElement = function(glyph){
  return this._replace(glyph, this.elementReplacement)
}

PseudoPseudo.prototype.replaceAsClass = function(glyph){
  return"." + this._replace(glyph, this.classReplacement)
}

PseudoPseudo.prototype.replace = function(str){
  str = this.replaceFunc(str)
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
  str = this.restoreFunc(str)

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
