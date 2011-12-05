
var HierarchicalClustering = function(distance, linkage, threshold) {
   this.distance = distance;
   this.linkage = linkage;
   this.threshold = threshold == undefined ? Infinity : threshold;
}

HierarchicalClustering.prototype = {
   cluster : function(items, snapshot, snapshotCallback) {
      var clusters = [];
      var dists = [];  // distances between each pair of clusters
      var mins = []; // closest cluster for each cluster
      var index = []; // keep a hash of all clusters by key
      
      for (var i = 0; i < items.length; i++) {
         var cluster = {
            value: items[i],
            key: i,
            index: i,
            size: 1
         };
         clusters[i] = cluster;
         index[i] = cluster;
         dists[i] = [];
         mins[i] = 0;
      }

      for (var i = 0; i < clusters.length; i++) {
         for (var j = 0; j <= i; j++) {
            var dist = (i == j) ? Infinity : 
               this.distance(clusters[i].value, clusters[j].value);
            dists[i][j] = dist;
            dists[j][i] = dist;

            if (dist < dists[i][mins[i]]) {
               mins[i] = j;               
            }
         }
      }

      var merged = this.mergeClosest(clusters, dists, mins, index);
      var i = 0;
      while (merged) {
        if (snapshotCallback && (i % snapshot) == 0) {
           snapshotCallback(clusters);           
        }
        merged = this.mergeClosest(clusters, dists, mins, index);
        i++;
      }
    
      clusters.forEach(function(cluster) {
        // clean up metadata used for clustering
        delete cluster.key;
        delete cluster.index;
      });

      return clusters;
   },
  
   mergeClosest: function(clusters, dists, mins, index) {
      // find two closest clusters from cached mins
      var minKey = 0, min = Infinity;
      for (var i = 0; i < clusters.length; i++) {
         var key = clusters[i].key,
             dist = dists[key][mins[key]];
         if (dist < min) {
            minKey = key;
            min = dist;
         }
      }
      if (min >= this.threshold) {
         return false;         
      }

      var c1 = index[minKey],
          c2 = index[mins[minKey]];

      // merge two closest clusters
      var merged = {
         left: c1,
         right: c2,
         key: c1.key,
         size: c1.size + c2.size
      };

      clusters[c1.index] = merged;
      clusters.splice(c2.index, 1);
      index[c1.key] = merged;

      // update distances with new merged cluster
      for (var i = 0; i < clusters.length; i++) {
         var ci = clusters[i];
         var dist;
         if (c1.key == ci.key) {
            dist = Infinity;            
         }
         else if (this.linkage == "single") {
            dist = dists[c1.key][ci.key];
            if (dists[c1.key][ci.key] > dists[c2.key][ci.key]) {
               dist = dists[c2.key][ci.key];
            }
         }
         else if (this.linkage == "complete") {
            dist = dists[c1.key][ci.key];
            if (dists[c1.key][ci.key] < dists[c2.key][ci.key]) {
               dist = dists[c2.key][ci.key];              
            }
         }
         else if (this.linkage == "average") {
            dist = (dists[c1.key][ci.key] * c1.size
                   + dists[c2.key][ci.key] * c2.size) / (c1.size + c2.size);
         }
         else {
            dist = this.distance(ci.value, c1.value);            
         }

         dists[c1.key][ci.key] = dists[ci.key][c1.key] = dist;
      }

    
      // update cached mins
      for (var i = 0; i < clusters.length; i++) {
         var key1 = clusters[i].key;        
         if (mins[key1] == c1.key || mins[key1] == c2.key) {
            var min = key1;
            for (var j = 0; j < clusters.length; j++) {
               var key2 = clusters[j].key;
               if (dists[key1][key2] < dists[key1][min]) {
                  min = key2;                  
               }
            }
            mins[key1] = min;
         }
         clusters[i].index = i;
      }
    
      // clean up metadata used for clustering
      delete c1.key; delete c2.key;
      delete c1.index; delete c2.index;

      return true;
   }
}

var distances = {
  euclidean: function(v1, v2) {
      var total = 0;
      for (var i = 0; i < v1.length; i++) {
         total += Math.pow(v2[i] - v1[i], 2);      
      }
      return Math.sqrt(total);
   },
   manhattan: function(v1, v2) {
     var total = 0;
     for (var i = 0; i < v1.length ; i++) {
        total += Math.abs(v2[i] - v1[i]);      
     }
     return total;
   },
   max: function(v1, v2) {
     var max = 0;
     for (var i = 0; i < v1.length; i++) {
        max = Math.max(max , Math.abs(v2[i] - v1[i]));      
     }
     return max;
   }
};

var hcluster = function(items, distance, linkage, threshold, snapshot, snapshotCallback) {
   distance = distance || "euclidean";
   linkage = linkage || "average";

   if (typeof distance == "string") {
     distance = distances[distance];
   }
   var clusters = (new HierarchicalClustering(distance, linkage, threshold))
                  .cluster(items, snapshot, snapshotCallback);
      
   if (threshold === undefined) {
      return clusters[0]; // all clustered into one
   }
   return clusters;
}

module.exports = {
   hcluster: hcluster
};
