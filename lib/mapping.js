var CSSselect = require('CSSselect')
var flatten = require('flatten')
var setupSelector = require("./setup_selector")

module.exports = function(seaches, selector, collide){
  var dom = setupSelector(selector)
  var extracted = seaches.filter(function(query){
    if(selector === query) return true;
    return collide(dom, query)
  })
  return flatten(extracted)
}
