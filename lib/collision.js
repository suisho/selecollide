var migawari = require('migawari')
var CSSselect = require('CSSselect')
var flatten = require('flatten')

module.exports = function(seaches, selector){
  var m = migawari(selector)
  var dom = m.dom
  var extracted = seaches.filter(function(s){
    if(selector === s) return false;
    return (CSSselect.selectOne(s, dom, {strict : true}) !== null)
  })
  return flatten(extracted)
}
