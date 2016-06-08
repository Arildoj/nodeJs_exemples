/**
 * Created by arild on 01/06/2016.
 */
//Acessando opções da biblioteca  - fs
var arquivo = require('fs');
var path = './Arquivos/clubs.txt';

arquivo.exists(path, function(resultado){
    if(!resultado){
        arquivo.writeFile(path,'Criando arquivo com NodeJs', function(err){
            if(err) throw err;
            console.log('Arquivo criado com sucesso!!');
        });
    }
    else{
        console.log('Arquivo existente.');
        arquivo.readFile(path, function(err, data){
            if(err) throw err;
            console.log("Lendo arquivo...\n"+"\n/>"+data.toString());
        });
    }
});
