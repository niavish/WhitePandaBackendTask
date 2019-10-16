const Car = require('../models/car.model');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.test = function (req, res) {
    res.send('Greetings!');
};

exports.add = function (req, res) {

    // console.log(req);
    // console.log(req.query);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var dbo = db.db("mydb");
        var myobj = req.query;
        dbo.collection("car").insertOne(myobj, function (err, response) {
            if (err) throw err;
            console.log("car added to database");
            res.send("Car Added Succesfully!");
        });
        db.close();
    });
}

exports.getCarDetails = function (req, res) {

    // res.send(req.query);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var dbo = db.db("mydb");
        var myobj = {
            modelNo: req.params.modelNo
        };

        dbo.collection("car").find(myobj).toArray(function (err, result) {
            if (err) throw err;
            res.send(result[0]);
        });
        db.close();
    });
}
exports.updateCar = function (req, res) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        var myquery = { modelNo: req.params.modelNo };

        dbo.collection("car").find(myquery).toArray(function (err, result) {
            if (err) throw err;

            if (result[0].bookings.length == 0) {

                var newvalues = { $set: req.query };
                dbo.collection("car").updateOne(myquery, newvalues, function (err, response) {
                    if (err) throw err;
                    console.log("car details updated");
                    res.send("Car Details Updated Succesfully!");
                });
            }
            else {
                res.send("Could Not update Details!");
            }
        });
        db.close();
    });
}

exports.deleteCar = function (req, res) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        var myquery = { modelNo: req.params.modelNo };

        dbo.collection("car").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("car entry deleted");
            res.send("Deleted Successfully!");
        });
        db.close();
    });
}