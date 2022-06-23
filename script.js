const letrasUsadasElement = document.getElementById('letrasUsadas');
const botonIniciar = document.getElementById('botonIniciar');
const contenido = document.getElementById('contenido');

let canvas = document.getElementById('pintar');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;

const cuerpo = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let palabra;
let errores;
let correctos;
let letraActual;

const letra = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    letrasUsadasElement.appendChild(letterElement);
}

const parteCuerpo = cuerpo => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...cuerpo);
};

const letraEquivocada = () => {
    parteCuerpo(cuerpo[errores]);
    errores++;
    if(errores === cuerpo.length) Perdio();
}

const Perdio = () => {
    document.removeEventListener('keydown', letterEvent);
    document.write('Lo siento, has perdido');
    botonIniciar.style.display = 'block';
}


const Gano = () => {
    document.removeEventListener('keydown', letterEvent);
    document.write('Bien echo, has ganado');
    botonIniciar.style.display = 'block';
}

const letraCorrecta = letter => {
    const { children } =  contenido;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            correctos++;
        }
    }
    if(correctos === palabra.length) Gano();
}

const letterInput = letter => {
    if(palabra.includes(letter)) {
        letraCorrecta(letter);
    } else {
        letraEquivocada();
    }
    letra(letter);
    letraActual.push(letter);
};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !letraActual.includes(newLetter)) {
        letterInput(newLetter);
    };
};

const escribir = () => {
    palabra.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        contenido.appendChild(letterElement);
    });
};

const palabraAleatoria = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    palabra = word.split('');
};

const poste = () => {
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d95d39';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 7);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);

};

const Comenzar = () => {
    letraActual = [];
    errores = 0;
    correctos = 0;
    contenido.innerHTML = '';
    letrasUsadasElement.innerHTML = '';
    botonIniciar.style.display = 'none';
    poste();
    palabraAleatoria();
    escribir();
    document.addEventListener('keydown', letterEvent);
};

botonIniciar.addEventListener('click', Comenzar);