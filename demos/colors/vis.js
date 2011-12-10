$(document).ready(function() {
  var colors;
  $(".hcluster-button").click(function() {
     if (!colors) {
        colors = getImageColors();
     }
     var linkage = $(this).attr("data-linkage"); // $.data() returned undefined
     $("#clusters").empty();
     $("<div>calculating distances...</div>")
        .css({color: "grey"})
        .appendTo($("#clusters"));
	  hcluster.clusterColors(colors, linkage);
  });
  
  $(".kmeans-button").click(function() {
     if (!colors) {
        colors = getImageColors();
     }
     var k = $(this).attr("data-k"); // $.data() returned undefined
     $("#clusters").empty().append("<div>calculating distances...</div>");
 	  kmeans.clusterColors(colors, k);
  })
});


var hcluster = {
   clusterColors: function(colors, linkage) {
     var worker = new Worker("./hcluster-worker.js");

     var self = this;
     worker.onmessage = function(event) {
       var clusters = event.data.clusters.map(function(hcluster) {
          return self.leaves(hcluster).map(function(leaf) {
             return leaf.value;
          });
       });
       
       visualizeClusters(clusters);
       if(event.data.time)
         $("<div>" + event.data.time + " ms</div>")
           .css("margin-bottom", "14px")
           .prependTo($("#clusters"));
     };

     worker.onerror = function(event) {
       console.log("Worker thread error: " + event.message
             + " " + event.filename + " " + event.lineno);
     }

     worker.postMessage({
       colors: colors,
       frameRate: 1000,
       linkage: linkage
     });
   },

   leaves : function(hcluster) {
     // flatten cluster hierarchy
     if(!hcluster.left)
       return [hcluster];
     else
       return this.leaves(hcluster.left).concat(this.leaves(hcluster.right));
   }
}

var kmeans = {
   clusterColors: function(colors, k) {
     var worker = new Worker("./kmeans-worker.js");

     worker.onmessage = function(event) {
       var clusters = event.data.clusters;
       
       visualizeClusters(clusters);
       if(event.data.time)
         $("<div>" + event.data.time + " ms</div>")
           .css("margin-bottom", "14px")
           .prependTo($("#clusters"));
     };

     worker.onerror = function(event) {
       console.log("Worker thread error: " + event.message
             + " " + event.filename + " " + event.lineno);
     }

     worker.postMessage({
       colors: colors,
       frameRate: 1000,
       k: k
     });
   }
}

function visualizeClusters(clusters) {
  $("#clusters").empty();
  var total = 0; 
  for(var i = 0; i < clusters.length; i++) {
    var cluster = clusters[i];
    total += cluster.length;
    var width = Math.ceil(Math.sqrt(cluster.length));
    var div = $("<div class='group'></div>").appendTo("#clusters");
    var row;

    for(var j = 0; j < cluster.length; j++) {
      if(j % width == 0)
        row = $("<div class='row'></div>").appendTo(div);
      var color = cluster[j];
      color = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";

      row.append("<div class='swatch' style='background-color: " +
        color  + "'></div>");
    }
  }
}


function getImageColors() {
  var img = $("#test-image");
  var width = img.width();
  var height = img.height();

  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  var context = canvas.getContext("2d");
  context.drawImage(img.get(0), 0, 0);

  var data = context.getImageData(0, 0, width, height).data;
  var colors = [];
  for(var x = 0; x < width; x += 3) {
    for(var y = 0; y < height; y += 3) { // sample image, every 3rd row and column
     var offs = x*4 + y*4*width;
     var color = [data[offs + 0], data[offs + 1], data[offs + 2]];
     colors.push(color);
    }
  }
  return colors;
}