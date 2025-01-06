// Obtener la lista de jugadores desde localStorage
const jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];
let turnoActual = 0;
let retosDisponibles = [...retos]; // Retos por defecto
const retosPersonalizados = JSON.parse(localStorage.getItem('retosPersonalizados')) || [];
const deshabilitarRetosPorDefecto = JSON.parse(localStorage.getItem('deshabilitarRetosPorDefecto')) || false;
let castigosDisponibles = JSON.parse(localStorage.getItem('castigos')) || [];
let intervaloLatido;
let velocidadLatido = 1; // Velocidad inicial del latido
let tiempoRestante;
let temporizadorActivo = false;

// Combinar retos personalizados con los retos por defecto (si no están deshabilitados)
if (retosPersonalizados.length > 0) {
    if (deshabilitarRetosPorDefecto) {
        retosDisponibles = [...retosPersonalizados]; // Solo usar retos personalizados
    } else {
        retosDisponibles = [...retos, ...retosPersonalizados]; // Combinar retos por defecto y personalizados
    }
}

// Función para mostrar una frase al azar invitando al primer jugador
function mostrarFraseInicial() {
    if (jugadores.length === 0) return; // Si no hay jugadores, no hacer nada

    // Obtener una frase al azar del archivo frases.js
    const frase = frases[Math.floor(Math.random() * frases.length)].replace(
        "(nombre_de_jugador)",
        `<strong style="color: red; font-weight: bold;">${jugadores[turnoActual]}</strong>`
    );

    // Mostrar la frase en la carta
    document.getElementById("mensajeCarta").innerHTML = frase;
    document.getElementById("carta").style.display = "flex";
    document.getElementById("retoCarta").style.display = "none";
}

// Función para iniciar el temporizador
function iniciarTemporizador() {
    if (temporizadorActivo) return; // Evitar múltiples temporizadores

    const tiempoTemporizador = parseInt(localStorage.getItem('tiempoTemporizador')) || 10; // Valor por defecto de 10 segundos
    tiempoRestante = tiempoTemporizador;
    temporizadorActivo = true;

    const cuentaRegresiva = document.getElementById('cuenta-regresiva');
    const corazon = document.getElementById('corazon').querySelector('img');
    const audioLatido = document.getElementById('latido-audio');
    const audioAlarma = document.getElementById('alarma-audio');

    // Mostrar el tiempo seleccionado al iniciar
    cuentaRegresiva.textContent = `00:${tiempoTemporizador.toString().padStart(2, '0')}`;

    // Iniciar la animación del corazón
    corazon.style.animation = 'latir 1s infinite';
    corazon.style.animationPlayState = 'running';

    // Iniciar el sonido del latido en loop
    audioLatido.play();

    // Iniciar el temporizador
    intervaloLatido = setInterval(() => {
        tiempoRestante--;
        cuentaRegresiva.textContent = `00:${tiempoRestante.toString().padStart(2, '0')}`;

        // Aumentar la velocidad del latido cada 2 segundos
        if (tiempoRestante % 2 === 0) {
            velocidadLatido += 0.2;
            corazon.style.animationDuration = `${1 / velocidadLatido}s`;
            audioLatido.playbackRate = velocidadLatido;
        }

        // Detener el temporizador cuando llegue a 0
        if (tiempoRestante <= 0) {
            detenerTemporizador();
            // Reproducir el sonido de alarma
            audioAlarma.play();
        }
    }, 1000);
}

// Función para detener el temporizador
function detenerTemporizador() {
    clearInterval(intervaloLatido);
    temporizadorActivo = false;

    const corazon = document.getElementById('corazon').querySelector('img');
    const audioLatido = document.getElementById('latido-audio');

    // Detener la animación del corazón
    corazon.style.animationPlayState = 'paused';

    // Detener el sonido del latido
    audioLatido.pause();
}

// Función para reiniciar el temporizador
function reiniciarTemporizador() {
    detenerTemporizador();
    velocidadLatido = 1; // Reiniciar la velocidad del latido
    const tiempoTemporizador = parseInt(localStorage.getItem('tiempoTemporizador')) || 10;
    document.getElementById('cuenta-regresiva').textContent = `00:${tiempoTemporizador.toString().padStart(2, '0')}`;
}

// Función para voltear la carta y mostrar el reto
function voltearCarta() {
    if (retosDisponibles.length === 0) {
        if (deshabilitarRetosPorDefecto) {
            retosDisponibles = [...retosPersonalizados]; // Solo usar retos personalizados
        } else {
            retosDisponibles = [...retos, ...retosPersonalizados]; // Combinar retos por defecto y personalizados
        }
    }

    const reto = retosDisponibles.splice(Math.floor(Math.random() * retosDisponibles.length), 1)[0];

    // Obtener jugadores al azar para los marcadores
    const jugadorActual = jugadores[turnoActual];
    const jugadoresDisponibles = jugadores.filter((_, index) => index !== turnoActual);
    const nombreJugador = jugadoresDisponibles[Math.floor(Math.random() * jugadoresDisponibles.length)];
    const otroJugador = jugadoresDisponibles.filter(jugador => jugador !== nombreJugador)[Math.floor(Math.random() * (jugadoresDisponibles.length - 1))];

    // Reemplazar los marcadores en el reto
    const retoModified = reto
        .replace(/\(nombre_de_jugador\)/g, `<strong style="color: red; font-weight: bold;">${nombreJugador}</strong>`)
        .replace(/\(otro_jugador\)/g, `<strong style="color: red; font-weight: bold;">${otroJugador}</strong>`);

    const randomLetter = getRandomLetter();
    const retoFinal = retoModified.replace(/\(letra_al_azar\)/g, `<strong style="color: red; font-weight: bold;">${randomLetter}</strong>`);

    const castigo = castigosDisponibles.length > 0 ? castigosDisponibles[Math.floor(Math.random() * castigosDisponibles.length)] : "Beber 1 trago";

    document.getElementById("jugadorActual").innerHTML = `<strong>Jugador:</strong> ${jugadorActual}`;
    document.getElementById("reto").innerHTML = `<strong>Reto:</strong> ${retoFinal}`;
    document.getElementById("castigo").innerHTML = `<strong>Castigo:</strong> <span style="color: #900C3F;">${castigo}</span>`; // Cambiar el color del castigo

    document.getElementById("carta").style.display = "none";
    document.getElementById("retoCarta").style.display = "block";

    // Reiniciar el temporizador al voltear la carta
    reiniciarTemporizador();
}

// Función para pasar al siguiente jugador
function siguienteJugador() {
    detenerTemporizador(); // Detener el temporizador al cambiar de jugador
    turnoActual = (turnoActual + 1) % jugadores.length;
    mostrarFraseInicial(); // Mostrar una nueva frase para el siguiente jugador
}

// Función para obtener una letra aleatoria
function getRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

// Función para reiniciar el juego y volver al inicio
function reiniciarJuego() {
    localStorage.clear(); // Limpiar el localStorage
    window.location.href = 'index.html'; // Redirigir a la página de inicio
}

// Función para mostrar el popup de confirmación de cierre
function mostrarPopupConfirmacion() {
    const popupConfirmacion = document.createElement('div');
    popupConfirmacion.id = 'popup-confirmacion';
    popupConfirmacion.style.position = 'fixed';
    popupConfirmacion.style.top = '0';
    popupConfirmacion.style.left = '0';
    popupConfirmacion.style.width = '100%';
    popupConfirmacion.style.height = '100%';
    popupConfirmacion.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    popupConfirmacion.style.display = 'flex';
    popupConfirmacion.style.justifyContent = 'center';
    popupConfirmacion.style.alignItems = 'center';
    popupConfirmacion.style.zIndex = '1000';

    const popupContent = document.createElement('div');
    popupContent.style.backgroundColor = 'white';
    popupContent.style.padding = '20px';
    popupContent.style.borderRadius = '10px';
    popupContent.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    popupContent.style.width = '90%';
    popupContent.style.maxWidth = '400px';
    popupContent.style.position = 'relative';

    const titulo = document.createElement('h2');
    titulo.textContent = '¿Estás seguro de cerrar el juego?';
    titulo.style.color = '#C70039';
    titulo.style.fontFamily = 'Fredoka, sans-serif';
    titulo.style.fontWeight = '600';
    titulo.style.textAlign = 'center';
    titulo.style.marginBottom = '20px';

    const botonSi = document.createElement('button');
    botonSi.textContent = 'Sí';
    botonSi.style.marginTop = '15px';
    botonSi.style.padding = '10px 20px';
    botonSi.style.border = 'none';
    botonSi.style.borderRadius = '5px';
    botonSi.style.backgroundColor = '#C70039';
    botonSi.style.color = 'white';
    botonSi.style.cursor = 'pointer';
    botonSi.style.fontFamily = 'Fredoka, sans-serif';
    botonSi.style.fontWeight = '400';
    botonSi.style.transition = 'background-color 0.3s ease';
    botonSi.style.width = 'calc(50% - 10px)';
    botonSi.style.marginRight = '5px';

    botonSi.onclick = function () {
        reiniciarJuego();
    };

    const botonNo = document.createElement('button');
    botonNo.textContent = 'No';
    botonNo.style.marginTop = '15px';
    botonNo.style.padding = '10px 20px';
    botonNo.style.border = 'none';
    botonNo.style.borderRadius = '5px';
    botonNo.style.backgroundColor = '#00be29';
    botonNo.style.color = 'white';
    botonNo.style.cursor = 'pointer';
    botonNo.style.fontFamily = 'Fredoka, sans-serif';
    botonNo.style.fontWeight = '400';
    botonNo.style.transition = 'background-color 0.3s ease';
    botonNo.style.width = 'calc(50% - 10px)';
    botonNo.style.marginLeft = '5px';

    botonNo.onclick = function () {
        popupConfirmacion.remove();
    };

    popupContent.appendChild(titulo);
    popupContent.appendChild(botonSi);
    popupContent.appendChild(botonNo);
    popupConfirmacion.appendChild(popupContent);

    document.body.appendChild(popupConfirmacion);
}

// Mostrar la frase inicial al cargar la página
mostrarFraseInicial();

// Asignar funciones a los botones de control del temporizador
document.getElementById('iniciar-temporizador').addEventListener('click', iniciarTemporizador);
document.getElementById('reiniciar-temporizador').addEventListener('click', reiniciarTemporizador);

// Asignar función al botón de cierre (X)
document.getElementById('close-juego').addEventListener('click', mostrarPopupConfirmacion);

// Asignar función al botón "Administrar Jugadores"
document.getElementById('administrar-jugadores-button').addEventListener('click', function () {
    document.getElementById('popup-administrar-jugadores').style.display = 'flex';
});

// Asignar función al botón de cierre del popup de administrar jugadores
document.getElementById('close-popup-administrar-jugadores').addEventListener('click', function () {
    document.getElementById('popup-administrar-jugadores').style.display = 'none';
});