//this is the data format
function Person(first_name, last_name, loginId, startDate) {
	this.first_name = first_name
	this.last_name = last_name
	this.loginId = loginId
	this.startDate = startDate
}
//returns the age of a person based off of their starting date
function getAge(dateString) {
	var today = new Date();
    var start = new Date(dateString);
    var age = today.getFullYear() - start.getFullYear();
    var m = today.getMonth() - start.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < start.getDate())) {
        age--;
    }
    return age;
}
// adding people to the database.



var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var db;

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
//get all people
app.get('api/people', (req, res) => {
	db.collection("homework03").find({}).toArray(function(err,docs){
		assert.equel(err,null);
		res.json(docs);
	});
});
//add a new person to the data base
app.post('/api/people', function(req,res){
	  var new_person = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        idnumber: req.body.idnumber,
        startdate: req.body.startdate,
    };
    db.collection("homework03").insertOne(new_person, function(err, result) {
        assert.equal(err, null);
        res.json(result);
    });
})
//============================all the get routes needed ===========================================
//write all to webpage
app.get('/people', function(req, res) {
    console.log('al employees info')
    db.collection("homework03").find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        res.json(docs);
    })
});
//full record of employee with the id number
app.get('/person/:ID', function(req, res) {
    var loginID = req.params.ID;
    db.collection("homework03").find().toArray(function(err, docs) {
        for (object of docs) {
            if (object["idnumber"] == loginID) {
                res.json(object);
            }
        }
    });
});
//first and last name off the employee who has this id number
app.get('/person/:ID/name', function(req, res) {
    var loginID = req.params.ID;
    db.collection("homework03").find().toArray(function(err, docs) {
        for (object of docs) {
            if (object["idnumber"] == loginID) {
                var temp_name = object["firstname"] + " " + object["lastname"];
                res.json(temp_name);
            }
        }
    });
});

//how many years the employee has been at the comapny
app.get('/person/:ID/years', function(req, res) {
    var loginID = req.params.ID;
    db.collection("homework03").find().toArray(function(err, docs) {
        for (object of docs) {
            if (object["idnumber"] == loginID) {
                var years = getAge(object["startdate"]);
                res.json(years);
            }
        }
    });
});
//==================================put post delete for the server ===========================================================
//add a new person from the webpage form
app.post('/people', function(req, res) {

    // Create a person from the data given
    var new_person = {
        firstname: req.body.user_first_name,
        lastname: req.body.user_last_name,
        idnumber: req.body.user_id_number,
        startdate: req.body.user_start_date,
    };

    // Add the newPerson to the people collection in the Mongo Database
    db.collection("homework03").insertOne(new_person, function(err, result) {
        assert.equal(err, null);
    });

    // Create a JSON object for the result data that is going to get sent back
    resultData = {"first" : req.body.user_first_name, "last" : req.body.user_last_name};

    // Send the JSON object result data back to the Web Page
    res.json(JSON.stringify(resultData));

});
//retrieve infromation about specific employee based off of ID number
app.post('/person/:ID', function(req, res) {
    // Get the ID Number
    var loginID = req.body.id_number;
    // Find the person with that id number
    db.collection("homework03").find().toArray(function(err, docs) {
        for (object of docs) {
            if (object["idnumber"] == loginID) {
                resultData = {"first": object["firstname"], "last": object["lastname"], "ID": object["idnumber"], 
                                "years": getAge(object["startdate"])};
                res.json(JSON.stringify(resultData));
                return;
            }
        }
    });
});
//update an employee's information
app.put('/person/:ID', function(req, res) {
    var loginID = req.params.ID;
    db.collection("homework03").updateOne({idnumber: loginID}, { $set: {firstname: req.body.firstname, lastname: req.body.lastname,
            idnumber: req.body.idnumber, startdate: req.body.startdate}});

    res.json('Successfully updated employee with ID: ' + loginID);
});
//remove a persons information
app.delete('/person/:ID', function(req, res) {
    var loginID = req.params.ID;
    db.collection("people").deleteOne({idnumber: loginID});
    res.json('Successfully removed employee infromation with ID number: ' + loginID);
});
//=====================================catch bad urls =========================================================================
app.all('*', function(req,res){
	console.log("Page not found, possibly bad data entered.");
	res.sendStatus(404);
});
//=============================server and data base info here ================================================================
MongoClient.connect('mongodb://cs336:bjarne@ds031203.mlab.com:31203/cs336', function(err, dbConnection){
    if (err) throw err;
    db = dbConnection;
})
app.listen(3000, () => {
	console.log("listening on port 3000")
})

