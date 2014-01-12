var assert = require("assert");
var Kickass = require("../index.js");

describe('Search', function() {
  describe('#Query()', function() {
    
    it('should query without error', function(done) {

        var k = new Kickass({'query':'Almost Human'});
        // k.query = "Almost Human";
        k.run(function(error, data) {
            //console.log(data);
            if (!error) {
                done();
            }
        });

    })

  })
})