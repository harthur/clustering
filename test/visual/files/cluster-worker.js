importScripts('rgb.js', 'clusterfck.js');

onmessage = function(event) {
  var data = event.data;
  var t1 = Date.now();
  var clusters = clusterColors(data.colors, data.frameRate, data.linkage);
  var t2 = Date.now();
  this.postMessage({clusters: clusters, time: t2 - t1});
};

function clusterColors(colors, frameRate, linkage) {
  var linkage = {
   "single" : {link: clusterfck.SINGLE_LINKAGE, thresh: 3},
   "complete": {link: clusterfck.COMPLETE_LINKAGE, thresh: 50},
   "average": {link: clusterfck.AVERAGE_LINKAGE, thresh: 24}
  }[linkage];

  var clusters = clusterfck.hcluster(colors, sdistance, linkage.link,
    linkage.thresh, frameRate, function(clusters) {
      postMessage({clusters: clusters});
  });
  return clusters;
}

var sdistance = function(c1, c2) {
  var col1 = c1.lab;
  var col2 = c2.lab;

  return Math.sqrt(Math.pow(col2[0] - col1[0], 2)
   + Math.pow(col2[1] - col1[1], 2)
   + Math.pow(col2[2] - col1[2], 2));
}

var smerge = function(c1, c2) {
  var col1 = c1.mean,
      col2 = c2.mean,
      freq1 = c1.freq,
      freq2 = c2.freq,
      total = freq1 + freq2;

  var mean = [((col1[0] * freq1 + col2[0] * freq2) / total),
              ((col1[1] * freq1 + col2[1] * freq2) / total),
              ((col1[2] * freq1 + col2[2] * freq2) / total)];

  return {
    mean: mean,
    color: c1.highFreq > c2.highFreq ? c1.color : c2.color,
    highFreq:  c1.highFreq > c2.highFreq ? c1.highFreq : c2.highFreq,
    freq: c1.freq + c2.freq,
  };
}
