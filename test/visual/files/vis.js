$(document).ready(function() {
  $(".button").click(function() {
    var colors = getImageColors();
    var linkage = $(this).attr("data-linkage"); // $.data() returned undefined
    $("#clusters").empty().append("<div>calculating distances...</div>");
	  clusterColors(colors, linkage);
  });
});

function clusterColors(colors, linkage) {
  var worker = new Worker("./cluster-worker.js");

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
    linkage: linkage
  });
};

function visualizeClusters(clusters) {
  $("#clusters").empty();
  var total = 0; 
  for(var i = 0; i < clusters.length; i++) {
    var group = leaves(clusters[i]);
    total += group.length;
    var width = Math.ceil(Math.sqrt(group.length));
    var div = $("<div class='group'></div>").appendTo("#clusters");
    var row;
    
    for(var j = 0; j < group.length; j++) {
      if(j % width == 0)
        row = $("<div class='row'></div>").appendTo(div);
      var color = group[j].canonical.color;
      color = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";

      row.append("<div class='swatch' style='background-color: " +
        color  + "'></div>");
    }
  }
}

function leaves(cluster) {
  // flatten cluster hierarchy
  if(!cluster.left)
    return [cluster];
  else
    return leaves(cluster.left).concat(leaves(cluster.right));
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
     colors.push({lab: convertRGBtoLAB(color[0], color[1], color[2]), color: color});
    }
  }
  return colors;
}