var Kickass = require("../index.js");

var k = new Kickass()
.setQuery('Almost Human')
.setPage(0) // Optional
.run(function(errors, data) {
    /*
    if (! errors.length > 0) {
        console.log(data.length, "results");
    } else {
        console.log(errors, "errors");
    }
    */
    console.log(errors, data.length, this.items.length);
})

// TODO
//.wait() // FIXME
/*
.setPage(1)
.run(function(errors, data) {
    console.log(errors, data.length, this.items.length);
})
.wait()
.setPage(2)
.run(function(errors, data) {
    console.log(errors, data.length, this.items.length);
})
*/