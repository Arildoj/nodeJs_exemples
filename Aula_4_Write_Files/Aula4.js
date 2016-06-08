var arquivo = require('fs');

arquivo.writeFile('./novo.txt', 'Criando arquivo com nodejs', function(err){
    if(err) throw err;
    console.log("Arquivo criado com sucesso!!!");
});