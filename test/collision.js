var collision = require("../lib/collision")
var assert = require("assert")
var migawari = require("migawari")
var setupSelector = require("../lib/setup_selector")
var reparse = require("../lib/collide/reparse")
describe("collision", function(){
  var isCollide = function(query , target){
    var selectorObj = setupSelector(target)
    //console.log(require("util").inspect(selectorObj, {depth:null}))
    //return collision(selectorObj, query)
    return reparse(selectorObj, query)
  }

  it("basic", function(){
    //console.log(require("migawari")("a b p").toString())
    assert(isCollide("a", "a b"))
  })
  it("basic", function(){
    assert(isCollide("b", "a b"))
  })
  it("class", function(){
    assert(isCollide(".foo", "a.foo"))
  })
  it("universal class and div", function(){
    //assert(!isCollide("div", ".foo")) // Hmmmmm
  })
  it("dummy div", function(){
    assert(!isCollide("div", "a b"))
  })

  it("jump elment", function(){
    assert(isCollide("p", "a b p"))
    assert(isCollide("a p", "a b p"))
  })
  describe("same selector", function(){
    it("single selector", function(){
      assert(isCollide("b", "b"))
    })
    it("child selector", function(){
      assert(isCollide("a > b", "a > b"))
    })
    it("brother selector", function(){
      assert(isCollide("div > b + p", "div > b + p")) // failed...
    })
  })
  it("sibilings", function(){
    assert(!isCollide("b + p", "a b ~ p"))
    assert(isCollide("b ~ p", "a b ~ p"))
  })
  it("brother", function(){
    assert(isCollide("b + p", "a b + p"))
    assert(isCollide("b ~ p", "a b + p"))
  })
})
