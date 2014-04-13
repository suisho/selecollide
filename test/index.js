var seleflict = require("../index")
var assert = require("assert")
describe("", function(){
  it("basic", function(done){
    seed = [
      "a", "a.foo"
    ]
    seleflict(seed, function(err, result){
      assert.deepEqual(result, { 'a.foo': [ 'a','a.foo' ], a: ["a"] })
      done()
    })
  })
  it("with comma", function(done){
    var seed = [
      "a, b"
    ]
    var expect = {
      "a" : ["a"],"b":["b"]
    }
    seleflict(seed, function(err, result){
      assert.deepEqual(expect, result)
      done()
    })
  })
  it("with comma", function(done){
    var seed = [
      "a, a.foo, a.foo"
    ]
    var expect = { 'a.foo': [ 'a','a.foo' ], a: ['a'] }
    seleflict(seed, function(err, result){
      assert.deepEqual(expect, result)
      done()
    })
  })
  it("useCache", function(done){
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
    seleflict(seed, function(err, a){
      seleflict(seed, {useCache :true}, function(err, b){
        assert.deepEqual(a,b)
        done()
      })
    })
  })
})
