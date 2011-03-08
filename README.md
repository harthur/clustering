#clusterfck
A js [hierarchical clustering](http://en.wikipedia.org/wiki/Hierarchical_clustering) lib. [Demo here](http://harthur.github.com/clusterfck/demos/colors/) and [docs here](http://harthur.github.com/clusterfck/).

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


`clusters` will be an array of clusters. Each cluster is a hierarchy with `left` and `right` clusters. The leaf clusters have a `canonical` property as well which contains the original item (in this case, the array of rgb values).


