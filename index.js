var migawari = require('migawari')
var CSSselect = require('CSSselect')
var flatten = require('flatten')
var uniq = require('uniq')
var sortSpecificity = require("sort-specificity")
var defaults = require("defaults")

var Cache = function(selectors){
  this.selectors = selectors
  this.cache = {}
}

Cache.prototype.push = function(key, selector){
  var cache = this.cache[key]
  if(!cache) cache = [];
  cache.push(selector)
  this.cache[key] = cache
}

Cache.prototype.detect = function(selector, collision){
  var cache = this.cache[selector]
  var searchs = this.selectors
  if(cache){
    searchs = cache.map(function(c){
      return collision[c]
    })
    searchs = flatten(uniq(searchs))
  }
  return searchs
}

module.exports = function(selectors, option){
  option = defaults(option, {
    useCache : true
  })
  selectors = sortSpecificity(selectors)
  var cache =  new Cache(selectors)
  var result = {}

  selectors.forEach(function(sel){
    var searchs = selectors
    if(option.useCache){
      searchs = cache.detect(sel, result)
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
var collision = function(sortedSelectors, selector){
  var dom = migawari(selector).dom
  if(dom.length !== 1){
    throw new Error("Invalid selector " + selector)
  }
  var extracted = sortedSelectors.filter(function(s){
    if(selector === s) return false;
    return (CSSselect.is(dom[0], s, {strict : true}))
  })
  return flatten(extracted)
}
