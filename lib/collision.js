var migawari = require('migawari')
var CSSselect = require('CSSselect')
var flatten = require('flatten')

module.exports = function(seaches, selector){
  var m = migawari(selector)
  var doms = m.dom
  var dom = doms[0]
  var extracted = seaches.filter(function(s){
    if(selector === s) return false;
    //console.log(dom)
    //console.log(CSSselect.is(dom, s, {strict : true}))
    //return;

    return (CSSselect.is(dom, s, {strict : true}))
  })
  return flatten(extracted)
}
