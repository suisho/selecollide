var CSSselect = require('CSSselect')
var selectOne = function(dom, query){
  return CSSselect.selectOne(query, dom, {strict : true})
}
//  target object
module.exports = function(selectorObj, query){
  var one = selectOne(selectorObj.dom, query)
  return (one !== null)
}
