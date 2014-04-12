var migawari = require('migawari')
var CSSselect = require('CSSselect')
var flatten = require('flatten')

var isCollide = function(dom, query){
  return (CSSselect.selectOne(query, dom, {strict : true}) !== null)
}

module.exports = function(seaches, selector){
  var dom = migawari(selector, {
    dummy : "dummyelement"
  }).dom
  var extracted = seaches.filter(function(query){
    if(selector === query) return true;
    return isCollide(dom, query)
  })
  return flatten(extracted)
}
