var express = require('express');
var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('views', path.join(__dirname));

app.set('view engine', 'ejs');

app.get('/',function(req, res){
	res.render('index');

});



io.on('connection', function(socket){


console.log('Client connected'+ " with id " +socket.id);


	socket.on('push', function(notification){

		notification = notification + 'from Client '+socket.id;

		socket.broadcast.emit('push', notification);

	console.log(notification); 

});





	socket.on('disconnect',function(){

	console.log('Client disconnected'+" with id " +socket.id);

});


});



http.listen(3000, function(){
	
	console.log('Running on port 3000 !');

});
