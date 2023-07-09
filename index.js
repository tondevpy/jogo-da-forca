let iniciar = document.getElementById('iniciar');
let palavrasObjetos = ['cadeira', 'mesa', 'sofa', 'lampada', 'geladeira', 'televisao', 'carro'];
let letraEscolhida;
let palavra = palavrasObjetos[Math.floor(Math.random() * palavrasObjetos.length)];
let tamanhoLetras = palavra.length;
let tentativas = 0;
let letrasCorretas = [];
let letrasIncorretas = [];
const maxTentativas = 6;

let forca = document.getElementById('forca');

iniciar.addEventListener('click', function (ev) {
    alert('Jogo iniciado, boa sorte!');
    let word = document.querySelector('.word');
    let forca = document.getElementById('forca');
    forca.src = './img/01.png';

    document.getElementById('dica').innerText = 'Objetos';
    let visible = document.getElementById('container2');
    visible.style.display = 'block';
    word.innerText += '';

    for (let i = 0; i < tamanhoLetras; i++) {
        word.innerText += ' _';
    }
});

function identifyButton(button) {
    let escolhidas = document.getElementById('escolhidas')
    escolhidas.innerText += button
    console.log("Botão clicado: " + button.toLowerCase());
    if (letrasCorretas.includes(button.toLowerCase()) || letrasIncorretas.includes(button.toLowerCase())) {
        console.log("Você já escolheu essa letra antes.");
        return;
    }

    if (palavra.includes(button.toLowerCase())) {
        console.log("A letra '" + button.toLowerCase() + "' existe na palavra.");
        letrasCorretas.push(button.toLowerCase());
        updateWord();

        if (hasWon()) {
            endGame(true);
        }
    } else {
        console.log("A letra '" + button.toLowerCase() + "' não existe na palavra.");
        letrasIncorretas.push(button.toLowerCase());
        updateForca();

        if (hasLost()) {
            endGame(false);
        }
    }
}


function updateWord() {
    let word = document.querySelector('.word');
    word.innerText = '';

    for (let i = 0; i < tamanhoLetras; i++) {
        if (letrasCorretas.includes(palavra[i])) {
            word.innerText += ' ' + palavra[i];
        } else {
            word.innerText += ' _';
        }
    }
}

function updateForca() {
    let imgIndex = letrasIncorretas.length;
    let imgSrc = '';

    if (imgIndex >= 0 && imgIndex < 7) {
        imgSrc = './img/0' + (imgIndex + 2) + '.png';
    } else if (imgIndex === 7) {
        imgSrc = './img/completo.png';
        endGame(false); // Encerra o jogo imediatamente
        return; // Retorna para evitar a atualização da imagem
    } else {
        console.log("Número de tentativas inválido.");
        return;
    }

    forca.src = imgSrc;
}






function hasWon() {
    for (let i = 0; i < tamanhoLetras; i++) {
        if (!letrasCorretas.includes(palavra[i])) {
            return false;
        }
    }
    return true;
}

function hasLost() {
    return letrasIncorretas.length >= maxTentativas;
}

function endGame(hasWon) {
    let mensagem = hasWon ? 'Parabéns, você ganhou! A palavra era: ' + palavra : 'Você perdeu! A palavra era: ' + palavra;
    alert(mensagem);
    location.reload();
    letrasCorretas = [];
    letrasIncorretas = [];
    tentativas = 0;
    updateWord();
    updateForca();
}
