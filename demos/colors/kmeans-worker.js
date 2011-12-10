importScripts('rgb.js', 'clusterfck.js');

onmessage = function(event) {
  var data = event.data;
  var t1 = Date.now();
  var clusters = clusterColors(data.colors, data.k, data.frameRate);
  var t2 = Date.now();
  this.postMessage({clusters: clusters, time: t2 - t1});
};

function clusterColors(colors, k, frameRate) {
  var clusters = clusterfck.kmeans(colors, k, "euclidean",
     frameRate, function(clusters) {
        postMessage({clusters: clusters});
     });
  return clusters;
}
