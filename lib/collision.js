var migawari = require('migawari')
var CSSselect = require('CSSselect')
var flatten = require('flatten')

var collision = function(html, query){
  document.body.innerHTML = html
  return document.querySelector(query)
}

module.exports = function(seaches, selector){
  var m = migawari(selector)
  var dom = m.dom
  var extracted = seaches.filter(function(s){
    if(selector === s) return false;
    if(document)
    //console.log(dom, selector, s)
    //console.log(require("util").inspect(dom, {depth:null}))
    return (CSSselect.selectOne(s, dom, {strict : true}) !== null)
  })
  return flatten(extracted)
}
