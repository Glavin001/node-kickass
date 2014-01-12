var Kickass = require("../index.js");

var k = new Kickass({'query':'Almost Human'});
// k.query = "Almost Human";
k.run(function(error, data) {
    //console.log(data);
    console.log(error);
});