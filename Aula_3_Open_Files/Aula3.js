var arquivo = require('fs');

arquivo.readFile('./Arquivos/clubs.txt', function(err, data){
    if(err) throw err;
    console.log(data.toString());
});