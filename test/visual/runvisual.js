var connect = require('connect'),
    fs = require("fs"),
    path = require("path"),
    sys = require("sys"),
    build = require("../../build");

var root = path.join(__dirname, "files");
build.build(path.join(root, "/clusterfck.js"));

connect.createServer(
  connect.static(root)
).listen(3000);

sys.puts("visit http://127.0.0.1:3000/vis.html");