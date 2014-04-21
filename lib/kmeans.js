var distances = require("./distance");
var centroids = [];

function randomCentroids(points, k) {
   var centroids = points.slice(0); // copy
   centroids.sort(function() {
      return (Math.round(Math.random()) - 0.5);
   });
   return centroids.slice(0, k);
}

function guessK(points) {
    return ~~(Math.sqrt(points.length*0.5));
}
  
function initCentroids(points, k, distance) {
	// https://github.com/cmtt/kmeans-js/blob/master/kmeans.js
    var i, cmp1, cmp2;
	var selectedK = k;
	var reduce = function(t,c) {var u; for (var i = (v=t[0],1); i < t.length;) v = c(v,t[i],i++,t); i<2 & u && u(); return v;};
    var addIterator = function (x,y) { return x+y; };

    /** K-Means++ initialization */

    /** determine the amount of tries */
    var D = [], ntries = 2 + Math.round(Math.log(selectedK));

    /** 1. Choose one center uniformly at random from the data points. */

    var l = points.length;

    var p0 = points[ ~~(Math.random() * l) ];

    p0.centroid = 0;
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
          } else {
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

function closestCentroid(point, distance) {
   var min = Infinity,
       index = 0;

   distance = distance || "euclidean";
   if (typeof distance == "string") {
      distance = distances[distance];
   }

   for (var i = 0; i < centroids.length; i++) {
      var dist = distance(point, centroids[i]);
      if (dist < min) {
         min = dist;
         index = i;
      }
   }
   return index;
}

function kmeans(points, k, distance, snapshotPeriod, snapshotCb) {
   k = k || guessK(points);
   
   distance = distance || "euclidean";
   if (typeof distance == "string") {
      distance = distances[distance];
   }

   centroids = initCentroids(points, k, distance); //randomCentroids(points, k);
  
   var assignment = new Array(points.length);
   var clusters = new Array(k);

   var iterations = 0;
   var movement = true;
   while (movement) {
      // update point-to-centroid assignments
      for (var i = 0; i < points.length; i++) {
         assignment[i] = closestCentroid(points[i], distance);
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
         var centroid = centroids[j];
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
         centroids[j] = newCentroid;
         clusters[j] = assigned;
      }

      if (snapshotCb && (iterations++ % snapshotPeriod == 0)) {
         snapshotCb(clusters);
      }
   }
   return clusters;
}

function toJSON() {
	return JSON.stringify(centroids);
}

function fromJSON(json) {
	centroids = JSON.parse(json);
	return this;
}

module.exports = kmeans;
module.exports.classify = closestCentroid;
module.exports.centroids = centroids;
module.exports.toJSON = toJSON;
module.exports.fromJSON = fromJSON;