var migawari = require('migawari')
var CSSselect = require('CSSselect')
var flatten = require('flatten')

var browserCollision = function(html, query){
  document.body.innerHTML = html
  return document.querySelector(query)
}

module.exports = function(seaches, selector){
  var m = migawari(selector)
  var dom = m.dom
  var extracted = seaches.filter(function(query){
    if(selector === query) return false;
    try{
      return browserCollision(m.toString(), query)
    }catch(e){}
    //console.log(require("util").inspect(dom, {depth:null}))
    return (CSSselect.selectOne(query, dom, {strict : true}) !== null)
  })
  return flatten(extracted)
}
