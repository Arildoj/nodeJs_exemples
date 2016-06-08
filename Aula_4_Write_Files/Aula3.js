var arquivo = require('fs');

arquivo.readFile('./Arquivos/clubs.txt', function(err, data){
    if(err) throw err;
    console.log(data.toString());
});

arquivo.writeFile('./Arquivos/novo.txt', 'Criando arquivo com nodejs', function(err){
    if(err) throw err;
    console.log("Arquivo criado com sucesso!!!");
});