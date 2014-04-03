var selectollid = require("../index")
var uniq = require("uniq")
var assert = require("assert")
describe("", function(){
  it("", function(){
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
    var a = selectollid(seed)
    var b = selectollid(seed, {speed :true})
    assert.deepEqual(a,b)
    return
    /*Object.keys(result).forEach(function(k){
      var arr = result[k]
      var union = []
      arr.forEach(function(ak){
        union = union.concat(result[ak])
      })
      union = uniq(union).sort()
      assert.deepEqual(arr.sort(), union, k)
    })*/
  })
})
