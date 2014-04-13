var parser = require("htmlparser2")
var CSSselect = require('CSSselect')

var selectOne = function(dom, query){
  return CSSselect.selectOne(query, dom, {strict : true})
}

module.exports = function(html, query){
  var dom = parser.parseDOM(html.toString())
  return selectOne(dom, query) !== null
}
