var assert = require("assert")
var migawari = require("migawari")
var setupSelector = require("../lib/setup_selector")

var defaultFn = require("../lib/collide/default")
var reparseFn = require("../lib/collide/reparse")
var jsdomFn = require("./jsdom_collide")

describe("collision", function(){
  var assertNotCollide = function(target, query){
    _assertCollide(target, query ,true)
  }
  var assertCollide = function(target, query){
    _assertCollide(target, query)
  }

  var _assertCollide = function(target, query, not){
    var selectorObj = setupSelector(target)
    var results = {}
    // compabilty check
    var defaults = defaultFn(selectorObj, query)
    var reparse = reparseFn(selectorObj, query)
    var jsdom = jsdomFn(selectorObj, query)
    assert.equal(defaults, reparse)
    assert.equal(defaults, jsdom)
    // result check
    if(not){
      assert(!defaults)
    }else{
      assert(defaults)
    }
  }

  describe("basic", function(){
    it("parent", function(){
      //console.log(require("migawari")("a b p").toString()
      assertCollide("a b", "a")
    })
    it("child", function(){
      assertCollide( "a b","b")
    })
  })

  it("class", function(){
    assertCollide("a.foo", ".foo")
  })

  it("universal class and div", function(){
    assertNotCollide("div", ".foo")
  })

  it("universal selector (star)", function(){
    assertCollide("a", "*")
    assertCollide(".foo", "*")
    assertCollide("#id", "*")
    assertCollide("a b", "*")
  })

  it("dummy div", function(){
    assertNotCollide("a b", "div")
  })

  it("jump elment", function(){
    assertCollide("a b p", "p" )
    assertCollide("a b p", "a p")
  })
  describe("same selector", function(){
    it("single selector", function(){
      assertCollide("b", "b")
    })
    it("child selector", function(){
      assertCollide("a > b", "a > b")
    })
    it("brother selector", function(){
      assertCollide("b + p", "b + p")
    })
  })
  it("sibilings", function(){
    assertNotCollide("a b ~ p", "b + p")
    assertCollide("a b ~ p", "b ~ p")
  })
  it("brother", function(){
    assertCollide("a b + p", "b + p")
    assertCollide("a b + p", "b ~ p")
  })
})
