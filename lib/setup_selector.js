var migawari = require('migawari')

module.exports = function(selector){
  //selector = "dummyroot " + selector
  return migawari(selector, {
    dummy : "dummyelement"
  })
}
