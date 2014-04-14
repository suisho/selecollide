// for test collision function.
// (very strictry but so heavy)
module.exports = function(obj, query){
  var html = obj.toString()
  var jsdom = require("jsdom")
  var document = jsdom.jsdom("<html><body>")
  document.body.innerHTML = html
  var selector = document.querySelector(query)
  return (selector !== null)
}
