var specificity = require('specificity')
var pseudoEmulator = require('../lib/pseudo.js')
var assert = require('assert')

var tests = [
  '.foo:hoge',
  '@font-face',
  'div:not(.outer) .inner',
  'audio:not([controls])'
]


tests.forEach(function(selector){
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
