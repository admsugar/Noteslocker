/**
 * server.js
 * Created by Adam on 2/13/2016.
 */

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

// configure app:
// to log requests to the console
app.use(morgan('dev'));

// to use bodyParser(): this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set the port the application will run on
var port = process.env.PORT || 8080;

// mongoDB connection stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testNotesLocker');
var User = require('./app/models/user');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    //connected
    console.log("db connection!");
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//middleware to use for all requests
router.use(function(req, res, next) {

    //magic middleware stuff here (user authentication?)

    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.sendfile('./app/views/index.html');
});

router.route('/users')

    // create a user (accessed at POST http://localhost:8080/users)
    .post(function(req, res) {

        var user = new User();		// create a new instance of the User model
        user.name = req.body.name;  // set the users name (comes from the request)

        user.save(function(err) {
            if (err)
                res.send(err);

            //console.log("User: " + user.name + " was created!");
            res.json({ message: 'User created!' });
        });
    })

    // get all the users (accessed at GET http://localhost:8080/users)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

router.route('/users/:user_id')

    // get the user with that id
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            //res.json(user);
            res.sendfile('./app/views/profile.html');
        });
    })

    //// update the user with this id
    //.put(function(req, res) {
    //    User.findById(req.params.user_id, function(err, user) {
    //
    //        if (err)
    //            res.send(err);
    //
    //        user.name = req.body.name;
    //        user.save(function(err) {
    //            if (err)
    //                res.send(err);
    //
    //            res.json({ message: 'User updated!' });
    //        });
    //
    //    });
    //})

    //// delete the user with this id
    //.delete(function(req, res) {
    //    User.remove({
    //        _id: req.params.user_id
    //    }, function(err, user) {
    //        if (err)
    //            res.send(err);
    //
    //        res.json({ message: 'User successfully deleted' });
    //    });
    //});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happening on port ' + port);