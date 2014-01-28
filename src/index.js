var http = require('http');
var port = 3000;

var server = http.createServer(function (request, response) {
	response.writeHeader(200);
	response.end('words');
});

server.listen(port, function () {
	console.log("server listening on:" + port);
});
