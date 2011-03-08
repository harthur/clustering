var clusterfck = require("../../../lib/hcluster.js"),
    assert = require("assert"),
    sys = require("sys");

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

var clusters = clusterfck.hcluster(colors, clusterfck.EUCLIDEAN_DISTANCE, clusterfck.AVERAGE_LINKAGE, 0);
var expected = [{"canonical":[255,255,255],"size":1},{"canonical":[253,253,253],"size":1},{"canonical":[120,130,255],"size":1},{"canonical":[120,130,40],"size":1},{"canonical":[23,30,10],"size":1},{"canonical":[250,255,246],"size":1},{"canonical":[255,255,245],"size":1},{"canonical":[31,30,12],"size":1},{"canonical":[14,20,1],"size":1}];
assert.deepEqual(clusters, expected, "clustering with threshold 0 should do nothing");

var clusters = clusterfck.hcluster(colors, clusterfck.EUCLIDEAN_DISTANCE, clusterfck.AVERAGE_LINKAGE, 5);
var expected = [{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"size":1},"right":{"canonical":[255,255,255],"size":1},"size":2},{"canonical":[120,130,255],"size":1},{"canonical":[120,130,40],"size":1},{"canonical":[23,30,10],"size":1},{"canonical":[250,255,246],"size":1},{"canonical":[255,255,245],"size":1},{"canonical":[31,30,12],"size":1},{"canonical":[14,20,1],"size":1}]
assert.deepEqual(clusters, expected, "clustering with threshold 5 should only cluster two items");
