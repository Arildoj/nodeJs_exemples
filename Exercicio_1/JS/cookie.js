//Escreve cookie
function writeCookie(name, value, days){
	//por default, não existe expiração, ou seja o cookie é temporário
	var expires = "";

	//Especifica o número de dias para guardar o cookie
	if(days){
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = "; expires=" + date.toGMTString();
	}

	if(value != "" && value != null && value !="null"){
		//Define o cookie com o nome, valor e data de expiriração
		document.cookie = name + "=" + value + expires + ";  path=/";
	}
}

//lê cookie
function readCookie(name){
	//Encontra o cookie especificado e retorna o seu valor
	var searchName = name + "=";
	var cookies = document.cookie.split(';');
	//lê os cookies
	for(var i=0; i<cookies.length; i++){
		var c = cookies[i];
		while (c.charAt(0) == ' ')
		{
			c=c.substring(1, c.length);
		}
		if(c.indexOf(searchName) == 0)
		{
			return c.substring(searchName.length, c.length);
		}
	}
	return null;
}

//Limpa o cookie
function eraseCookie(name){
	//exclui o cookie
	writeCookie(name, "",-1);
}
