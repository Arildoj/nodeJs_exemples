var pisc={aa:0, b:0};
blink=1;
function pisca(){
	pisc.aa = setInterval(function(){
		if(blink==1){
			imagem.src="Img/Blink2.png";
			blink=0;
		}

		else{
			imagem.src="Img/Blink1.png";
			blink=1;
			pisc.b=0;
			clearInterval(pisc.aa);
		}
	},250);

}

pisc.b = setInterval(function(){
	imagem = document.getElementById('imagem');
	window.clearInterval(pisc.aa);
	pisca();
	imagem.onclick=function(){
	alert('Bem Vindo ao Dino Game');
	}
},2500);

function naoPisca () {
	window.clearInterval(pisc.aa);
	window.clearInterval(pisc.b);
}

