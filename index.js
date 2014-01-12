/**

*/
var FeedParser = require('feedparser')
  , request = require('request');

function Kickass (options) {
    if (!(this instanceof Kickass)) 
        return new Kickass(options);

    options = options || { };

    this.setQuery(options.query);
    this.setPage(options.page);
    this.setSort(options.sort);    

    return this;
};

Kickass.prototype.query = "";
Kickass.prototype.page = 0;
Kickass.prototype.sort = {
    field: "seeders",
    sorder: "desc"
}
Kickass.prototype.requests = [ ];
Kickass.prototype.items = [ ];

Kickass.prototype.setQuery = function(query) {
    if (!!query) {
        this.query = query;
    }
    return this;
};

Kickass.prototype.setPage = function(page) {
    if (!!page) {
        this.page = page;
    }
    return this;
};

Kickass.prototype.setSort = function(sort) {
    if (!!sort) {
        this.sort = sort;
    }
    return this;
};

Kickass.prototype.getUrl = function() {
    var url = "http://kickass.to/usearch/"+this.query+"/"+this.page+"/?rss=1&field="+this.sort.field+"&sorter="+this.sort.sorder;
    return url;
};

Kickass.prototype.run = function(callback) {
    
    //console.log(self.getUrl());
    //console.log(url);

    (function (self) {
        var url = self.getUrl();
        var errors = [ ];
        var results = [ ];
        
        self.requests.push( 
            request(url, function(error, response, body) {
                //console.log(response.statusCode);
                //console.log(error, response, body);
            })
              .pipe(new FeedParser())
              .on('error', function(error) {
                // always handle errors
                //console.log(error);
                //return callback && callback(error, null);
                errors.push(error);
              })
              .on('meta', function (meta) {
                // do something
                //console.log(meta);
                //return callback && callback(null, meta);
              })
              .on('readable', function () {
                // do something else, then do the next thing
                var stream = this, item;
                while (item = stream.read()) {
                  self.items.push(item);
                  results.push(item);
                }
                //return callback && callback(null, self);
              })
              .on('end', function() {
                // Remove this request
                var index = self.requests.indexOf(this);
                if (index > -1) {
                    self.requests.splice(index, 1);
                }
                //
                return callback && callback.apply(self, [errors, results]);
              })
          );

        })(this);

      return this;
};

/**
FIXME: This locks up Node.js
*/
Kickass.prototype.wait = function(callback) {
    //
    while ( this.requests.length > 0 ) {
        //console.log("Waiting");
    }
    //
    callback && callback.apply(this, []);
    //
    return this;
};

exports = module.exports = Kickass;