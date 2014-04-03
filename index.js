var migawari = require('migawari')
var CSSselect = require('CSSselect')
var flatten = require('flatten')
var uniq = require('uniq')
var sortSpecificity = require("sort-specificity")
var defaults = require("defaults")



module.exports = function(selectors, option){
  option = defaults(option, {
    speed : false
  })
  var result = {}
  var cache = {}
  selectors = sortSpecificity(selectors)
  selectors.forEach(function(sel){
    var searchs = selectors
    if(option.speed){
      var caches = cache[sel]
      if(caches){
        searchs = uniq(flatten(caches.map(function(c){
          return result[c]
        })))
      }
    }
    var r = collision(searchs, sel).sort()
    result[sel] = r
    r.forEach(function(k){
      if(!cache[k]) cache[k] = [];
      cache[k].push(sel)
    })
  })
/*  console.log(result)
  console.log("+++++++++++")
  console.log(map)
*/
  return result
}
var collision = function(sortedSelectors, selector){
  var dom = migawari.domtree(selector)

  var extracted = sortedSelectors.filter(function(s){
    if(selector === s) return false;
    //console.log( s, selector)

    return (CSSselect.selectOne(s, dom, {strict : true}) !== null)
  })
  return flatten(extracted)
}
