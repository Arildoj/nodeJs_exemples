/**
 * Created by arild on 27/05/2016.
 */
var http = require('http');

var server = http.createServer(function(request, response){
    response.writeHead(200, {"content-Type": "text/html"});
    response.write("<h1>Hello World!</h1>");
    response.end();
});

server.listen(3000, function(){
    console.log('Servidor está rodando!');
});