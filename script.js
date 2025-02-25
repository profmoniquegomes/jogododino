const dino = document.getElementById("dino");
const obstaculo = document.getElementById("obstaculo");
let isJumping = false;
let speed = 10; 
const acceleration = 10;
const interval = 30; 
const gameAreaWidth = document.getElementById("gameArea").offsetWidth; 

// Função para o pulo do dinossauro
function jump() {
    if (isJumping) return; // Impede pulos consecutivos

    isJumping = true;
    dino.style.animation = "jump 0.5s ease-out";
    
    // Remove a animação após o pulo
    setTimeout(() => {
        dino.style.animation = "";
        isJumping = false;
    }, 500);
}

// Detecta tecla de espaço para o pulo
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
});

// Função para detectar colisão
function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const obstaculoRect = obstaculo.getBoundingClientRect();

    if (
        dinoRect.right > obstaculoRect.left &&
        dinoRect.left < obstaculoRect.right &&
        dinoRect.bottom > obstaculoRect.top &&
        dinoRect.top < obstaculoRect.bottom
    ) {
        alert("Você perdeu!");
        clearInterval(gameInterval);
        clearInterval(speedInterval); // Para a atualização da velocidade
    }
}

// Função para movimentar o obstáculo
function moveObstaculo() {
    let obstaculoPos = obstaculo.offsetLeft;

    obstaculo.style.left = obstaculoPos - speed + "px"; // Move o obstáculo da direita para a esquerda

    // Reposiciona o obstáculo para o lado direito da tela quando ele sai
    if (obstaculoPos <= -20) { // Considera o tamanho do obstáculo para reposicionamento
        obstaculo.style.left = gameAreaWidth + "px"; // Coloca o obstáculo na borda direita novamente
    }

    checkCollision();
}

// Função para aumentar a velocidade do obstáculo
function increaseSpeed() {
    speed += acceleration;
}

// Inicia o loop do jogo
const gameInterval = setInterval(moveObstaculo, interval);

// Aumenta a velocidade a cada 30 segundos
const speedInterval = setInterval(increaseSpeed, 30000);
