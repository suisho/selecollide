var uniq = require('uniq')
var sortSpecificity = require("sort-specificity")
var defaults = require("defaults")
//var collision = require("./lib/collision")
var collision = require("./lib/collide/reparse")
var mapping = require("./lib/mapping")
var flatten = require('flatten')
var pseudo = require("pseudopseudo")

var Cache = function(){
  this.cache = {}
}

Cache.prototype.push = function(key, selector){
  var cache = this.cache[key]
  if(!cache) cache = [];
  cache.push(selector)
  this.cache[key] = cache
}

Cache.prototype.detect = function(selector, collision, defaults){
  var cache = this.cache[selector]
  if(!cache){
    return defaults
  }
  var searchs = cache.map(function(c){
    return collision[c]
  })
  searchs = uniq(flatten(searchs))

  return searchs
}

module.exports = function(selectors, option, cb){
  if(typeof option == "function" && cb === undefined){
    cb = option
    option = undefined
  }
  option = defaults(option, {
    useCache : true,
    collideFunction : collision,
    pseudoEmulator : pseudo()
  })
  var pseudoEmulator = option.pseudoEmulator

  selectors = uniq(sortSpecificity(selectors)).map(function(selector){
    return pseudoEmulator.replace(selector)
  })

  var cache =  new Cache()
  var result = {}
  var defaultTargets = selectors.concat() // copy
  selectors.forEach(function(sel){
    var searchs = defaultTargets
    if(option.useCache){
      searchs = cache.detect(sel, result, selectors)
    }
    var r = mapping(searchs, sel, option.collideFunction).sort()
    result[sel] = r

    // cache
    r.forEach(function(k){
      cache.push(k, pseudoEmulator.restore(sel))
    })
  })
  cb(null, result)
}
