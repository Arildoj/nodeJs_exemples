var http = require('http');
var arquiv = require('fs');
var modulo = require('./modules/mod1.js');
var pessoa = require('./Modules/mod2.js');

modulo('Arildo');
pessoa.minhaIdade('26');
pessoa.minhaProfissao('Eng. Telecom');
var path = './serverLog.txt';
var port = process.env.port || 1337;
var server = http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	if (req.url == '/') {
		res.write("<h1>Index</h1>");
		files();
	} else { res.write("<h1>Page not found</h1>"); }
    res.end();
}).listen(port);

server.listen(3000, function () {
	console.log("Servidor online");
});

function files() {
	arquiv.exists(path, function (result) {
		if (!result) {
			console.log('Log do servidor nao encontrado');
			arquiv.writeFile(path, 'server initilized', function (err) {
				if (err) throw console.log('Erro');
				
			});
		} else {
			console.log('Arquivo encontrado');
			arquiv.readFile(path, function (err, data) {
				if (err) throw err;
				console.log(data.toString());
			});
		}
	});
}