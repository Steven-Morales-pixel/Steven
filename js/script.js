let mesActual = "";

function entrar() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    contarDias();
    generarCorazones(); // ❤️
}

function abrirMes(nombreMes) {
    mesActual = nombreMes;
    document.getElementById("detalleMes").style.display = "block";
    document.getElementById("tituloMes").innerText = `Detalle de ${nombreMes}`;
    lanzarConfeti(); // 🎉
    // iniciarJuego(); // 🧠
    // cargarDiario(); // 📖
    crearPuzzle(); // 🧩
    // restaurarProgreso();
}

function mostrarCarta() {
    if (!mesActual) {
        alert("Click 💌");
        return;
    }

    const carta = `Querida mamá 💖

    Hoy quiero agradecerte por todo lo que haces por mí.
    Gracias por tu amor, tu paciencia y por siempre estar a mi lado.

    Eres una mujer increíble y me siento muy afortunado de tenerte como mamá. 😘

    Espero que este día esté lleno de alegría, abrazos y muchos momentos felices.

    Te amo muchísimo
    🎂💕`;

    const elemento = document.getElementById("textoCarta");

    localStorage.setItem(`cartaAbierta${mesActual}`, "true");

    elemento.classList.remove("oculto");
    typeEffect(elemento, carta);
}




function typeEffect(elemento, texto, i = 0) {
    if (i < texto.length) {
        const char = texto[i];

        if (char === "\n") {
            elemento.innerHTML += "<br>";
        } else {
            elemento.innerHTML += char;
        }

        setTimeout(() => typeEffect(elemento, texto, i + 1), 40);
    }
}


function contarDias() {
    const inicio = new Date("2007-04-11"); // Cambia a su fecha de inicio
    const hoy = new Date();
    const dias = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));
    document.getElementById("contadorDias").innerText =
        `Gracias por ${dias} días de amor y enseñanzas 💖`;
}

// function verSorpresa() {
//     const clave = document.getElementById("claveInput").value;
//     if (clave.toLowerCase() === "piciosa") {
//         document.getElementById("contenidoSecreto").classList.remove("oculto");
//         localStorage.setItem("sorpresaJulio", "true"); // ✅ guardar desbloqueo
//     } else {
//         alert("Clave incorrecta, prueba con algo que siempre digo 😘");
//     }
// }

function lanzarConfeti() {
    for (let i = 0; i < 150; i++) {
        const confeti = document.createElement('div');
        confeti.classList.add('confeti');
        confeti.style.left = Math.random() * 100 + 'vw';
        confeti.style.animationDuration = 2 + Math.random() * 3 + 's';
        confeti.style.backgroundColor = coloresConfeti[Math.floor(Math.random() * coloresConfeti.length)];
        document.body.appendChild(confeti);

        setTimeout(() => {
            confeti.remove();
        }, 5000);
    }
}

const coloresConfeti = ['#ff69b4', '#ffb6c1', '#fff', '#ffc0cb', '#ff1493'];

function generarCorazones() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("corazon-flotante");
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = 4 + Math.random() * 3 + "s";
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 500);
}

const preguntas = [
    {
        pregunta: "¿Mi primer pensamiento en el día eres tú?",
        opciones: ["Sí", "No"],
        correcta: 0,
    },
    {
        pregunta: "¿Prefiero abrazos largos que mensajes de texto?",
        opciones: ["Sí", "No"],
        correcta: 0,
    },
    {
        pregunta: "¿Quién se tarda más en arreglarse, tú o yo?",
        opciones: ["Yo", "Tú"],
        correcta: 1,
    },
    {
        pregunta: "¿Me gusta más verte sonreír que ganar en un videojuego?",
        opciones: ["Sí", "No"],
        correcta: 0,
    },
    {
        pregunta: "¿La primera vez que te vi, me enamoré al instante?",
        opciones: ["Sí", "No"],
        correcta: 0,
    },
    {
        pregunta: "¿Prefiero pizza antes que pasta?",
        opciones: ["Pizza", "Pasta"],
        correcta: 1,
    },
    {
        pregunta: "¿Si pudiera viajar, iría contigo antes que con mis amigos?",
        opciones: ["Sí", "No"],
        correcta: 0,
    },
    {
        pregunta: "¿Qué prefiero, un beso tuyo o una hamburguesa?",
        opciones: ["Un beso tuyo", "Una hamburguesa"],
        correcta: 0,
    },
    {
        pregunta: "¿El lugar donde más feliz soy es contigo?",
        opciones: ["Sí", "No"],
        correcta: 0,
    }
];


let preguntaActual = 0;
let puntaje = 0;

function iniciarJuego() {
    preguntaActual = 0;
    puntaje = 0;
    mostrarPregunta();
}

function mostrarPregunta() {
    if (preguntaActual >= preguntas.length) {
        document.getElementById("preguntaJuego").innerHTML = "";
        document.getElementById("opcionesJuego").innerHTML = "";
        document.getElementById("resultadoJuego").classList.remove("oculto");
        document.getElementById("resultadoJuego").innerText =
            `¡Puntaje final: ${puntaje} / ${preguntas.length} ❤️!`;

        localStorage.setItem("puntajeJulio", puntaje);

        return;
    }

    const p = preguntas[preguntaActual];
    document.getElementById("preguntaJuego").innerText = p.pregunta;

    const opcionesDiv = document.getElementById("opcionesJuego");
    opcionesDiv.innerHTML = "";

    p.opciones.forEach((opcion, index) => {
        const btn = document.createElement("button");
        btn.innerText = opcion;
        btn.onclick = () => verificarRespuesta(index);
        opcionesDiv.appendChild(btn);
    });
}

function verificarRespuesta(indice) {
    if (indice === preguntas[preguntaActual].correcta) {
        puntaje++;
    }
    preguntaActual++;
    mostrarPregunta();
}


function guardarDiario() {
    const texto = document.getElementById("diarioTexto").value;
    localStorage.setItem("diarioMesJulio", texto);
    const mensaje = document.getElementById("mensajeGuardado");
    mensaje.classList.remove("oculto");
    setTimeout(() => mensaje.classList.add("oculto"), 2000);
}

function cargarDiario() {
    const textoGuardado = localStorage.getItem(`diarioMes${mesActual}`);
    if (textoGuardado) {
        document.getElementById("diarioTexto").value = textoGuardado;
    }
}

const yaAbrioCarta = localStorage.getItem(`cartaAbierta${mesActual}`) === "true";
if (yaAbrioCarta) {
    // Lógica de mostrar carta
}

const sorpresaDesbloqueada = localStorage.getItem(`sorpresa${mesActual}`) === "true";
if (sorpresaDesbloqueada) {
    document.getElementById("contenidoSecreto").classList.remove("oculto");
}


const filas = 3;
const columnas = 3;
const totalPiezas = filas * columnas;

function crearPuzzle() {
    const contenedor = document.getElementById("puzzleContainer");
    contenedor.innerHTML = ""; // limpiar si ya existía

    const filas = 3;
    const columnas = 3;
    const totalPiezas = filas * columnas;

    const piezas = [];

    for (let i = 0; i < totalPiezas; i++) {
        const fila = Math.floor(i / columnas);
        const columna = i % columnas;

        const pieza = document.createElement("div");
        pieza.classList.add("pieza");
        pieza.setAttribute("draggable", true);
        pieza.style.backgroundImage = "url('recursos/imagenes/puz.jpeg')";
        pieza.style.backgroundSize = `${columnas * 100}% ${filas * 100}%`;
        pieza.style.backgroundPosition = `${(columna * 100) / (columnas - 1)}% ${(fila * 100) / (filas - 1)}%`;

        pieza.dataset.index = i;

        piezas.push(pieza);
    }

    // Mezclar piezas
    piezas.sort(() => Math.random() - 0.5);

    // Agregar listeners y añadir al contenedor
    piezas.forEach((pieza) => {
        pieza.addEventListener("dragstart", arrastrarInicio);
        pieza.addEventListener("dragover", permitirSoltar);
        pieza.addEventListener("drop", soltarPieza);
        contenedor.appendChild(pieza);
    });

    console.log("✅ Puzzle creado con rec2.jpeg");
}


function arrastrarInicio(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.index);
}

function permitirSoltar(e) {
    e.preventDefault();
}

function soltarPieza(e) {
    e.preventDefault();
    const contenedor = document.getElementById("puzzleContainer");
    const fromIndex = e.dataTransfer.getData("text/plain");
    const toIndex = e.target.dataset.index;

    if (fromIndex === toIndex) return;

    const piezas = Array.from(contenedor.children);
    const piezaA = piezas.find(p => p.dataset.index === fromIndex);
    const piezaB = piezas.find(p => p.dataset.index === toIndex);

    if (!piezaA || !piezaB) return;

    // Intercambiar visualmente
    const cloneA = piezaA.cloneNode(true);
    const cloneB = piezaB.cloneNode(true);

    contenedor.replaceChild(cloneA, piezaB);
    contenedor.replaceChild(cloneB, piezaA);

    // Reasignar listeners
    [cloneA, cloneB].forEach(pieza => {
        pieza.addEventListener("dragstart", arrastrarInicio);
        pieza.addEventListener("dragover", permitirSoltar);
        pieza.addEventListener("drop", soltarPieza);
    });

    verificarPuzzle();
}

function verificarPuzzle() {
    const piezas = Array.from(document.getElementById("puzzleContainer").children);
    const correcto = piezas.every((pieza, index) => pieza.dataset.index == index);
    if (correcto) {
        document.getElementById("puzzleMensaje").classList.remove("oculto");
    }
}
