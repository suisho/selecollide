var seleflict = require("../index")
var assert = require("assert")
describe("", function(){
  it("basic", function(){
    seed = [
      "a", "a.foo"
    ]
    assert.deepEqual(
      { 'a.foo': [ 'a' ], a: [] },
      seleflict(seed)
    )
  })
  it("with comma", function(){
    var seed = [
      "a, b"
    ]
    var expect = {
      "a" : [],"b":[]
    }
    assert.deepEqual(expect, seleflict(seed) )
  })
  it("with comma", function(){
    var seed = [
      "a, a.foo, a.foo"
    ]
    var expect = { 'a.foo': [ 'a' ], a: [] }
    assert.deepEqual(expect, seleflict(seed) )
  })
  it("useCache", function(){
    var seed = [
      "a",
      "a.foo",
      "a .foo",
      ".baz",
      ".baz#bar",
      "div.baz#bar",
      "a.baz#bar",
      "b.baz#bar",
      ".foo",
      "div.foo",
      ".baz.foo",
      "a i#bar",
      "i#bar a",
      "div",
      "i#bar",
      "#bar",
      ".foo .baz",
      ".foo.baz#bar a",
    ]
    var a = seleflict(seed)
    var b = seleflict(seed, {useCache :true})
    assert.deepEqual(a,b)
  })
})
