var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('Hello World!');

});



app.listen(3000, function () {
	console.log('example app listening on port 3000!');app.use(express.static('public'));
});