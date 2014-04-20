var pseudo = require("../index")
var CSSwhat = require("CSSwhat")
var slick = require("slick")
var specificity = require("specificity")
var chunkwhat = require("chunkwhat")

var CssSelectorParser = require('css-selector-parser').CssSelectorParser
var csp = new CssSelectorParser();
csp.registerSelectorPseudos('has');
csp.registerNestingOperators('>', '+', '~');
csp.registerAttrEqualityMods('^', '$', '*', '~');
csp.enableSubstitutes();


var selector = function(){
  var rand = Math.ceil(Math.random() * 1000000000)
  return "a > b:active + #c ~ .d, i p .rand_"+ rand
}



suite("parser", function(){
  bench("pseudopseudo", function(){
    pseudo(selector())
  })
  bench("CSSwhat", function(){
    CSSwhat(selector())
  })
  bench("slick", function(){
    slick.parse(selector())
  })
  bench("specificity", function(){
    specificity.calculate(selector())
  })
  bench("csp", function(){
    csp.parse(selector())
  })
  bench("chunkwhat", function(){
    chunkwhat(selector())[0]//.stringify()
  })
})
suite("extra", function(){
  var p
  before(function(){
    p = CSSwhat(selector())
  })
  bench("chunkwhat", function(){
    chunkwhat(p)[0]//.stringify()
  })
})
