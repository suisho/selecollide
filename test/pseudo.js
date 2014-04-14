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
  it("pseudo", function(){
    assertion(".foo:active", ".foo.pseudo__colon__active")
  })
  it("not", function(){
    assertion(".foo:not(.hoge)",".foo__fnc__not__.hoge")
  })
  it("nth", function(){
    assertion("tr:nth-child(3)","tr.__fnc__nth-child__3")
  })
})

// combined test
var conbined = [
  '.foo:hoge',
  '@font-face',
  'div:not(.outer) .inner',
  'audio:not([controls])',
  'tr:nth-child(3) ',
  //'tr:nth-child(2n+1) ', // wait specificity update
]
conbined.forEach(function(selector){
  describe(selector, function(){
    it('same specificity', function(){
      var dummy = pseudoEmulator().replace(selector)
      var beforeSpecify = specificity.calculate(selector)
      var dummySpecify = specificity.calculate(dummy)
      try{
        assert.deepEqual(
          dummySpecify[0].specificity,
          beforeSpecify[0].specificity
        )
      }catch(e){
        var util = require("util")
        //debug info
        console.log(beforeSpecify[0].parts)
        console.log(dummySpecify[0].parts)
        throw e
      }
    })
    it('restore', function(){
      var pseudo = pseudoEmulator()
      var replaced = pseudo.replace(selector)
      var restore = pseudo.restore(replaced)
      assert.equal(restore, selector)
    })

  })
})
