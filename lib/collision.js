var migawari = require('migawari')
var CSSselect = require('CSSselect')
var flatten = require('flatten')

module.exports = function(seaches, selector){
  var m = migawari(selector)
  var dom = m.dom
  var extracted = seaches.filter(function(query){
    if(selector === query) return false;
    return (CSSselect.selectOne(query, dom, {strict : true}) !== null)
  })
  return flatten(extracted)
}
