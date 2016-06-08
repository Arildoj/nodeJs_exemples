/**************************************************************************************************
///////////////////////////////////////////////////////////////////////////////////////////////////
		Autor:Arildo                                                   Versão:5.0.2.0
///////////////////////////////////////////////////////////////////////////////////////////////////
**************************************************************************************************/


//Cria o cookie
var vect=[];
var a = readCookie('Score');
if((a== null)||(a==" ")||(a=='null')){
	writeCookie("Score",'ninguem%5',1);
}

var timeDraw=0;
var terrain=0;

//Manipulação dos elementos Graficos - Canvas
var canvas = document.getElementById("canvas_2");//Pega elemento canvas pelo Id
var ctx = canvas.getContext('2d');//manipula imagem em 2d

//Elementos HTML
var corpo = document.getElementById("corpo");//Pega elemento body pelo Id
var botao= document.getElementById("botao");//Pega o elemento botão pelo Id
//Variáveis objetos, possíveis de serem alteradas para um vetor
var control={savedPosition:158, timeJump:0, timeWalk:0,tecla:0, sentido:1, terrain:0, a:0, 
    imgground:0, timeDraw:0, savePasso:0, timeVelocity:0, velocidade:80, colisao:0, score:0, alt:0};

//Variáveis Globais
var TRexImages=['Img/TRex.png', 'Img/TRexPasso1.png', 'Img/TRexPasso2'];
var arrayScenary=[];
var arrayCacto=[];
//Define as posições
var positions ={TRex:153, firstFloor:153, cactoPosition:153};

//             manipulação da entidade dino
//---------------------------------------------------------
//---------------------Dino(inicio)------------------------
//---------------------------------------------------------
function Dino(variavel){
	var TRex = new Object();//TRex
	//Objeto imagens
	var imgTRex = new Image();
	var imgTRexColisao = new Image();
	this.desenha = draw;
	//Desenha o dino
	function draw(){
			imgTRex.onload=function(){
			ctx.drawImage(imgTRex,0,positions.TRex);
		}
		imgTRex.src='Img/TRex.png';//Origem da imagem
	}
	
	ctx.save();//Salva o eestatus atual

	this.pulo= jump;

	function jump(){
		var anda=0;
		imgTRex.onload=function(){//load na imagem
			clearInterval(control.timeWalk);//cancela o timer do walk para iniciar o pulo

			//                  IF - sobe,  ELSE - desce
			//sobe
			if(control.sentido==1){//sentido referente ao pulo(cima,baixo)
				
				control.savedPosition -= 50;//decresce a posição para subir

				// Mapa de pixel da tela
				///////////////////////////
				//0,0 ------------- 0,500//
				//|                      //
				//|                      //
				//|                      //
				//200,0           200,500//
				///////////////////////////

				//serve para colocar na posição '0' (se menor que10) e muda sentido para baixo.
				if(control.savedPosition<10){control.savedPosition=0;control.sentido=0;}
				else{}//Faz nada

				ctx.drawImage(imgTRex,0,control.savedPosition);//desenha o dino pra cima
				ctx.clearRect(0,(control.savedPosition+50), 50,55);//apaga a posição anterior do terreno abaixo do dino
				ctx.drawImage(imggroundFirst,0,positions.firstFloor);//redesenha o solo sem dino

				//se houver cacto no solo
				if (arrayCacto[0]!=' ') {
					ctx.drawImage(imgCacto,0,positions.cactoPosition);//desenha o cacto sobre o terreno
				}
			}

			//desce
			else{
				control.savedPosition += 50;//Acresce a posição para descer

				//Se voltou para o solo, savePosition volta pra original, o controle de sentido pra 1, limpa o Frame do dino,
				//limpa o controle de tempo de subida, libera a tecla de pulo e volta a andar
				if(control.savedPosition>150){control.savedPosition=positions.TRex;control.sentido=1;
					ctx.clearRect(0,150, 50,50);clearInterval(control.timeJump);control.tecla=0;anda=1;gambiarra();}
				else{}

				ctx.drawImage(imggroundFirst,0,positions.firstFloor);//desenha o Frame floor

				//--------------CONTROLE_DE_COLISÃO------------------
				//com colisão
				if ((arrayCacto[0]!=' ')||(arrayCacto[1]!=' ')) {
					if(arrayCacto[0]!=' '){ctx.drawImage(imgCacto,0,positions.cactoPosition);}
					else{ctx.drawImage(imgCacto,1,positions.cactoPosition);}
					//controle de colisão
					if(control.savedPosition>100){
						ctx.clearRect(0,control.savedPosition-50, 50,50);//Limpa o frame do dino
						ctx.drawImage(imgTRexColisao,0,108);//e desenha o dino morto
						//cancela as plotagens após a colisão
						clearInterval(control.timeWalk);//Limpa o timer do walk
						clearInterval(timeDraw);//Limpa o timer de desenho
						clearInterval(control.timeJump);//Limpa o timer de pulo
						clearInterval(control.timeVelocity);//Limpa a velocidade atual do dino
						clearInterval(control.roll);
						control.colisao=1;
					}
				}
				
				if(control.colisao==1){
					pontuacao();//Mostra score
				}

				//sem colisão
				else{
					ctx.drawImage(imgTRex,0,control.savedPosition);
					ctx.clearRect(0,(control.savedPosition-50), 50,50);
				}
				//-----------FIM_CONTROLE_DE_COLISÃO--------------
			}
		}
		//Fontes das imagens
		imggroundFirst.src=arrayScenary[0];
		imgCacto.src='Img/Terrain/Cacto1.png';
		imgTRex.src='Img/TRex.png';
		imgTRexColisao.src='Img/Colision.png';

	}

		//Gambiarra - Reemplementar posteriormente (Redundante com a função walk())
		function gambiarra(){
			var a =0;
			control.timeWalk= setInterval(function(){

				if(a==0){
					a=1;
					imgTRex.onload=function(){
						ctx.clearRect(0,positions.TRex, 50,50);
						ctx.drawImage(imggroundFirst,0,positions.firstFloor);
						
						if (arrayCacto[0]!=' ') {
							ctx.drawImage(imgCacto,0,positions.cactoPosition);

							if(control.savedPosition>100){
								ctx.clearRect(0,control.savedPosition-50, 50,50);
								ctx.drawImage(imgTRexColisao,0,positions.firstFloor);
								clearInterval(control.timeWalk);
								clearInterval(timeDraw);
								clearInterval(control.timeJump);
								clearInterval(control.timeVelocity);
								clearInterval(control.roll);
								control.colisao=1;
								control.tecla=1;
							}
						}

						if(control.colisao==1){
							pontuacao();//Mostra score
						}
						
						else{
							//ctx.drawImage(imggroundFirst,0,positions.firstFloor);
							ctx.drawImage(imgTRex,0,positions.TRex);
						}
					}
					imgCacto.src='Img/Terrain/Cacto1.png';
					imggroundFirst.src=arrayScenary[0];
					control.savePasso='Img/TRexPasso1.png';
					imgTRex.src='Img/TRexPasso1.png';
					imgTRexColisao.src='Img/Colision.png';
				}
				else{
					a=0;
					imgTRex.onload=function(){
						ctx.clearRect(0,positions.TRex, 50,50);
						ctx.drawImage(imggroundFirst,0,positions.firstFloor);
						
						if (arrayCacto[0]!=' ') {
							ctx.drawImage(imgCacto,0,positions.cactoPosition);
						}
						
						//ctx.drawImage(imggroundFirst,0,positions.firstFloor);
						ctx.drawImage(imgTRex,0,positions.TRex);
					}
					imgCacto.src='Img/Terrain/Cacto1.png';
					imggroundFirst.src=arrayScenary[0];
					control.savePasso='Img/TRexPasso2.png';
					imgTRex.src='Img/TRexPasso2.png';
				}
			},100);
		}

	this.walk=walk;

	//Faz o dino andar
	function walk(){
		ctx.clearRect(0,150, 50,50);//Limpa cada frame antes de andar
		var a = 0;//variavel de controle de passo (perna direita=0, perna esquerda=1)

		//desenha
		imgTRex.onload=function(){
			control.timeWalk= setInterval(function(){
				//Perna Direita
				if(a==0){
					a=1;//Troca pra o proximo looping pra esquerda
					imgTRex.onload=function(){
						ctx.clearRect(0,positions.TRex, 50,50);//Limpa o frame sob o dino
						ctx.drawImage(imggroundFirst,0,positions.firstFloor);//Desenha de novo o terreno
						
						//--------------CONTROLE_DE_COLISÃO------------------
						//com colisão
						if (arrayCacto[0]!=' ') {
							ctx.drawImage(imgCacto,0,positions.cactoPosition);
							//controle de colisão
							if(control.savedPosition>100){
								ctx.clearRect(0,control.savedPosition-50, 50,50);//Limpa o frame do dino
								ctx.drawImage(imgTRexColisao,0,positions.firstFloor);//e desenha o dino morto
								//cancela as plotagens após a colisão
								clearInterval(control.timeWalk);//Limpa o timer do walk
								clearInterval(timeDraw);//Limpa o timer de desenho
								clearInterval(control.timeJump);//Limpa o timer de pulo
								clearInterval(control.timeVelocity);//Limpa a velocidade atual do dino
								clearInterval(control.roll);
								control.colisao=1;//controle de colisão - positivo
								control.tecla=1;//Bloqueia pulos
							}
						}

						if(control.colisao==1){
							pontuacao();//Mostra score
						}

						//Sem colisão
						else{
							ctx.drawImage(imgTRex,0,positions.TRex);//Desenha o dino
						}
					}
					//Fonte das imagens
					imgCacto.src='Img/Terrain/Cacto1.png';
					imggroundFirst.src=arrayScenary[0];
					control.savePasso='Img/TRexPasso1.png';
					imgTRex.src='Img/TRexPasso1.png';
					imgTRexColisao.src='Img/Colision.png';
				}
				//Perna Esquerda
				else{
					a=0;//Troca pra o proximo looping pra direita
					imgTRex.onload=function(){
						ctx.clearRect(0,positions.TRex, 50,50);//Limpa o frame novamente
						ctx.drawImage(imggroundFirst,0,positions.firstFloor);//Redesenha o floor onde estava o dino
						//Se tiver cacto sob terreno
						if (arrayCacto[0]!=' ') {
							ctx.drawImage(imgCacto,0,positions.cactoPosition);//Redesenha o cacto
						}
						
						ctx.drawImage(imggroundFirst,0,positions.firstFloor);//desenha o floor
						ctx.drawImage(imgTRex,0,positions.TRex);//redesenha o dino
					}
					//Fonte das Imagens
					imgCacto.src='Img/Terrain/Cacto1.png';
					imggroundFirst.src=arrayScenary[0];
					control.savePasso='Img/TRexPasso2.png';
					imgTRex.src='Img/TRexPasso2.png';
				}
			},100);//Tempo entre iterações de subida e descida(100ms)
		}
	}
}
// --------------------------------------------------------------------
//-----------------------------Dino(fim)-------------------------------
//---------------------------------------------------------------------


// --------------------------------------------------------------------
//--------------------------Terreno(inicio)----------------------------
//---------------------------------------------------------------------
//Manipulação da entidade terreno
function Terrain(){
	var ground= new Object();//Terreno
	//Objetos imagens terreno
	imgground = new Image();
	imggroundFirst=new Image();
	imggpasso = new Image();
	//Objetos imagem cacto
	var Cacto = new Object();
	imgCacto = new Image();

	this.rotate = rotate;
	this.drawTerrain = draw;

	//Desenha o terreno - Inicia o quadro
	function draw(){
		var i=0;
		terrain=setInterval(function(){

			while(i<10){
				var numb=Math.floor(Math.random()*14)+1;//(Math.random()*(max-min))-min
				var scenary = 'Img/Terrain/Terrain'+numb+'.png';//Concatena diretório com um número aleatório
				arrayScenary.push(scenary);//Coloca no vetor

				//gera posições aleatórias do cacto
				var numb1=Math.floor(Math.random()*50);//(Math.random()*(max-min))-min

				//probabilidade de sair um cacto [1-(45/50)]
				//Se desenhar cacto
				if((numb1>45)&&(i>4)){
					arrayCacto[i]=('Img/Terrain/Cacto.png');//Atribui o cacto ao vetor
				}
				//se não desenhar o cacto
				else{
					arrayCacto[i]=' ';//Atribui 'vazio' ao vetor
					i++;
				}
			}
			//Desenha o terreno, logo depois o cacto no solo, se existir naquela posição
			imgground.onload=function(){
				ctx.drawImage(imgground,(50*control.a), positions.firstFloor);//desenha na posição (0,50,100...450)
				//se tiver cacto no vetor
				if((arrayCacto[control.a]!=' ')&&(control.a>4)){
					ctx.drawImage(imgCacto,(50*control.a),positions.cactoPosition);//desenha o cacto na posição (0,50,100...450)
				}
			}
			//Fonte das imagens
			imgground.src=arrayScenary[control.a];
			imgCacto.src='Img/Terrain/Cacto1.png';


			//responsavel por zerar o contador do interval de rotação
			if(control.a>9){
				clearInterval(terrain);//limpa o contador
				control.a=0;//limpa a variavel de controle
				rotate();//inicia nova rotação
			}
			control.a++;//Controla as passagens pela função
		},10);//Tempo para execução da função(10ms)
	}
	
	ctx.save();//salva o estatus atual da imagem => caso erro friza a tela

	//Responsável pelo deslocamento do cenário
	function rotate(){
		var numb=0;//guarda o valor > (Math.random()*(max-min))-min
		var scenary =0;//Concatena diretório com um número aleatório
		var array= new Array();//novo array a ser manipulado - terreno
		var array2=new Array();//novo array a ser manipulado - cacto
		var teste=0;//controle de rotação
		var i=0;//Variavel de controle de rotação do vetor

		arrayCacto[0]=' ';//Inicia sem cacto na posição do dino

		//Desenha toda bagunça (Terreno e cacto)
		timeDraw= setInterval(function(){
			//usar switch para fazer mais de uma opção
			switch(teste){
				//Gera um novo frame posição 10 e rotaciona todos os vetore
				case 0:
				{
					with(Math){
						numb=floor(random()*14)+1;//(Math.random()*(max-min))-min
						numb1=floor(random()*50);//(Math.random()*(max-min))-min
					}

					scenary = 'Img/Terrain/Terrain'+numb+'.png';//Concatena diretório com um número aleatório - terreno aleatório
					arrayScenary[10]= scenary;
					//Faz com que apareça os cactos e evita que haja 2 cactos seguidos
					//Se houver cacto
					if((numb1>45)&&(arrayCacto[9]==' ')&&(arrayCacto[8]==' ')){//Cria um cacto na posição [10] com probab. 1-(45/50)
						arrayCacto[10]=('Img/Terrain/Cacto.png');//Atribui um cacto na posição(200,500), frame final
					}

					//se não houver cacto
					else{
						arrayCacto[10]=' ';//Posição 10 vazia
					}

					//atribui as posições ao novo vetor
					while(i<10){
							array[i+1]=arrayScenary[i+1];
							array2[i+1]=arrayCacto[i+1];
						//rotaciona o vetor em uma posição a direita
							arrayScenary[i]=array[i+1];
							arrayCacto[i]=array2[i+1];
						i++;//Incremento da variável de rotação do vetor
					}
					i=0;//Zera a variável de varredura do vetor
					teste=1;//Passa o controle de rotação para 1
					break;
				}
				//Varre os vetores desenhando as imagens
				case 1:
				{
					//Se ja tiver desenhado todas imagens
					if(control.a>9){
						teste=0;//zera o controle de rotação
						clearInterval(timeDraw);//Zera o timer que desenha
						control.a=0;//Zera control.a
						i=0;//Zera a variável de rotação do vetor
						rotate();//chama a rotação de novo
						break;
						}
					
					//Senão - vai desenhando elas
					else{
						//Fonte das imagens
						imgground.src=arrayScenary[control.a];
						imggpasso.src=control.savePasso;
						imgCacto.src='Img/Terrain/Cacto1.png';

						//Desenha as imagens nas posições de 0 a 450
						imgground.onload=function(){
							ctx.drawImage(imgground,(50*control.a),positions.firstFloor);//desenha a imagem do terreno
							//Testa se há cactos
							//se tiver cacto - desenha cacto
							if(arrayCacto[control.a]!=' '){
								ctx.drawImage(imgCacto,(50*control.a),positions.cactoPosition);//desenha cacto no respectivo floor
							}
							//se não tiver cacto e tecla==0(não pulando) - desenha dino tmb
							else{
								if(control.tecla==0){
									ctx.drawImage(imggpasso,0,positions.TRex);//desenha não estiver pulando desenha o dino no floor tmb
								}
								else{}
							}
							control.a++;//Incrementa o controle
						}
						//Fonte das imagens
						imgground.src=arrayScenary[control.a];
						imggpasso.src=control.savePasso;
						imgCacto.src='Img/Terrain/Cacto1.png';
					}
					break;
				}
			}
			//Controle da pontuação
			control.score++;//Incrementa a pontuação
		},(control.velocidade)-55)//Atribui a velocidade do cenário
	}
}
// --------------------------------------------------------------------
//---------------------------Terreno(fim)-----------------------------
//---------------------------------------------------------------------



// --------------------------------------------------------------------
//-------------------------Mecânica do game----------------------------
// --------------------------------------------------------------------
//Inicia todo o jogo
//Botao - inicia o cenário limpo
botao.onclick= function(){//window.onload= function()
	botao.disabled=true;//Desativa o botão play
	//naoPisca();
	//Desenhar os itens na tela
	var terrain = new Terrain();
	terrain.drawTerrain();//Desenha o solo
	var dino = new Dino();
	dino.desenha();//Desenha o Dino
	document.getElementById('botao').blur();//Tira o foco do botão após click
	//Dino anda
	//velocidade
    control.timeVelocity = setInterval(function(){
        control.velocidade -=1;
    },3400);//Tempo para execução da função(03Seg)

	dino.walk();//O dino anda
}


//Tecla - Teste da tecla pressionada
corpo.onkeypress = function(){
	//Stop walking
	clearTimeout(control.walk);
	var testeTecla= this.onkeypress.arguments[0].charCode;
		var dino=new Dino();
		//Teste tecla precionada e se não está na sequencia do pulo
		if ((testeTecla == 119)&&(control.tecla==0))
		{
			control.tecla =1;//Controle de pulo
			var i=0//variável de controle do pulo
			control.timeJump = setInterval(dino.pulo,95);//Tempo para execusão do pulo(108ms)
				i++;//incrementa a variável
				if(i>10){i=0;control.savedPosition =0;}////Passa a posição do dino salva pra zero
		}
		else{}//Faz nada
		
}
// --------------------------------------------------------------------
// -----------------------Fim mecânica do game-------------------------
// --------------------------------------------------------------------



//Verificação da pontuação
function pontuacao(){
	var imagem = new Image();

	imagem.onload=function(){
		ctx.drawImage(imagem,150,80);
	}
	imagem.src="Img/GameOver.png";
	var pontos = readCookie("Score");
	//alert(Math.floor((control.score)/4));
	var nome=0;
	var valor=0;
	var concat=0;
	var valores = pontos.split('%');
	for (var i=0;i<valores.length;i++) {
		vect.push(valores[i]);
		if((i%2!=0)){
			if(valores[i]>valor){valor=valores[i];}
		}
		else{}
	}
	for (var i=0;i<valores.length;i++) {
		if(i%2!=0){
			if ((Math.floor((control.score)/4)>valor)){
				valor=valores[i];
				var entrada = prompt("Novo record!! Entre com seu nome");
				concat = entrada+'%'+(Math.floor((control.score)/4));
				writeCookie("Score",concat,1);
				//Novo score
				concat=entrada+" "+(Math.floor((control.score)/4)+" Pontos");
				var a =document.getElementById('Lista');
				var listagem = document.createElement("LI");
				var textnode = document.createTextNode(concat); 
				a.appendChild(listagem);
				listagem.appendChild(textnode); 
			}
			else{}
			botao.value="Tentar Novamente";
			botao.removeAttribute("disabled"); 
			botao.onclick=function(){
				document.location.reload(true);
			}
		}
		else{
			if ((Math.floor((control.score)/4)>valor)){
				nome=valores[i];
			}
			else{}
		}
	}
	
}

//Testa o vetor primeiro nome e pontos, depois se maior põe na primeira posição (algo similar ao push)