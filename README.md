node-kickass
============

> Query for torrents at Kickass.to with Node.js.

## Installation
Add `node-kickass` to your existing Node.js project.
```bash
npm install node-kickass --save
```

## Usage

See [examples](https://github.com/Glavin001/node-kickass/tree/master/examples) for more usage details.

Built as a [Fluent Interface](http://en.wikipedia.org/wiki/Fluent_interface).
Also known as [method chaining](http://en.wikipedia.org/wiki/Method_chaining#jQuery), 
as used in [jQuery](http://jquery.com/).

```javascript
var k = new Kickass()
.setQuery('Almost Human')   // Set search Query parameter 
.setPage(0)                 // Optional
.run(function(errors, data) {
  /*
  this  {context} => Current Context is set to be `k`.
  errors  {array} => An array of errors that occured.
  data    {array} => An array of items/articles that were read.
  */
  if (! errors.length > 0) {
    // No errors occured.
    console.log(data.length, "results");
    console.log(
      errors,     // Array of errors, will be empty array given there are no errors.
      data,       // Array of items/articles read from this `run`.
      this.items  // Array of all items/articles read that have been associated to `k`, which is the current context `this`.
      );
  } else {
    // One or more errors occured.
    console.log(errors, "errors");
  }
})

```

## Functions

- `constructor`

- `setQuery`

- `setPage`

- `setSort`

- `run`

- `wait`

-----

### Disclaimer
There are obvious legal issues, with downloading copyrighted material you do not have a license for. We do not endorse such use cases and take no responsibility for the use people make of it.
