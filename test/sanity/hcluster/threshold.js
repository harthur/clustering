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
var expected = [{"canonical":[255,255,255],"key":0,"index":0,"size":1},{"canonical":[253,253,253],"key":1,"index":1,"size":1},{"canonical":[120,130,255],"key":2,"index":2,"size":1},{"canonical":[120,130,40],"key":3,"index":3,"size":1},{"canonical":[23,30,10],"key":4,"index":4,"size":1},{"canonical":[250,255,246],"key":5,"index":5,"size":1},{"canonical":[255,255,245],"key":6,"index":6,"size":1},{"canonical":[31,30,12],"key":7,"index":7,"size":1},{"canonical":[14,20,1],"key":8,"index":8,"size":1}];
assert.deepEqual(clusters, expected, "clustering with threshold 0 should do nothing");

var clusters = clusterfck.hcluster(colors, clusterfck.EUCLIDEAN_DISTANCE, clusterfck.AVERAGE_LINKAGE, 5);
var expected = [{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"key":1,"index":1,"size":1},"right":{"canonical":[255,255,255],"key":0,"index":0,"size":1},"key":1,"size":2,"index":0},{"canonical":[120,130,255],"key":2,"index":1,"size":1},{"canonical":[120,130,40],"key":3,"index":2,"size":1},{"canonical":[23,30,10],"key":4,"index":3,"size":1},{"canonical":[250,255,246],"key":5,"index":4,"size":1},{"canonical":[255,255,245],"key":6,"index":5,"size":1},{"canonical":[31,30,12],"key":7,"index":6,"size":1},{"canonical":[14,20,1],"key":8,"index":7,"size":1}];
assert.deepEqual(clusters, expected, "clustering with threshold 5 should only cluster two items");
