var MongoClient = require('mongodb').MongoClient, geolib = require('geolib');

var args = process.argv.slice(2);
var searchPoint = { lat: parseFloat(args[1]), lng: parseFloat(args[0]) };
var maxDistance = 20000;
var bearingDistance = Math.sqrt(2 * maxDistance * maxDistance);
var sw = geolib.computeDestinationPoint(searchPoint, bearingDistance, 225);
var ne = geolib.computeDestinationPoint(searchPoint, bearingDistance, 45);

var haversineFormula =  "var toRad = "+Math.PI / 180+"; \
  var a = 0.5 - Math.cos((this.geo.coordinates[1] - "+searchPoint.lat+") * toRad)/2 + \
    Math.cos("+searchPoint.lat+" * toRad) * Math.cos(this.geo.coordinates[1] * toRad) * \
    (1 - Math.cos((this.geo.coordinates[0] - "+searchPoint.lng+") * toRad))/2; \
  return "+maxDistance+" >= 12742000 * Math.asin(Math.sqrt(a));"

MongoClient.connect('mongodb://dev.docker:27017/mydb', function(err, db) {
  var collection = db.collection('locations');
  collection.find({
    "geo.coordinates.0" : { $gt :  sw.longitude, $lt : ne.longitude },
    "geo.coordinates.1" : { $gt :  sw.latitude, $lt : ne.latitude },
    $where: "function() { " + haversineFormula + " }"
  }, { _id: 0 }).each(function(err, doc) {
    if (doc) {
      console.log("%s (%s,%s)", doc.address, doc.geo.coordinates[1], doc.geo.coordinates[0]);
    } else {
      db.close();
    }
  });
});
