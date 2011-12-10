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

exports.testThreshold = function(test) {
   var clusters = clusterfck.hcluster(colors, "euclidean", "average", 0);
   var expected = [{"value":[255,255,255],"size":1},{"value":[253,253,253],"size":1},{"value":[120,130,255],"size":1},{"value":[120,130,40],"size":1},{"value":[23,30,10],"size":1},{"value":[250,255,246],"size":1},{"value":[255,255,245],"size":1},{"value":[31,30,12],"size":1},{"value":[14,20,1],"size":1}];
   test.deepEqual(clusters, expected, "clustering with threshold 0 should do nothing");

   var clusters = clusterfck.hcluster(colors, "euclidean", "average", 5);   
   var expected = [{"left":{"value":[253,253,253],"size":1},"right":{"value":[255,255,255],"size":1},"size":2},{"value":[120,130,255],"size":1},{"value":[120,130,40],"size":1},{"value":[23,30,10],"size":1},{"value":[250,255,246],"size":1},{"value":[255,255,245],"size":1},{"value":[31,30,12],"size":1},{"value":[14,20,1],"size":1}];
   test.deepEqual(clusters, expected, "clustering with threshold 5 should only cluster two items");
   
   test.done();
}