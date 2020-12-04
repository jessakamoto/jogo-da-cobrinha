let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //renderiza o desenho que vai acontecer no canvas
let box = 32; //tamanho do box do jogo
let snake = []; //criação do array da cobrinha
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right"; // definição da movimentação da cobrinha
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box
}

//função que começa o canvas

function criarBG(){
    context.fillStyle="lightgreen"; //definição de cor do canvas inicial
    context.fillRect(0, 0, 16 * box, 16 * box); // desenha o retangulo onde vai acontecer o jogo e trabalha com 4 parâmetros (x,y, altura e largura)
    drawFood();
}

//criação da cobrinha, vai ser um array de coordenadas 

function criarCobrinha(){
    for(i=0; i<snake.length; i++){
        context.fillStyle="darkgreen";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//criar comida para a cobrinha 

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box)
}

//precisamos que a cobrinha ande nas direções que queremos, o jogo precisa captar os nossos toques e transmitir o comando
//para isso, criamos um evento de escuta 

document.addEventListener("keydown", update); //evento de clique do teclado fará ser acionada a função update

function update(event){
    if(Event.keyCode == 37 && direction != "right") direction ="left";
    if(Event.keyCode == 38 && direction != "down") direction ="up";
    if(Event.keyCode == 39 && direction != "left") direction = "right";
    if(Event.keyCode == 40 && direction != "up") direction="down";
}

//criação de função que atualiza automaticamente o movimento do jogo

function iniciarJogo(){
    criarBG();
    criarCobrinha();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //condicionais para os lados que a cobrinha vai se movimentar, para adicionar quadrado na posição correta

    if(direction == "right") snakeX += box; //se direção for igual a direita, acrescenta um quadrado a mais
    if(direction == "left") snakeX -= box; //para esquerda, ele diminui pois é um plano caretesiano
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY !=food.y){
        snake.pop();  //função pop que retira o ultimo elemento do array da cobrinha
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }   

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100); //renovar a cada 100 milisegundos sem travar. Função de tempo 
