var specificity = require('specificity')
var pseudoEmulator = require('../lib/pseudo.js')
var assert = require('assert')

// unit test
describe("unit test", function(){
  var assertion = function(selector, replaced){
    var pseudo = pseudoEmulator()
    var replacedActual = pseudo.replace(selector)
    assert.equal(replaced, replacedActual)
    var restore = pseudo.restore(replacedActual)
    assert.equal(restore, selector)
  }
  it("replace pseudo", function(){
    assertion(".foo:active", ".foo.pseudo__colon__active")
  })
  it("replace function", function(){
    assertion(".foo:not(.hoge)",".foo__fnc__not__.hoge")
  })
})

// combined test
var conbined = [
  '.foo:hoge',
  '@font-face',
  'div:not(.outer) .inner',
  'audio:not([controls])'
]
conbined.forEach(function(selector){
  describe(selector, function(){
    it('same specificity', function(){
      var dummy = pseudoEmulator().replace(selector)
      var beforeSpecify = specificity.calculate(selector)
      var dummySpecify = specificity.calculate(dummy)
      assert.deepEqual(
        dummySpecify[0].specificity,
        beforeSpecify[0].specificity
      )
    })
    it('restore', function(){
      var pseudo = pseudoEmulator()
      var replaced = pseudo.replace(selector)
      var restore = pseudo.restore(replaced)
      assert.equal(restore, selector)
    })

  })
})
