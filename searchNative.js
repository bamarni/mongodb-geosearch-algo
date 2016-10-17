var MongoClient = require('mongodb').MongoClient;
var args = process.argv.slice(2);
var searchPoint = [parseFloat(args[0]), parseFloat(args[1])];

MongoClient.connect('mongodb://dev.docker:27017/mydb', function(err, db) {
  db.collection('locations').find({
    geo: {
      $near: {
        $geometry : { "type" : "Point", "coordinates" : searchPoint },
        $maxDistance: 20000
      }
    }
  }, {
    _id: 0
  }).each(function(err, doc) {
    if (doc) {
      console.log("%s (%s,%s)", doc.address, doc.geo.coordinates[1], doc.geo.coordinates[0]);
    } else {
      db.close();
    }
  });
});
