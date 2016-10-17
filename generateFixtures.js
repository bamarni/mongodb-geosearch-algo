var exports = {}; load("node_modules/chance/dist/chance.min.js"); var chance = exports.Chance();

var bulk = db.locations.initializeUnorderedBulkOp();
for (var i = 0; i < 100000; i++)
  bulk.insert({
    address: chance.address(),
    geo : { type : "Point", coordinates : [
        7.5299986 + Math.random() * 6.8144238, // longitude 
	45.0700533 + Math.random() * 8.359315 // latitude
    ]}
  });
bulk.execute();

db.locations.createIndex( { geo : "2dsphere" } )
db.locations.createIndex( { "geo.coordinates": 1 } )
