var clusterfck = (function() {
    var module = { exports: {}};
    var exports = module.exports;
module.exports = (function() {
    var module = { exports: {}};
    var exports = module.exports;

var HierarchicalClustering = function(distance, merge, threshold) {
  this.distance = distance || clusterfck.EUCLIDEAN_DISTANCE;
  this.merge = merge || clusterfck.AVERAGE_LINKAGE;
  this.threshold = threshold == undefined ? Infinity : threshold;
}

HierarchicalClustering.prototype = {
  cluster : function(items, snapshot, snapshotCallback) {

    var clusters = [];
    var dists = [];  // distances between each pair of clusters
    var mins = []; // closest cluster for each cluster
    var index = []; // keep a hash of all clusters by key
    for(var i = 0; i < items.length; i++) {
      var cluster = { canonical: items[i], key: i, index: i, size: 1};
      clusters[i] = cluster;
      index[i] = cluster;
      dists[i] = [];
      mins[i] = 0;
    }

    // initialize distance matrix and cached mins
    for(var i = 0; i < clusters.length; i++) {
      for(var j = 0; j <= i; j++) {
        var dist = (i == j) ? Infinity : 
          this.distance(clusters[i].canonical, clusters[j].canonical);
        dists[i][j] = dist;
        dists[j][i] = dist;

        if(dist < dists[i][mins[i]])
          mins[i] = j;
      }
    }


    var toMerge = this.closestClusters(clusters, dists, mins);
    var i = 0;
    while(toMerge) {
      if(!toMerge)
        break; // W. T. F.
      if(snapshotCallback && (i % snapshot) == 0)
        snapshotCallback(clusters);

      var c1 = index[toMerge[0]],
          c2 = index[toMerge[1]];

      this.mergeClusters(clusters, dists, mins, index, c1, c2);
      toMerge = this.closestClusters(clusters, dists, mins);
      i++;
    }
    return clusters;
  },
  
  mergeClusters : function(clusters, dists, mins, index, c1, c2) {
    var merged = { canonical: this.merge(c1.canonical, c2.canonical),
                   left: c1,
                   right: c2,
                   key: c1.key,
                   size: c1.size + c2.size };

    clusters[c1.index] = merged;
    clusters.splice(c2.index, 1);
    index[c1.key] = merged;


    // update distances with new merged cluster
    for(var i = 0; i < clusters.length; i++) {
      var ci = clusters[i];
      var dist;
      if(c1.key == ci.key)
        dist = Infinity;
      else if(this.merge == clusterfck.SINGLE_LINKAGE) {
        dist = dists[c1.key][ci.key];
        if(dists[c1.key][ci.key] > dists[c2.key][ci.key])
           dist = dists[c2.key][ci.key];
      }
      else if(this.merge == clusterfck.COMPLETE_LINKAGE) {
        dist = dists[c1.key][ci.key];
        if(dists[c1.key][ci.key] < dists[c2.key][ci.key])
           dist = dists[c2.key][ci.key];
      }
      else if(this.merge == clusterfck.AVERAGE_LINKAGE) {
        dist = (dists[c1.key][ci.key] * c1.size
              + dists[c2.key][ci.key] * c2.size) / (c1.size + c2.size);
      }
      else
        dist = this.distance(ci.canonical, c1.canonical);

      dists[c1.key][ci.key] = dists[ci.key][c1.key] = dist;
    }

    
    // update cached mins
    for(var i = 0; i < clusters.length; i++) {
      var key1 = clusters[i].key;        
      if(mins[key1] == c1.key || mins[key1] == c2.key) {
        var min = key1;
        for(var j = 0; j < clusters.length; j++) {
          var key2 = clusters[j].key;
          if(dists[key1][key2] < dists[key1][min])
            min = key2;
        }
        mins[key1] = min;
      }
      clusters[i].index = i;
    }
  },

  closestClusters : function(clusters, dists, mins) {
    var minKey = 0, min = Infinity, minClusters = [];
    for(var i = 0; i < clusters.length; i++) {
      var key = clusters[i].key;
      if(dists[key][mins[key]] < min) {
        minKey = key;
        min = dists[key][mins[key]];
      }
    }
    if(min < this.threshold)
      return [minKey, mins[minKey]];
  }
}

var SINGLE_LINKAGE = function(c1, c2) { return c1; };
var COMPLETE_LINKAGE = function(c1, c2) { return c1; };
var AVERAGE_LINKAGE = function(c1, c2) { return c1; };

var EUCLIDEAN_DISTANCE = function(v1, v2) {
  var total = 0;
  for(var i = 0; i < v1.length; i++)
    total += Math.pow(v2[i] - v1[i], 2)
  return Math.sqrt(total);
}

var MANHATTAN_DISTANCE = function(v1, v2) {
  var total = 0;
  for(var i = 0; i < v1.length ; i++)
    total += Math.abs(v2[i] - v1[i])
  return total;
}

var MAX_DISTANCE = function(v1, v2) {
  var max = 0;
  for(var i = 0; i < v1.length; i++)
    max = Math.max(max , Math.abs(v2[i] - v1[i]));
  return max;
}

var hcluster = function(items, distance, merge, threshold, snapshot, snapshotCallback) {
  return (new HierarchicalClustering(distance, merge, threshold))
         .cluster(items, snapshot, snapshotCallback);
}

clusterfck = {
  hcluster: hcluster,
  SINGLE_LINKAGE: SINGLE_LINKAGE,
  COMPLETE_LINKAGE: COMPLETE_LINKAGE,
  AVERAGE_LINKAGE: AVERAGE_LINKAGE,
  EUCLIDEAN_DISTANCE: EUCLIDEAN_DISTANCE,
  MANHATTAN_DISTANCE: MANHATTAN_DISTANCE,
  MAX_DISTANCE: MAX_DISTANCE
};

module.exports = clusterfck;
return module.exports;   })();
return module.exports;   })()