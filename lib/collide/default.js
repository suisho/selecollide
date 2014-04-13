var CSSselect = require('CSSselect')

var selectOne = function(dom, query){
  return CSSselect.selectOne(query, dom, {strict : true})
}
//  target object
module.exports = function(selectorObj, query){
  var one = selectOne(selectorObj, query)
  console.log(selectorObj.toString(), query)
  return (one !== null)
}
