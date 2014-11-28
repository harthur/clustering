# Clusterfck
A js [cluster analysis](http://en.wikipedia.org/wiki/Cluster_analysis) library. Includes [Hierarchical (agglomerative) clustering](http://en.wikipedia.org/wiki/Hierarchical_clustering) and [K-means clustering](http://en.wikipedia.org/wiki/K-means_clustering). [Demo here](http://harthur.github.com/clusterfck/demos/colors/).

# Install

For node.js:

```bash
npm install clusterfck
```
Or grab the [browser file](http://harthur.github.com/clusterfck/demos/colors/clusterfck.js)


# K-means

```javascript
var clusterfck = require("clusterfck");

var colors = [
   [20, 20, 80],
   [22, 22, 90],
   [250, 255, 253],
   [0, 30, 70],
   [200, 0, 23],
   [100, 54, 100],
   [255, 13, 8]
];

// Calculate clusters.
var clusters = clusterfck.kmeans(colors, 3);
```

The second argument to `kmeans` is the number of clusters you want (default is `Math.sqrt(n/2)` where `n` is the number of vectors). It returns an array of clusters, for this example:

```javascript
[
  [[200,0,23], [255,13,8]],
  [[20,20,80], [22,22,90], [0,30,70], [100,54,100]],
  [[250,255,253]]
]
```

#### Classification

For classification, instantiate a new Kmeans() object.

```javascript
var kmeans = new clusterfck.Kmeans();

// Calculate clusters.
var clusters = kmeans.cluster(colors, 3);

// Calculate cluster index for a new data point.
var clusterIndex = kmeans.classify([0, 0, 225]);
```

#### Serialization

The toJSON() and fromJSON() methods are available for serialization.

```javascript
// Serialize centroids to JSON.
var json = kmeans.toJSON();

// Deserialize centroids from JSON.
kmeans = kmeans.fromJSON(json);

// Calculate cluster index from a previously serialized set of centroids.
var clusterIndex = kmeans.classify([0, 0, 225]);
```

#### Initializing with Existing Centroids

```javascript
// Take existing centroids, perhaps from a database?
var centroids = [ [ 35.5, 31.5, 85 ], [ 250, 255, 253 ], [ 227.5, 6.5, 15.5 ] ];

// Initialize constructor with centroids.
var kmeans = new clusterfck.Kmeans(centroids);

// Calculate cluster index.
var clusterIndex = kmeans.classify([0, 0, 225]);
```

#### Accessing Centroids and K value

After clustering or loading via fromJSON(), the calculated centers are accessible via the centroids property. Similarly, the K-value can be derived via centroids.length.

```javascript
// Calculate clusters.
var clusters = kmeans.cluster(colors, 3);

// Access centroids, an array of length 3.
var centroids = kmeans.centroids;

// Access k-value.
var k = centroids.length;
```

# Hierarchical

```javascript
var clusterfck = require("clusterfck");

var colors = [
   [20, 20, 80],
   [22, 22, 90],
   [250, 255, 253],
   [100, 54, 255]
];

var clusters = clusterfck.hcluster(colors);
```

`hcluster` returns an object that represents the hierarchy of the clusters with `left` and `right` subtrees. The leaf clusters have a `value` property which is the vector from the data set.

```javascript
{
   "left": {
      "left": {
         "left": {
            "value": [22, 22, 90]
         },
         "right": {
            "value": [20, 20, 80]
         },
      },
      "right": {
         "value": [100, 54, 255]
      },
   },
   "right": {
      "value": [250, 255, 253]
   }
}
```

#### Distance metric and linkage

Specify the distance metric, one of `"euclidean"` (default), `"manhattan"`, and `"max"`. The linkage criterion is the third argument, one of `"average"` (default), `"single"`, and `"complete"`.

```javascript
var tree = clusterfck.hcluster(colors, "euclidean", "single");
```
