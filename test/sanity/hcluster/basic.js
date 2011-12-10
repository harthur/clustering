var clusterfck = require("../../../lib/clusterfck.js");

var colors = [
   [255, 255, 255],
   [253, 253, 253],
   [120, 130, 255],
   [120, 130, 40],
   [23, 30, 10],
   [250, 255, 246],
   [255, 255, 245],
   [31, 30, 12],
   [14, 20, 1],
];

exports.testDistances = function(test) {
   var clusters = clusterfck.hcluster(colors, "euclidean", "single");
   var expected = {"left":{"left":{"left":{"left":{"value":[253,253,253],"size":1},"right":{"value":[255,255,255],"size":1},"size":2},"right":{"left":{"value":[250,255,246],"size":1},"right":{"value":[255,255,245],"size":1},"size":2},"size":4},"right":{"value":[120,130,255],"size":1},"size":5},"right":{"left":{"left":{"left":{"value":[31,30,12],"size":1},"right":{"value":[23,30,10],"size":1},"size":2},"right":{"value":[14,20,1],"size":1},"size":3},"right":{"value":[120,130,40],"size":1},"size":4},"size":9};
   test.deepEqual(clusters, expected, "final clusters for euclidean do not match expected");

   clusters = clusterfck.hcluster(colors, "manhattan", "single");
   expected = {"left":{"left":{"left":{"value":[253,253,253],"size":1},"right":{"value":[255,255,255],"size":1},"size":2},"right":{"left":{"value":[250,255,246],"size":1},"right":{"value":[255,255,245],"size":1},"size":2},"size":4},"right":{"left":{"left":{"value":[120,130,255],"size":1},"right":{"value":[120,130,40],"size":1},"size":2},"right":{"left":{"left":{"value":[31,30,12],"size":1},"right":{"value":[23,30,10],"size":1},"size":2},"right":{"value":[14,20,1],"size":1},"size":3},"size":5},"size":9};
   test.deepEqual(clusters, expected, "final clusters for manhattan do not match expected");

   clusters = clusterfck.hcluster(colors, "max", "single");
   expected = {"left":{"left":{"left":{"left":{"value":[253,253,253],"size":1},"right":{"value":[255,255,255],"size":1},"size":2},"right":{"left":{"value":[250,255,246],"size":1},"right":{"value":[255,255,245],"size":1},"size":2},"size":4},"right":{"value":[120,130,255],"size":1},"size":5},"right":{"left":{"value":[120,130,40],"size":1},"right":{"left":{"left":{"value":[31,30,12],"size":1},"right":{"value":[23,30,10],"size":1},"size":2},"right":{"value":[14,20,1],"size":1},"size":3},"size":4},"size":9};
   test.deepEqual(clusters, expected, "final clusters for max distance do not match expected");

   clusters = clusterfck.hcluster(colors, "max", "complete");
   expected = {"left":{"left":{"left":{"left":{"value":[253,253,253],"size":1},"right":{"value":[255,255,255],"size":1},"size":2},"right":{"left":{"value":[250,255,246],"size":1},"right":{"value":[255,255,245],"size":1},"size":2},"size":4},"right":{"value":[120,130,255],"size":1},"size":5},"right":{"left":{"value":[120,130,40],"size":1},"right":{"left":{"left":{"value":[31,30,12],"size":1},"right":{"value":[23,30,10],"size":1},"size":2},"right":{"value":[14,20,1],"size":1},"size":3},"size":4},"size":9};
   test.deepEqual(clusters, expected, "final clusters for max distance do not match expected");

   clusters = clusterfck.hcluster(colors, "max", "average");
   expected = {"left":{"left":{"left":{"left":{"value":[253,253,253],"size":1},"right":{"value":[255,255,255],"size":1},"size":2},"right":{"left":{"value":[250,255,246],"size":1},"right":{"value":[255,255,245],"size":1},"size":2},"size":4},"right":{"value":[120,130,255],"size":1},"size":5},"right":{"left":{"value":[120,130,40],"size":1},"right":{"left":{"left":{"value":[31,30,12],"size":1},"right":{"value":[23,30,10],"size":1},"size":2},"right":{"value":[14,20,1],"size":1},"size":3},"size":4},"size":9};   
   test.deepEqual(clusters, expected, "final clusters for max distance do not match expected");

   test.done();
}
