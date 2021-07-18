const dino =  document.querySelector('.dino'); // Pega o dinossauro;
const background = document.querySelector('.background');
let isJumping = false; // Verifica se ele está pulando para evitar bugs;
let position = 0; // Posição do mano dino!
let pontos = 0; // Criação da pontuação;

function mostraPontos() { // Mostra a pontuação atual ou final;
    console.log(pontos);
}

function handleKeyUp(event) {
    if (event.keyCode === 32) { // Pega o código da tecla espaço para ver se ela foi pressionada;
        if (!isJumping) {
            jump();
        }
    }
};

function jump() { // Função do pulo do dinossauro;
    
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150) { // Limitando altura do pulo;
            clearInterval(upInterval);

            // Descendo;
            let downInterval = setInterval(() => {
                if(position <= 0) {
                    clearInterval(downInterval); // Limita a descida;
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px'; 
                }
            }, 20);
        } else {
            // Subindo;
            position += 20;

            dino.style.bottom = position + 'px'; 
        }    
    }, 20); // Código executado a cada 20 milisegundos;
};

function createCactus() { // Criação dos Cactus do jogo;
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000; // Geração aleatória de cactos;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInteval = setInterval(() => {

        if (cactusPosition < -60) { // Impede que o cacto permaneça no jogo após sair da tela, isso evita processamento desnecessário;
            clearInterval(leftInteval);
            background.removeChild(cactus); 
            pontos += 10;
            mostraPontos();
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { // Quando ele se encontra na mesma posição do dinossauro;
            // Game over;
            clearInterval(leftInteval);
            document.body.innerHTML = '<h1 class = "game-over">GAME OVER MEU CHAPA! <img src = "PERDEMO.png"></h1>'; // Mensagem de game-over e imagem representativa!
            alert(`GAME OVER MEU CHAPA!!\nPontuação final: ${pontos}\nRecarregue a página para que possa jogar novamente!`); // Alerta da quantidade de pontos feitos e dica!
            mostraPontos();
        } else {
            cactusPosition -= 10; // Define a velocidade conforme ele se aproxima do dinossauro;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
};

createCactus();
document.addEventListener('keyup', handleKeyUp); // Pega o evento da subida de uma tecla após ser pressionada;