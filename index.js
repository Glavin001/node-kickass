/**

*/
var FeedParser = require('feedparser')
  , request = require('request');

function Kickass (options) {
    if (!(this instanceof Kickass)) return new Kickass(options);

    options = options || { };
    this.query = options.query || "";
    this.page = options.page || 0;
    
    return this;
};

Kickass.prototype.query = "";
Kickass.prototype.page = 0;
Kickass.prototype.request = null;
Kickass.prototype.results = [ ];
Kickass.prototype.errors = [ ];

Kickass.prototype.getUrl = function() {
    var url = "http://kickass.to/usearch123/"+this.query+"/"+this.page+"/?rss=1";
    return url;
};

Kickass.prototype.run = function(callback) {
    var self = this;
    //console.log(self.getUrl());
    var url = self.getUrl();
    
    self.request = request(url)
      .pipe(new FeedParser())
      .on('error', function(error) {
        // always handle errors
        //console.log(error);
        //return callback && callback(error, null);
        self.errors.push(error);
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
          //console.log('Got article: %s', item.title || item.description);
          //console.log(item);
          self.results.push(item);
        }
        //return callback && callback(null, self);
      })
      .on('end', function() {
        return callback && callback(self.errors, self.results);
      });

      return self;
};

exports = module.exports = Kickass;