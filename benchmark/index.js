var seleflict = require("../index")
var fixture = require("./fixture/tiny.js")

suite("use cache performacnce", function(){
  var countPatterns = [10,20,30,100]//,200]
  countPatterns.forEach(function(count){
    var seed = fixture.slice(0,count)
    bench("use: " + count, function(done){
      seleflict(seed, function(err, result){
        done()
      })
    })
    bench("not use: " + count, function(done){
      seleflict(seed, {useCache:false}, function(err, result){
        done()
      })
    })
  })

})
