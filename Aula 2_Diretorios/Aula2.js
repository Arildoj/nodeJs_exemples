/** Created by arild on 27/05/2016. ...*/
var http = require('http');

var server = http.createServer(function(request, response){
    response.writeHead(200, {"content-Type": "text/html"});

    if(request.url == '/'){
        response.write("<h1>Pagina Principal</h1>");
    }
    else if(request.url=='/contato'){
        response.write("<h1>Pagina de Contatos");
    }
    else if(request.url=='/clientes'){
        response.write("<h1>Pagina de Clientes");
    }
    else{
        response.write("<h1>Pagina nao encontrada");
    }
    
    response.write("<h2>Aula 2</h2>");
    response.end();
});

server.listen(3000, function(){
    console.log('Aula 2 - Servidor está rodando!');
});