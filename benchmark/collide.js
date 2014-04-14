var seleflict = require("../index")
var fixture = require("./fixture/gh.js")
var reparseFn = require("../lib/collide/reparse")
var defaultFn = require("../lib/collide/default")
var setupSelector = require("../lib/setup_selector")
suite("reparse vs defaults", function(){
  var obj = setupSelector("a b + .c > #d ~ .e")
  bench("default", function(){
    defaultFn(obj, "b")
  })
  bench("reparse", function(){
    reparseFn(obj, "b")
  })
})
