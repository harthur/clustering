var distances = require("./distance");

function KMeans(centroids) {
   this.centroids = centroids || [];
}

KMeans.prototype.randomCentroids = function(points, k) {
   var centroids = points.slice(0); // copy
   centroids.sort(function() {
      return (Math.round(Math.random()) - 0.5);
   });
   return centroids.slice(0, k);
}

KMeans.prototype.guessK = function(points) {
    return ~~(Math.sqrt(points.length*0.5));
}
  
KMeans.prototype.initCentroids = function(points, k, distance) {
   // https://github.com/cmtt/kmeans-js/blob/master/kmeans.js
   var i, cmp1, cmp2;
   var selectedK = k;
   var reduce = function(t,c) {var u; for (var i = (v=t[0],1); i < t.length;) v = c(v,t[i],i++,t); i<2 & u && u(); return v;};
   var addIterator = function (x,y) { return x+y; };
   var centroids = [];

   /** K-Means++ initialization */

   /** determine the amount of tries */
   var D = [], ntries = 2 + Math.round(Math.log(selectedK));

   /** 1. Choose one center uniformly at random from the data points. */

   var l = points.length;

   var p0 = points[ ~~(Math.random() * l) ];

   centroids = [ p0 ];

   /**
    * 2. For each data point x, compute D(x), the distance between x and
    * the nearest center that has already been chosen.
    */

   for (i = 0; i < l; ++i) {
     D[i] = Math.pow(distance(p0, points[i]), 2);
   }

   var Dsum = reduce(D, addIterator);

   /**
    * 3. Choose one new data point at random as a new center, using a
    * weighted probability distribution where a point x is chosen with
    * probability proportional to D(x)2.
    * (Repeated until k centers have been chosen.)
    */

   for (k = 1; k < selectedK; ++k) {

      var bestDsum = -1, bestIdx = -1;

      for (i = 0; i < ntries; ++i) {
         var rndVal = ~~(Math.random() * Dsum);

         for (var n = 0; n < l; ++n) {
            if (rndVal <= D[n]) {
               break;
            }
            else {
               rndVal -= D[n];
            }
         }

         var tmpD = [];
         for (var m = 0; m < l; ++m) {
            cmp1 = D[m];
            cmp2 = Math.pow(distance(points[m],points[n]),2);
            tmpD[m] = cmp1 > cmp2 ? cmp2 : cmp1;
         }

         var tmpDsum = reduce(tmpD, addIterator);

         if (bestDsum < 0 || tmpDsum < bestDsum) {
            bestDsum = tmpDsum, bestIdx = n;
         }
      }

      Dsum = bestDsum;

      centroids.push(points[bestIdx]);

      for (i = 0; i < l; ++i) {
         cmp1 = D[i];
         cmp2 = Math.pow(distance(points[bestIdx],points[i]), 2);
         D[i] = cmp1 > cmp2 ? cmp2 : cmp1;
      }
   }

   return centroids;
}

KMeans.prototype.classify = function(point, distance) {
   var min = Infinity,
       index = 0;

   distance = distance || "euclidean";
   if (typeof distance == "string") {
      distance = distances[distance];
   }

   for (var i = 0; i < this.centroids.length; i++) {
      var dist = distance(point, this.centroids[i]);
      if (dist < min) {
         min = dist;
         index = i;
      }
   }

   return index;
}

KMeans.prototype.cluster = function(points, k, distance, snapshotPeriod, snapshotCb) {
   k = k || this.guessK(points);

   distance = distance || "euclidean";
   if (typeof distance == "string") {
      distance = distances[distance];
   }

   this.centroids = this.randomCentroids(points, k);
  
   var assignment = new Array(points.length);
   var clusters = new Array(k);

   var iterations = 0;
   var movement = true;
   while (movement) {
      // update point-to-centroid assignments
      for (var i = 0; i < points.length; i++) {
         assignment[i] = this.classify(points[i], distance);
      }

      // update location of each centroid
      movement = false;
      for (var j = 0; j < k; j++) {
         var assigned = [];
         for (var i = 0; i < assignment.length; i++) {
            if (assignment[i] == j) {
               assigned.push(points[i]);
            }
         }

         if (!assigned.length) {
            continue;
         }

         var centroid = this.centroids[j];
         var newCentroid = new Array(centroid.length);

         for (var g = 0; g < centroid.length; g++) {
            var sum = 0;
            for (var i = 0; i < assigned.length; i++) {
               sum += assigned[i][g];
            }
            newCentroid[g] = sum / assigned.length;

            if (newCentroid[g] != centroid[g]) {
               movement = true;
            }
         }

         this.centroids[j] = newCentroid;
         clusters[j] = assigned;
      }

      if (snapshotCb && (iterations++ % snapshotPeriod == 0)) {
         snapshotCb(clusters);
      }
   }

   return clusters;
}

KMeans.prototype.toJSON = function() {
   return JSON.stringify(this.centroids);
}

KMeans.prototype.fromJSON = function(json) {
   this.centroids = JSON.parse(json);
   return this;
}

module.exports = KMeans;

module.exports.kmeans = function(vectors, k) {
   return (new KMeans()).cluster(vectors, k);
}