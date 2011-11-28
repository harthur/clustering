var fs = require("fs"),
    path = require("path"),
    browserify = require("browserify");
    
var pkg = JSON.parse(fs.readFileSync("package.json"));

exports.build = function(dest) {
   var source = browserify.bundle({
     require: [path.join(__dirname, pkg.main)],
   });
   source = "/* MIT license */\nvar clusterfck = (function() {"
            + source + " return require('/clusterfck')})();"
   fs.writeFileSync(dest, source);
}