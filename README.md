#clusterfck
A js [hierarchical clustering](http://en.wikipedia.org/wiki/Hierarchical_clustering) lib.

# install
git clone http://github.com/harthur/clusterfck.git
cd clusterfck
npm install .

# usage
	var clusterfck = require("clusterfck");
	
	var colors = [[20, 120, 102],
	              [0, 230, 93],
	              [250, 255, 253],
	              [100, 54, 300]]; // array of vectors
	
	var threshold = 9; // only combine two clusters if they have distance less than 9
	
	var clusters = clusterfck.hcluster(colors, clusterfck.EUCLIDEAN_DISTANCE,
		clusterfck.AVERAGE_LINKAGE, threshold);


`clusters` will be an array of clusters. Each cluster has a `left` and `right` for the clusters that were merged. If you specified a merge function (instead of e.g. `clusterfck.AVERAGE_LINKAGE`), then it'll have a `canonical` property as well which contains the cluster that was formed from the merged clusters.


