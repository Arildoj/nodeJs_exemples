/**
 * Created by arild on 02/06/2016.
 */
// acesso as bibliotecas do nodejs
var http = require('http')
    ,arquivo = require('fs')
    ,path = './serverLog.txt';
//criação do servidor
var server =  http.createServer(function(request, response){
    response.writeHead(200,{"content-Type": "text/html"});
    //diretorios
    if(request.url =='/'){
        arquivo.readFile(__dirname+'/index.html',function(err, html){
            if(err) throw response.write("Arquivo index.html não encontrado.");
            response.write(html);
            response.end();
        });
    }
    else if(request.url =='/contatos'){
        response.write("<h1>Pagina contatos</h1>");
        response.write("<p>Paragrafo teste</p>");
    }
    else if(request.url =='/clientes'){
        response.write("<h1>Pagina clientes</h1>");
        response.write("<p>Paragrafo teste</p>");
    }
});
//criação de arquivo de logs do servidor
arquivo.exists(path,function(resposta){//teste de existencia do arquivo
    if(!resposta){
        arquivo.writeFile(path,'**Server Log**',function (err) {//escrita do arquivo
            if(err) throw err;
            console.log("/> Arquivo de 'logs' não encontrado\n/> Criando arquivo de 'logs'\n/> Arquivo criado com sucesso!!!\n...");
            listener();
        });
    }
    else{
        console.log("\n/> Arquivo de 'logs' encontrado!");
        arquivo.readFile(path,function (err,data) {//leitura do arquivo
            if(err) throw err;
            console.log("/> Lendo arquivo\n   "+data.toString()+"\n/> Fim do arquivo");
            listener();
        });
    }
});

function listener(){
    server.listen(3000, function(){//escuta da porta 3000 - servidor online
        console.log(".\n.\n.\n/> Servidor online");
        console.log(__dirname);
    });
}

