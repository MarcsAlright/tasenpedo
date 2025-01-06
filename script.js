// Función para capitalizar la primera letra de un nombre
function capitalizarNombre(nombre) {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
}

// Función para agregar jugadores desde un texto largo separado por comas
function agregarJugadoresDesdeTexto(texto) {
    const nombres = texto.split(',').map(nombre => nombre.trim()).filter(nombre => nombre !== '');
    nombres.forEach(nombre => {
        const nombreCapitalizado = capitalizarNombre(nombre);
        const listaJugadores = document.getElementById('lista-jugadores');

        if (listaJugadores.style.display === 'none') {
            listaJugadores.style.display = 'block';
        }

        const jugadorItem = document.createElement('div');
        jugadorItem.classList.add('jugador-item');

        const nuevoJugador = document.createElement('p');
        nuevoJugador.textContent = nombreCapitalizado;

        const cancelarButton = document.createElement('button');
        cancelarButton.textContent = 'Eliminar';
        cancelarButton.classList.add('cancelar-button');
        cancelarButton.onclick = function () {
            jugadorItem.style.opacity = '0';
            jugadorItem.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                listaJugadores.removeChild(jugadorItem);
                verificarListaJugadores();
                verificarBotones();
            }, 500);
        };

        jugadorItem.appendChild(nuevoJugador);
        jugadorItem.appendChild(cancelarButton);
        listaJugadores.appendChild(jugadorItem);

        setTimeout(() => {
            jugadorItem.classList.add('visible');
        }, 10);
    });

    document.getElementById('username').value = '';
    document.getElementById('username').focus();
    verificarBotones();
}

// Función para agregar un jugador a la lista
function agregarJugador() {
    const nombreJugador = document.getElementById('username').value.trim();
    if (nombreJugador === '') {
        alert('Por favor, ingresa un nombre válido.');
        return;
    }

    if (nombreJugador.includes(',')) {
        agregarJugadoresDesdeTexto(nombreJugador);
        return;
    }

    const nombreCapitalizado = capitalizarNombre(nombreJugador);
    const listaJugadores = document.getElementById('lista-jugadores');

    if (listaJugadores.style.display === 'none') {
        listaJugadores.style.display = 'block';
    }

    const jugadorItem = document.createElement('div');
    jugadorItem.classList.add('jugador-item');

    const nuevoJugador = document.createElement('p');
    nuevoJugador.textContent = nombreCapitalizado;

    const cancelarButton = document.createElement('button');
        cancelarButton.textContent = 'Eliminar';
        cancelarButton.classList.add('cancelar-button');
        cancelarButton.onclick = function () {
            jugadorItem.style.opacity = '0';
            jugadorItem.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                listaJugadores.removeChild(jugadorItem);
                verificarListaJugadores();
                verificarBotones();
            }, 500);
        };

        jugadorItem.appendChild(nuevoJugador);
        jugadorItem.appendChild(cancelarButton);
        listaJugadores.appendChild(jugadorItem);

        setTimeout(() => {
            jugadorItem.classList.add('visible');
        }, 10);

        document.getElementById('username').value = '';
        document.getElementById('username').focus();
        verificarBotones();
    }

    function verificarBotones() {
        const listaJugadores = document.getElementById('lista-jugadores');
        const jugadores = listaJugadores.querySelectorAll('.jugador-item');
        const aJugarButton = document.getElementById('a-jugar-button');

        if (jugadores.length >= 2) {
            aJugarButton.style.display = 'block';
        } else {
            aJugarButton.style.display = 'none';
        }
    }

    function verificarListaJugadores() {
        const listaJugadores = document.getElementById('lista-jugadores');
        const jugadores = listaJugadores.querySelectorAll('.jugador-item');

        if (jugadores.length === 0) {
            listaJugadores.style.display = 'none';
        }
    }

    const comoJugarButton = document.getElementById('como-jugar-button');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('close-popup');

    comoJugarButton.addEventListener('click', function (event) {
        event.preventDefault();
        popup.style.display = 'flex';
    });

    closePopup.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    document.querySelector('.sumar-button').addEventListener('click', agregarJugador);

    document.getElementById('username').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            agregarJugador();
        }
    });

    function redirigirAJuego() {
        const jugadores = [];
        document.querySelectorAll('.jugador-item p').forEach(jugador => {
            jugadores.push(jugador.textContent);
        });

        localStorage.setItem('jugadores', JSON.stringify(jugadores));
        mostrarPopupCastigos();
    }

    function mostrarPopupCastigos() {
        const popupCastigos = document.createElement('div');
        popupCastigos.id = 'popup-castigos';
        popupCastigos.style.position = 'fixed';
        popupCastigos.style.top = '0';
        popupCastigos.style.left = '0';
        popupCastigos.style.width = '100%';
        popupCastigos.style.height = '100%';
        popupCastigos.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        popupCastigos.style.display = 'flex';
        popupCastigos.style.justifyContent = 'center';
        popupCastigos.style.alignItems = 'center';
        popupCastigos.style.zIndex = '1000';

        const popupContent = document.createElement('div');
        popupContent.style.backgroundColor = 'white';
        popupContent.style.padding = '20px';
        popupContent.style.borderRadius = '10px';
        popupContent.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        popupContent.style.width = '90%';
        popupContent.style.maxWidth = '400px';
        popupContent.style.position = 'relative';

        const closePopupCastigos = document.createElement('span');
        closePopupCastigos.textContent = '×';
        closePopupCastigos.style.position = 'absolute';
        closePopupCastigos.style.top = '10px';
        closePopupCastigos.style.right = '10px';
        closePopupCastigos.style.fontSize = '24px';
        closePopupCastigos.style.cursor = 'pointer';
        closePopupCastigos.style.color = '#C70039';
        closePopupCastigos.style.transition = 'color 0.3s ease';

        closePopupCastigos.addEventListener('mouseover', function () {
            closePopupCastigos.style.color = '#900C3F';
        });

        closePopupCastigos.addEventListener('mouseout', function () {
            closePopupCastigos.style.color = '#C70039';
        });

        closePopupCastigos.addEventListener('click', function () {
            popupCastigos.remove();
        });

        popupContent.appendChild(closePopupCastigos);

        const titulo = document.createElement('h2');
        titulo.textContent = '🎉 ¡Subí la apuesta! 🎉';
        titulo.style.color = '#C70039';
        titulo.style.fontFamily = 'Fredoka, sans-serif';
        titulo.style.fontWeight = '600';
        titulo.style.textAlign = 'center';
        titulo.style.marginBottom = '20px';

        // Sección de Castigos
        const castigosSection = document.createElement('div');
        castigosSection.style.marginBottom = '20px';

        const instruccionesCastigos = document.createElement('p');
        instruccionesCastigos.textContent = "Ingresa los castigos separados por coma. Puedes usar los que están por defecto o borrar y crear nuevos.";
        instruccionesCastigos.style.fontFamily = 'Fredoka, sans-serif';
        instruccionesCastigos.style.fontWeight = '400';
        instruccionesCastigos.style.color = 'black';
        instruccionesCastigos.style.margin = '0 20px 5px 20px';
        instruccionesCastigos.style.fontSize = '14px';

        const inputCastigos = document.createElement('input');
        inputCastigos.type = 'text';
        inputCastigos.placeholder = 'Ingresa los castigos separados por coma...';
        inputCastigos.value = '1 trago, 2 tragos, 3 tragos';
        inputCastigos.style.width = 'calc(100% - 40px)';
        inputCastigos.style.height = '40px';
        inputCastigos.style.margin = '0 20px 5px 20px';
        inputCastigos.style.padding = '5px 10px';
        inputCastigos.style.borderRadius = '5px';
        inputCastigos.style.border = '1px solid rgba(0, 0, 0, 0.3)';
        inputCastigos.style.fontFamily = 'Fredoka, sans-serif';
        inputCastigos.style.fontWeight = '400';

        castigosSection.appendChild(instruccionesCastigos);
        castigosSection.appendChild(inputCastigos);

        // Sección de Temporizador
        const temporizadorSection = document.createElement('div');
        temporizadorSection.style.marginBottom = '20px';

        const tiempoInstruccion = document.createElement('p');
        tiempoInstruccion.textContent = "Por favor, elige el tiempo para el temporizador:";
        tiempoInstruccion.style.fontFamily = 'Fredoka, sans-serif';
        tiempoInstruccion.style.fontWeight = '400';
        tiempoInstruccion.style.color = 'black';
        tiempoInstruccion.style.margin = '0 20px 5px 20px';
        tiempoInstruccion.style.fontSize = '14px';

        const tiempoContainer = document.createElement('div');
        tiempoContainer.style.margin = '0 20px 5px 20px';
        tiempoContainer.style.display = 'flex';
        tiempoContainer.style.flexDirection = 'column';
        tiempoContainer.style.gap = '10px';

        const tiempos = [10, 15, 30, 45, 60];
        tiempos.forEach(tiempo => {
            const radioContainer = document.createElement('div');
            radioContainer.style.display = 'flex';
            radioContainer.style.alignItems = 'center';

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'tiempoTemporizador';
            radioInput.value = tiempo;
            radioInput.id = `tiempo-${tiempo}`;
            radioInput.style.marginRight = '10px';

            if (tiempo === 30) {
                radioInput.checked = true;
            }

            const radioLabel = document.createElement('label');
            radioLabel.htmlFor = `tiempo-${tiempo}`;
            radioLabel.textContent = `${tiempo} segundos`;
            radioLabel.style.fontFamily = 'Fredoka, sans-serif';
            radioLabel.style.fontWeight = '400';
            radioLabel.style.color = 'black';
            radioLabel.style.fontSize = '14px';

            radioContainer.appendChild(radioInput);
            radioContainer.appendChild(radioLabel);
            tiempoContainer.appendChild(radioContainer);
        });

        temporizadorSection.appendChild(tiempoInstruccion);
        temporizadorSection.appendChild(tiempoContainer);

        // Sección de Retos
        const retosSection = document.createElement('div');
        retosSection.style.marginBottom = '20px';

        const retosInstruccion = document.createElement('p');
        retosInstruccion.textContent = "Puedes crear nuevos retos personalizados, combinarlos con los que vienen por defecto, o desactivar los retos por defecto. Separa los retos con '/'. Usa '(nombre_de_jugador)' y '(otro_jugador)' para referirte a jugadores al azar. Si no quieres agregar retos personalizados, puedes dejar este campo vacío.";
        retosInstruccion.style.fontFamily = 'Fredoka, sans-serif';
        retosInstruccion.style.fontWeight = '400';
        retosInstruccion.style.color = 'black';
        retosInstruccion.style.margin = '0 20px 5px 20px';
        retosInstruccion.style.fontSize = '14px';

        const inputRetos = document.createElement('textarea');
        inputRetos.placeholder = 'Ingresa los retos personalizados separados por "/"...';
        inputRetos.style.width = 'calc(100% - 40px)';
        inputRetos.style.height = '40px';
        inputRetos.style.margin = '0 20px 5px 20px';
        inputRetos.style.padding = '5px 10px';
        inputRetos.style.borderRadius = '5px';
        inputRetos.style.border = '1px solid rgba(0, 0, 0, 0.3)';
        inputRetos.style.fontFamily = 'Fredoka, sans-serif';
        inputRetos.style.fontWeight = '400';
        inputRetos.style.resize = 'vertical';

        retosSection.appendChild(retosInstruccion);
        retosSection.appendChild(inputRetos);

        // Sección de Deshabilitar Retos por Defecto
        const checkboxContainer = document.createElement('div');
        checkboxContainer.style.margin = '10px 20px';
        checkboxContainer.style.display = 'flex';
        checkboxContainer.style.justifyContent = 'center';
        checkboxContainer.style.alignItems = 'center';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'deshabilitar-retos';
        checkbox.style.marginRight = '10px';

        const checkboxLabel = document.createElement('label');
        checkboxLabel.htmlFor = 'deshabilitar-retos';
        checkboxLabel.textContent = 'Deshabilitar retos por defecto';
        checkboxLabel.style.fontFamily = 'Fredoka, sans-serif';
        checkboxLabel.style.fontWeight = '400';
        checkboxLabel.style.color = 'black';
        checkboxLabel.style.fontSize = '14px';

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkboxLabel);

        // Botón de Comenzar
        const botonGuardar = document.createElement('button');
        botonGuardar.textContent = 'Comenzar';
        botonGuardar.style.marginTop = '15px';
        botonGuardar.style.padding = '10px 20px';
        botonGuardar.style.border = 'none';
        botonGuardar.style.borderRadius = '5px';
        botonGuardar.style.backgroundColor = '#C70039';
        botonGuardar.style.color = 'white';
        botonGuardar.style.cursor = 'pointer';
        botonGuardar.style.fontFamily = 'Fredoka, sans-serif';
        botonGuardar.style.fontWeight = '400';
        botonGuardar.style.transition = 'background-color 0.3s ease';
        botonGuardar.style.width = 'auto';
        botonGuardar.style.marginLeft = 'auto';
        botonGuardar.style.marginRight = 'auto';
        botonGuardar.style.display = 'block';

        botonGuardar.onclick = function () {
            const castigos = inputCastigos.value.split(',').map(castigo => castigo.trim());
            const tiempoTemporizador = document.querySelector('input[name="tiempoTemporizador"]:checked').value;
            const retosPersonalizados = inputRetos.value.split('/').map(reto => reto.trim());
            const deshabilitarRetosPorDefecto = checkbox.checked;

            localStorage.setItem('castigos', JSON.stringify(castigos));
            localStorage.setItem('tiempoTemporizador', tiempoTemporizador);
            localStorage.setItem('retosPersonalizados', JSON.stringify(retosPersonalizados));
            localStorage.setItem('deshabilitarRetosPorDefecto', deshabilitarRetosPorDefecto);

            popupCastigos.remove();
            window.location.href = 'juego.html';
        };

        popupContent.appendChild(titulo);
        popupContent.appendChild(castigosSection);
        popupContent.appendChild(temporizadorSection);
        popupContent.appendChild(retosSection);
        popupContent.appendChild(checkboxContainer);
        popupContent.appendChild(botonGuardar);
        popupCastigos.appendChild(popupContent);

        popupCastigos.addEventListener('click', function (event) {
            if (event.target === popupCastigos) {
                popupCastigos.remove();
            }
        });

        document.body.appendChild(popupCastigos);
    }

    document.getElementById('a-jugar-button').addEventListener('click', redirigirAJuego);

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
              console.log('Service Worker registrado con éxito:', registration.scope);
            })
            .catch((error) => {
              console.log('Error al registrar el Service Worker:', error);
            });
        });
      }