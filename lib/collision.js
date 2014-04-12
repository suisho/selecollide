var migawari = require('migawari')
var CSSselect = require('CSSselect')
var flatten = require('flatten')

module.exports = function(seaches, selector){
  var m = migawari(selector, {
    dummy : "dummyelement"
  })
  var dom = m.dom
  //console.log(m.toString())
  var extracted = seaches.filter(function(query){
    return (CSSselect.selectOne(query, dom, {strict : true}) !== null)
    if(selector === query) return true;
  })
  return flatten(extracted)
}
