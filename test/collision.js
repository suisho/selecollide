var collision = require("../lib/collision")
var assert = require("assert")


describe("collision", function(){
  var isCollide = function(searchs , scapegoat){
    var result = collision([searchs], scapegoat)
    return (result[0] == searchs)
  }
  it("basic", function(){
    //console.log(require("migawari")("a b p").toString())
    assert(isCollide("a", "a b"))
    assert(isCollide("b", "a b"))
    assert(isCollide("p", "a b p"))
  })
})
