/**
 * Si es 0 esta vacia
 * Si es 1 esta marcada por el jugador
 * Si es 2 esta marcada por la maquina
 */
var mundo = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
var turnoJugador = true

function anadirEventosBotones() {
    for (let i=0; i < mundo.length; i++) {
        for (let j=0; j < mundo[i].length; j++) {
            let elemento = document.getElementById(`casilla-${i}${j}`)
            elemento.addEventListener('click', (ev) => {
                seleccionarCasilla(i, j, elemento)
            })
        }
    }
}

function seleccionarCasilla(posI, posJ, elemento) {
    if (mundo[posI][posJ] === 0 && turnoJugador) {
        turnoJugador       = !turnoJugador
        mundo[posI][posJ]  = 1
        elemento.innerHTML = 'X'
    }
    if (verificarGanador(1)) {
        swal('You win!!', 'excelent job', 'success').then((ok) => {
            reiniciarMundo()
        })
    } else {
        if (!mundoLleno()) {
            setTimeout(() => {
                ejecutarTurnoPC()
            }, 250)
        } else {
            swal('Tie', 'continue playing', 'info').then((ok) => {
                reiniciarMundo()
            })
        }
    }
}

function ejecutarTurnoPC() {
    let i = generarAleatorio(0, 2)
    let j = generarAleatorio(0, 2)
    if (mundo[i][j] === 0 && !turnoJugador) {
        mundo[i][j] = 2
        document.getElementById(`casilla-${i}${j}`).innerHTML = 'O'
        turnoJugador = !turnoJugador
        if (verificarGanador(2)) {
            swal('You lost', 'losing streak', 'error').then((ok) => {
                reiniciarMundo()
            })
        }
    } else {
        ejecutarTurnoPC()
    }
}

function generarAleatorio(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function mundoLleno() {
    let casillasMarcadas = 0
    for (let i=0; i < mundo.length; i++) {
        for (let j=0; j < mundo[i].length; j++) {
            if (mundo[i][j] != 0) {
                casillasMarcadas ++;
            }
        }
    }
    return (casillasMarcadas >= 9)
}

function verificarGanador(num) {
    let horizontales = 0
    let verticales   = 0
    let diagonal     = 0
    let transversal  = 0
    let ganador      = false
    /* Validaciones */
    for (let i=0; i < mundo.length; i++) {
        for (let j=0; j < mundo[i].length; j++) {
            if (mundo[i][j] == num) horizontales++
            if (mundo[j][i] == num) verticales++
            if (i==j && mundo[i][j] == num) diagonal ++
            if (horizontales >= 3 || verticales >= 3 || diagonal >= 3) ganador = true
        }
        horizontales = verticales = 0
    }
    /* Validar transversal */
    if (mundo[0][2] == num) transversal ++
    if (mundo[1][1] == num) transversal ++
    if (mundo[2][0] == num) transversal ++
    if (transversal >= 3) ganador = true

    return ganador
}

function reiniciarMundo() {
    turnoJugador = true
    for (let i=0; i < mundo.length; i++) {
        for (let j=0; j < mundo[i].length; j++) {
            mundo[i][j] = 0;
            document.getElementById(`casilla-${i}${j}`).innerHTML = ''
        }
    }
}

setTimeout(() => {
    swal('Ready ?', {
        buttons: {
            yes: {
                text: 'yes ready!',
                value: true
            }
        }
    }).then((ok) => {
        anadirEventosBotones()
    })
}, 500)