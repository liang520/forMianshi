var fs = require('fs');
var thunkify = require('thunkify');
var readFile = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFile('./README.md');
  console.log(r1.toString());
  var r2 = yield readFile('./node_modules/thunkify/index.js');
  console.log(r2.toString());
};


function run(fn) {
    var gen = fn();
    function next(err, data) {
      var result = gen.next(data);
      if (result.done) return;
      result.value(next);
    }
  
    next();
  }
  run(gen);