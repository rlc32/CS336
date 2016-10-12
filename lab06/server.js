/*
exercise 6.1
A. in chrome it is possible to test the get method and the all method/ bad request method. Using curl it is possible to test every method except the .all/ bad request method.
	for chrome to test all/bad request i used http://localhost:3000/user
	for chrome to test get request i used http://localhost:3000/request
	for curl to test get i used curl --get http://localhost:3000/request
	for curl to test head i used curl --head http://localhost:3000/request
	for curl to test post i used curl -X POST http://localhost:3000/request -d '{"russ" : "100"}' -H 'Content-Type: application/json'
	for curl to test put i used curl -X PUT http://localhost:3000/request -d '{"russ" : "100"}' -H 'Content-Type: application/json'
	for curl to test delete i used curl -X DELETE http://localhost:3000/request -d '{"russ" : "100"}' -H 'Content-Type: application/json'

B. What is most appropriete HTTP response code for pages that are not defined?
	404 PAGE NOT FOUND is the most appropriate code

Exercise 6.2
A. The only HTTP methods that form supports is post and get.

B. the form data is being passed back to the server through three keywords that are embedded in the http request. Express uses the module body-parser to parse the http request
to find the three keywords based off of the 'name' attribute.

*/

var express = require('express');
var app = express();
var http_code = require('http-status-codes');
var parser = require('body-parser');
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static('public'));

// get request method
app.get('/request', function(req, res){
	res.send('Hello get!');
});
// post request method
app.post('/forms', function (req, res){
	res.send('Got a post request' + '<br> NAME: ' + req.body.user_name + '<br>EMAIL: ' + req.body.user_mail + '<br>MESSAGE: ' + req.body.user_message);
});

app.post('/request', function(req, res){
	res.send('Got a post request at /request' + req.body.russ);
});

// put request method
app.put('/request', function(req, res){
	res.send('Got a put request at /request' + req.body.russ);
});
// head request method
app.head('/request', function(req, res){
	res.send("hello head");
});
// delete request method
app.delete('/request', function(req, res){
	res.send('got a delete request at /request' + req.body.russ);
});
// bad request method
app.all('*', function(req, res){
	res.sendStatus(http_code.FORBIDDEN);
});

















app.listen(3000, function (){
	console.log('example app listening on port 3000!');
});