var seleflict = require("../index")
var fixture = require("./fixture/gh.js")

suite("selflict", function(){
  bench("basic 10", function(done){

    seleflict(fixture.slice(0,10), function(err, result){
      done()
    })
  })
})
