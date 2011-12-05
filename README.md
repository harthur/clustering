# clusterfck
A js [hierarchical clustering](http://en.wikipedia.org/wiki/Hierarchical_clustering) lib. [Demo here](http://harthur.github.com/clusterfck/demos/colors/).

# Install
	git clone http://github.com/harthur/clusterfck.git
	cd clusterfck
	npm install .

# Usage

```javascript
var clusterfck = require("clusterfck");

var colors = [
   [20, 120, 102],
   [0, 230, 93],
   [250, 255, 253],
   [100, 54, 300]
];

var tree = clusterfck.hcluster(colors);
```

`hcluster` returns an object that represents the hierarchy of the clusters with `left` and `right` subtrees. The leaf clusters have a `value` property which is the vector from the data set.

```
{
   "left": {
      "left": {
         "value": [0, 230, 93],
      },
      "right": {
         "value": [20, 120, 102],
      },
   },
   "right": {
      "left": {
         "value": [250, 255, 253],
      },
      "right": {
         "value": [100, 54, 300],
      },
   },
}

```

## Distance metric and linkage

Specify the distance metric, one of `"euclidean"` (default), `"manhattan"`, and `"max"`. The linkage criterion is the third argument, one of `"average"` (default), `"single"`, and `"complete"`.

```javascript
var tree = clusterfck.hcluster(colors, "euclidean", "single");
```
