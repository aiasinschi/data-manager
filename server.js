/*global require, process, __dirname, console */

var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var jwt    = require('jsonwebtoken');
var config = require('./config');
var apiRoutes = express.Router();
//var ObjectID = mongodb.ObjectID;

var USERS_COLLECTION = 'users';
var LOCAL_DB_URL = config.database;

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('superSecret', config.secret);

apiRoutes.use(function(req, res, next) {
    var token = req.headers['x-access-token'] || req.query.token || req.body.token;
    if (token) {
        jwt.verify(token, app.get('superSecret'), function(err, decoded){
           if (err)  {
               return res.json({success: false, message: 'Failed to authenticate token!'});
           } else {
               req.decoded = decoded;
               next();
           }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });
    }
});
app.use('/api', apiRoutes);

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Rest of server.js code below
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || LOCAL_DB_URL, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/users"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get('/api/users', function(req, res) {
  db.collection(USERS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post('/authenticate', function(req, res) {
    var un = req.body.username;
    var pw = req.body.password;
    console.log('auth:rest: ' + un + ':' + pw);
    db.collection(USERS_COLLECTION).find(
        {username: un, password: pw}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, 'Failed to access db');
        } else {
            if (docs.length == 0) {
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized!'
                });
            } else {
                const payload = {
                    admin: docs[0].admin
                };
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                docs[0].token = token;
                res.status(200).json({
                  success: true,
                  message: 'Enjoy your token!',
                  token: token,
                  user: docs[0]
                });
            }
        }
    });
});

app.post('/api/dataset/add', function(req, res) {
    var usr = req.body.user;
    var dss = req.body.dataset;
    var data = req.body.data;
    var dcols = req.body.datacolumns;
    console.log('add dataset: ' + usr + ':' + dss + ':'  + dcols + ':\n' + data);
    // TODO:
    // get datasets for user from the user object, add new dataset + columns sent,
    // update them in the db
    // create a new collection having the name = [username]_[dataset_name]
    // create data objects and insert them in the collection
});

/*db.collection(USERS_COLLECTION).update(
   { username: currentUsername },
   {
      datasets: currentDatasets.push(newDataset)
   }//,
   //{ upsert: true }
)*/
