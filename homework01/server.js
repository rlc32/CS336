/*This data structure holds all of the information about each employee*/
function people(FirstName, LastName, IDNum, StartDate){
	this.FirstName = FirstName;
	this.LastName = LastName;
	this.IDNum = IDNum;
	this.StartDate = StartDate;
}
/*function that gets the length of time the employee has been at the company*/
function Age(givenDate){
	var today = new Date();
	var startDay = new Date(givenDate);
	var oldness = today.getFullYear() - startDay.getFullYear();
	var month = today.getMonth() - startDay.getMonth();
	if(month < 0 || (month == 0 && today.getDate() < start.getDate())) {
		oldness--;
	}
	return oldness;
}





/*list of all people who work at this company*/
var PeopleList = [];
PeopleList.push(new people("Russ", "clousing", "0000", "2000/01/01"));
PeopleList.push(new people("John", "smith", "0001", "2002/02/02"));
PeopleList.push(new people("Jordan", "kent", "0002", "2010/09/06"));
PeopleList.push(new people("Rita", "tammeling", "0003", "2005/04/08"));
PeopleList.push(new people("Nate", "tammeling", "0004", "2016/01/01"));


const express = require('express');
var app = express();
/*this returns a list of everyone and all their information*/
app.get('/people', (req, res) => {
	res.json(PeopleList)
});
//this returns all information about the person with the id number entered. or a 404 if the id does not exist
app.get('/person/:IDNum', (req, res) => {
	const id = req.params["IDNum"];
	for (people of PeopleList){
		if(people["IDNum"] == id){
			res.json(people["FirstName"] + " " + people["LastName"] + " " + people["IDNum"] + " " + people["StartDate"]);
			return
		}
	}
	res.sendStatus(404);
});
//this returns the first and last name of the person with that id number or a 404 if the id does not exist
app.get('/person/:IDNum/name', (req, res) => {
	const id = req.params["IDNum"];
	for (people of PeopleList){
		if(people["IDNum"] == id){
			res.json(people["FirstName"] + " " + people["LastName"]);
			return
		}
	}
	res.sendStatus(404);
});
//this returns the amount of years some one has worked at the company or a 404 if the id does not exist
app.get('/person/:IDNum/age', (req, res) => {
const id = req.params["IDNum"];
	for (people of PeopleList){
		if(people["IDNum"] == id){
			res.json(Age(people["StartDate"]).toString());
			return
		}
	}
	res.sendStatus(404);
});
//starts the server listining on port 3000
app.listen(3000, () => {
	console.log("listining on port 3000");
});

