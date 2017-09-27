const MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/BrainBuzzDB";

// Connect to the database.
MongoClient.connect(url, function(err, db) {

  if (err) throw err;

  // Delete the questions table.
  db.collection("Questions").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      db.close();
    });
});
