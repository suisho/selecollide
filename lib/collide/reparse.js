var parser = require("htmlparser2")
var CSSselect = require('CSSselect')

var selectOne = function(dom, query){
  return CSSselect.selectOne(query, dom, {strict : true})
}

var reparseDom = function(html){
  return parser.parseDOM(html)
}

module.exports = function(html, query){
  var dom = reparseDom(html.toString())
  return selectOne(dom, query) !== null
}
