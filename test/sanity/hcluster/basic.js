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

var clusters = clusterfck.hcluster(colors, clusterfck.EUCLIDEAN_DISTANCE, clusterfck.SINGLE_LINKAGE);
var expected = [{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"size":1},"right":{"canonical":[255,255,255],"size":1},"size":2},"right":{"canonical":[250,255,246],"left":{"canonical":[250,255,246],"size":1},"right":{"canonical":[255,255,245],"size":1},"size":2},"size":4},"right":{"canonical":[120,130,255],"size":1},"size":5},"right":{"canonical":[31,30,12],"left":{"canonical":[31,30,12],"left":{"canonical":[31,30,12],"left":{"canonical":[31,30,12],"size":1},"right":{"canonical":[23,30,10],"size":1},"size":2},"right":{"canonical":[14,20,1],"size":1},"size":3},"right":{"canonical":[120,130,40],"size":1},"size":4},"size":9}];
assert.deepEqual(clusters, expected, "final clusters for euclidean do not match expected");

clusters = clusterfck.hcluster(colors, clusterfck.MANHATTAN_DISTANCE, clusterfck.SINGLE_LINKAGE);
expected = [{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"size":1},"right":{"canonical":[255,255,255],"size":1},"size":2},"right":{"canonical":[250,255,246],"left":{"canonical":[250,255,246],"size":1},"right":{"canonical":[255,255,245],"size":1},"size":2},"size":4},"right":{"canonical":[120,130,255],"left":{"canonical":[120,130,255],"left":{"canonical":[120,130,255],"size":1},"right":{"canonical":[120,130,40],"size":1},"size":2},"right":{"canonical":[31,30,12],"left":{"canonical":[31,30,12],"left":{"canonical":[31,30,12],"size":1},"right":{"canonical":[23,30,10],"size":1},"size":2},"right":{"canonical":[14,20,1],"size":1},"size":3},"size":5},"size":9}];
assert.deepEqual(clusters, expected, "final clusters for manhattan do not match expected");

clusters = clusterfck.hcluster(colors, clusterfck.MAX_DISTANCE, clusterfck.SINGLE_LINKAGE);
expected = [{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"size":1},"right":{"canonical":[255,255,255],"size":1},"size":2},"right":{"canonical":[250,255,246],"left":{"canonical":[250,255,246],"size":1},"right":{"canonical":[255,255,245],"size":1},"size":2},"size":4},"right":{"canonical":[120,130,255],"size":1},"size":5},"right":{"canonical":[120,130,40],"left":{"canonical":[120,130,40],"size":1},"right":{"canonical":[31,30,12],"left":{"canonical":[31,30,12],"left":{"canonical":[31,30,12],"size":1},"right":{"canonical":[23,30,10],"size":1},"size":2},"right":{"canonical":[14,20,1],"size":1},"size":3},"size":4},"size":9}];
assert.deepEqual(clusters, expected, "final clusters for max distance do not match expected");

clusters = clusterfck.hcluster(colors, clusterfck.MAX_DISTANCE, clusterfck.COMPLETE_LINKAGE);
expected = [{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"size":1},"right":{"canonical":[255,255,255],"size":1},"size":2},"right":{"canonical":[250,255,246],"left":{"canonical":[250,255,246],"size":1},"right":{"canonical":[255,255,245],"size":1},"size":2},"size":4},"right":{"canonical":[120,130,255],"size":1},"size":5},"right":{"canonical":[120,130,40],"left":{"canonical":[120,130,40],"size":1},"right":{"canonical":[31,30,12],"left":{"canonical":[31,30,12],"left":{"canonical":[31,30,12],"size":1},"right":{"canonical":[23,30,10],"size":1},"size":2},"right":{"canonical":[14,20,1],"size":1},"size":3},"size":4},"size":9}];
assert.deepEqual(clusters, expected, "final clusters for max distance do not match expected");

clusters = clusterfck.hcluster(colors, clusterfck.MAX_DISTANCE, clusterfck.AVERAGE_LINKAGE);
expected = [{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"left":{"canonical":[253,253,253],"size":1},"right":{"canonical":[255,255,255],"size":1},"size":2},"right":{"canonical":[250,255,246],"left":{"canonical":[250,255,246],"size":1},"right":{"canonical":[255,255,245],"size":1},"size":2},"size":4},"right":{"canonical":[120,130,255],"size":1},"size":5},"right":{"canonical":[120,130,40],"left":{"canonical":[120,130,40],"size":1},"right":{"canonical":[31,30,12],"left":{"canonical":[31,30,12],"left":{"canonical":[31,30,12],"size":1},"right":{"canonical":[23,30,10],"size":1},"size":2},"right":{"canonical":[14,20,1],"size":1},"size":3},"size":4},"size":9}];
assert.deepEqual(clusters, expected, "final clusters for max distance do not match expected");