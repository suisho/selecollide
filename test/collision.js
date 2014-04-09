var collision = require("../lib/collision")
var assert = require("assert")


describe("collision", function(){
  it("", function(){
    //"a", "a.foo"

    assert.deepEqual(["a", "b"], collision(["a", "b"], "a b"))
  })
})
