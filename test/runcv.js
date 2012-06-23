var util = require('util'),
    fs = require("fs"),
    path = require("path"),
    url = require("url"),
    cradle = require("cradle"),
    nomnom = require("nomnom"),
    _ = require("underscore")._,
    clusterfck = require("../lib/hcluster");

function getDb(couchUrl) {
  var parts = url.parse(couchUrl);
  var client = new cradle.Connection(parts.hostname, parts.port || 80);
  return client.database(parts.pathname);  
}

function getDocs(couchUrl, callback) {
  var db = getDb(couchUrl);
  db.all({include_docs: true}, function(err, res) {
    if(err)
      util.puts("error retreiving data from " + couchUrl + ": '" + err + "'");
    else {
      var data = _(res.rows).pluck("doc")
      callback(data);
    }
  });
}

function runHCluster(data, options) {
  util.puts("\nrunning hcluster test on data size: " 
     + Math.min(data.length, options.length))

  eval("var distance = " + options.distance);
  eval("var merge = " + options.merge);
  
  var items = data.slice(0, options.length).map(function(doc) {
    return doc.data;
  })
  var t1 = Date.now();
  var clusters = clusterfck.hcluster(items, distance, merge, options.threshold);
  var t2 = Date.now();
  
  util.puts("ending cluster count: " + clusters.length);
  return {
    'time' : t2 - t1,
    'clusters' : clusters
  };
}

function runTest(config) {
  var type = config.type || "hcluster";
  var opts = config.options || {};
  
  getDocs(config.db, function(data) {
    var stats = runHCluster(data, opts);
    if(options.verbose)
      util.inspect(stats);
    
    util.puts("running time: " + stats.time + "ms");
    // cvvvvvvvvvvvvvvcvVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV F
    if(options.report) {
      var db = getDb(options.report);
      var report = {
        stats: stats,
        name: options.reportName,
        timestamp: new Date(),
        config: config
      }
      db.insert(report, function(err, res) {
        if(err)
          util.puts("error sending report to " + option.report);
        else
          util.puts("saved report " + options.report + "/" + res.id);
      }); 
    }
  });
}

var opts = [
  { name: 'target',
    position: 0,
    help: "[hcluster]"
  },
  
  { name: 'config',
    string: '-c FILE, --config=FILE',
    default: path.join(__dirname, "cvtests.json"),
    help: 'JSON manifest of cross-validation tests to run'
  },
  
  { string: '-d URL, --db=URL',
    help: 'url to CouchDB database of training data'
  },
  
  { string: '-o JSON, --options=JSON',
    help: 'options to pass to classifier'
  },

  { string: '-t [neuralnetwork|bayesian], --type=TYPE',
    help: 'type of classifier/network to test'
  },

  { name: 'verbose',
    string: '-v, --verbose',
    help: 'print more messages'
  },
  
  { name: 'report',
    string: '-r COUCHDB, --report=COUCHDB',
    help: 'couch db to post results to'
  },
  
  { name: 'reportName',
    string: '-n NAME, --report-name=NAME',
    help: 'name of results report'
  },
];

var options = nomnom.parseArgs(opts, {script: 'node cvtests.js'});

var tests;
if(options.db) {
  tests = [options];
}
else {
  var config = JSON.parse(fs.readFileSync(options.config, "utf-8"));
  if(options.target)
    tests = _(config[options.target]).map(function(test) {
      test.type = options.target;
      return test;
    });
  else
    tests = _(config).reduce(function(allTests, tests, type) {
      tests = tests.map(function(test) {
        test.type = type;
        return test;
      });
      return allTests.concat(tests);
    }, []);
}

_(tests).map(function(testConfig) {
  runTest(testConfig);
});