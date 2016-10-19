var express = require('express');
var app = express();

app.get('/hello', function(req, res){
	res.send('{"message": "Hello, ' + req.query.name + '"}');

});

app.use(express.static('public'));

app.listen(3000, function () {
	console.log('example app listening on port 3000!');app.use(express.static('public'));
});