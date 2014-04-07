var migawari = require('migawari')
var CSSselect = require('CSSselect')
var flatten = require('flatten')
var uniq = require('uniq')
var sortSpecificity = require("sort-specificity")
var defaults = require("defaults")

var detectSearch = function(selector, caches, collision){
  var cache = caches[selector]
  var searchs
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
  var result = {}
  var cache = {}
  selectors = sortSpecificity(selectors)
  selectors.forEach(function(sel){
    var searchs = selectors
    if(option.useCache){
      var cached = detectSearch(sel, cache, result)
      if(cached){
        searches = cached
      }
    }
    var r = collision(searchs, sel).sort()
    result[sel] = r

    // cache
    r.forEach(function(k){
      if(!cache[k]) cache[k] = [];
      cache[k].push(sel)
    })
  })
  return result
}
var collision = function(sortedSelectors, selector){
  var dom = migawari(selector).dom[0]
  var extracted = sortedSelectors.filter(function(s){
    if(selector === s) return false;
    return (CSSselect.is(dom, s, {strict : true}))
  })
  return flatten(extracted)
}
