var uniq = require('uniq')
var sortSpecificity = require("sort-specificity")
var defaults = require("defaults")
var collision = require("./lib/collision")
var flatten = require('flatten')

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

module.exports = function(selectors, option){
  option = defaults(option, {
    useCache : true
  })
  selectors = uniq(sortSpecificity(selectors))
  var cache =  new Cache()
  var result = {}
  var defaultTargets = selectors.concat() // copy
  selectors.forEach(function(sel){
    var searchs = defaultTargets
    if(option.useCache){
      searchs = cache.detect(sel, result, selectors)
    }
    var r = collision(searchs, sel).sort()
    result[sel] = r

    // cache
    r.forEach(function(k){
      cache.push(k, sel)
    })
  })
  return result
}
