var clusterfck = require("../../../lib/clusterfck.js");

var colors = [
   { color: [255, 255, 255], freq: 300 },
   { color: [253, 253, 253], freq: 500 },
   { color: [120, 130, 255], freq: 700 },
   { color: [120, 130, 40], freq: 70 },
   { color: [23, 30, 10], freq: 9 },
   { color: [250, 255, 246], freq: 90 },
   { color: [255, 255, 245], freq: 100 },
   { color: [31, 30, 12], freq: 13 },
   { color: [14, 20, 1], freq: 23 },
];

var distance = function(c1, c2) {
   return Math.sqrt(Math.pow(c2.color[0] - c1.color[0], 2)
     + Math.pow(c2.color[1] - c1.color[1], 2)
     + Math.pow(c2.color[2] - c1.color[2], 2));
}

exports.testCallback = function(test) {
   var clusters = clusterfck.hcluster(colors, distance, "single");
   var expected = {"left":{"left":{"left":{"left":{"value":{"color":[253,253,253],"freq":500},"size":1},"right":{"value":{"color":[255,255,255],"freq":300},"size":1},"size":2},"right":{"left":{"value":{"color":[250,255,246],"freq":90},"size":1},"right":{"value":{"color":[255,255,245],"freq":100},"size":1},"size":2},"size":4},"right":{"value":{"color":[120,130,255],"freq":700},"size":1},"size":5},"right":{"left":{"left":{"left":{"value":{"color":[31,30,12],"freq":13},"size":1},"right":{"value":{"color":[23,30,10],"freq":9},"size":1},"size":2},"right":{"value":{"color":[14,20,1],"freq":23},"size":1},"size":3},"right":{"value":{"color":[120,130,40],"freq":70},"size":1},"size":4},"size":9};
   test.deepEqual(clusters, expected, "final clusters do not match expected");
   
   test.done();
}
