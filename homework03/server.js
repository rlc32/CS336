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
var list_of_persons = []



const express = require('express')
const bodyParser = require('body-parser')
var app = express()
var MongoClient = require('mongodb')
var db;

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/people', (req, res) => {
	updateList()
	res.json(list_of_persons)
})

app.get('/:loginId', (req, res) => {
	const id = req.params["loginId"]
	updateList()
	for (person of list_of_persons) {
		if (person["loginId"] == id) {
			res.json(person)
			return
		}
	}
	res.sendStatus(404)
})

app.delete('/:loginId', (req, res) => {
	const id = req.params["loginId"]
	updateList()
	for (person of list_of_persons) {
		if (person["loginId"] == id) {
			index = list_of_persons.indexOf(person)
			list_of_persons.splice(index, 1)
			res.send("Succesfully removed " + person.first_name + " " + person.last_name + " from the database.")
		}
	}
})

app.put('/:loginId', (req, res) => {
	const id = req.params["loginId"]
	for (person of list_of_persons) {
		if (id == person["loginId"]) {
			person.first_name = req.body.first
			person.last_name = req.body.last
			person.loginId = req.body.id
			person.startDate = req.body.startDate
			res.send("Updated the database")
		}
	}
})

app.get('/:loginId/name', (req, res) => {
	const id = req.params["loginId"]
	updateList()
	for (person of list_of_persons) {
		if (person["loginId"] == id) {
			res.json(person["first_name"] + " " + person["last_name"])
			return
		}
	}
	res.sendStatus(404)
})

app.get('/:loginId/years', (req, res) => {
	const id = req.params["loginId"]
	updateList()
	for (person of list_of_persons) {
		if (person["loginId"] == id) {
			res.json(getAge(person["startDate"]).toString())
			return
		}
	}
	res.sendStatus(404)
})

app.post('/add_person', (req, res) => {
	//add in checks
	var temp_person = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		id: req.body.id,
		date: req.body.start_date
	}
	db.collection("homework03").insertOne(new_person, (err, result) => {
		if (err) {
			console.error(err)
			process.exit(1)
		}
	})
	resData = {"first": req.body.first_name,
				"last": req.body.last_name}
	res.json(JSON.stringify(resData))
	updateList()
})


app.post('/find_person', (req, res) => {
	updateList()
	for (person of list_of_persons) {
		if (person["loginId"] == req.body.id) {
			resData = {"first": person["first_name"],
							"last": person["last_name"],
							"id": person["loginId"],
							"date": person["startDate"]}
			res.json(JSON.stringify(resData))
		}
	}
})
MongoClient.connect('mongodb://cs336:'+process.env.MONGO_PASSWORD+'@ds031203.mlab.com:31203/cs336', function(err, dbConnection){
    if (err) throw err;
    db = dbConnection;
})
app.listen(3000, () => {
	console.log("listening on port 3000")
})

function updateList(){
	db.collection('homework03').find().toArray((err, items) => {
		list_of_persons = []
		for(data in items){
			list_of_persons.push(new Person(data["first_name"], data["last_name"], data["id"], data["startDate"]))
		}
	})
}