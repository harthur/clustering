var clusterfck = require("../../../lib/clusterfck"),
    equality = require("equality");

var data = [
   [1, 1, 1],
   [5, 1, 1],
   [1, 5, 5],
   [4, 2, 2],
   [5, 5, 10000]
];

var iterations = 20;

var distance = function(a, b) {
   return Math.abs(a[0] - b[0]);
}

exports.testDistFunc = function(test) {
   for (var i = 0; i < iterations; i++) {
      var clusters = clusterfck.kmeans(data, 2, distance);

      console.log(clusters);

      test.ok(equality.members(clusters,[ [[ 1, 1, 1 ], [ 5, 1, 1 ], [ 1, 5, 5 ] ,
              [ 4, 2, 2 ]], [[ 5, 5, 10000 ]] ]
      ), "clustered into correct two clusters");
   }
   test.done();
}

// [ [ [ 1, 1, 1 ], [ 5, 1, 1 ], [ 1, 5, 5 ], [ 4, 2, 2 ] ],
//  [ [ 5, 5, 10000 ] ] ]
