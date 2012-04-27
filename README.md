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

var clusters = clusterfck.kmeans(colors, 3);
```

The second argument to `kmeans` is the number of clusters you want (default is `Math.sqrt(n/2)` where `n` is the number of vectors). It returns an array of the clusters, for this example:

```javascript
[
  [[200,0,23], [255,13,8]],
  [[20,20,80], [22,22,90], [0,30,70], [100,54,100]],
  [[250,255,253]]
]
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
