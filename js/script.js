const containerDiv = document.querySelector('.container');

// DARK MODE

const checkboxDarkMode = document.querySelector('#checkDarkMode');
const svgSunDarkMode = document.querySelector('#sunSvg');
const svgMoonDarkMode = document.querySelector('#moonSvg');

// DATE

const dateDaySpan = document.querySelector('.date .day');
const dateMonthSpan = document.querySelector('.date .month');
const dateYearSpan = document.querySelector('.date .year');

// ANALOGIC CLOCK

const analogicHours = document.querySelector('#analogicHours');
const analogicMinutes = document.querySelector('#analogicMinutes');
const analogicSeconds = document.querySelector('#analogicSeconds');

// DIGITAL CLOCK

const digitalHours = document.querySelector('#digitalHours');
const digitalMinutes = document.querySelector('#digitalMinutes');
const digitalSeconds = document.querySelector('#digitalSeconds');

// POMODORO

const pomodoroMinutes = document.querySelector('.pomodoro .timerMinutes');
const pomodoroSeconds = document.querySelector('.pomodoro .timerSeconds');

const pomodoroPlay = document.querySelector('.pomodoro .play');
const pomodoroPause = document.querySelector('.pomodoro .pause');
const pomodoroStop = document.querySelector('.pomodoro .stop');

// CRONOMETRO

const cronometroHours = document.querySelector('.cronometro .timerHours');
const cronometroMinutes = document.querySelector('.cronometro .timerMinutes');
const cronometroSeconds = document.querySelector('.cronometro .timerSeconds');

const cronometroPlay = document.querySelector('.cronometro .play');
const cronometroPause = document.querySelector('.cronometro .pause');
const cronometroStop = document.querySelector('.cronometro .stop');
const cronometroReset = document.querySelector('.cronometro .reset');

let timeAtual = [0, 0, 0];
let pomodoroSequence = [[0, 3], [0, 4], [0, 5], [0, 6]];
let pomodoroTotal = [pomodoroSequence, pomodoroSequence, pomodoroSequence, pomodoroSequence];

// console.log(pomodoroTotal[0][2][1]);
let indexPomodoroTotal = 0;
let indexPomodoroSequence = 0;

const dataAtual = getDataAtual();
const data = verificaUnidade(dataAtual);
renderDate(data);

checkboxDarkMode.addEventListener('change', () => {
    containerDiv.classList.toggle('dark');
    setSvgActive();
});

function setSvgActive() {
    if (containerDiv.classList.contains('dark')) {
        svgMoonDarkMode.classList.add('active');
        svgSunDarkMode.classList.remove('active');
    } else {
        svgSunDarkMode.classList.add('active');
        svgMoonDarkMode.classList.remove('active');
    }
}

function renderDate(dataAtual) {
    dateDaySpan.textContent = dataAtual[0];
    dateMonthSpan.textContent = dataAtual[1];
    dateYearSpan.textContent = dataAtual[2];
}

function verificaUnidade(valorAtual) {
    const dezenaAjustada = valorAtual.map(element => {
        if (element.toString().length === 1) {
            element = '0' + element;
        }
        return element;
    });
    return dezenaAjustada;
}

function getDataAtual() {
    const dataAtual = new Date();

    const day = dataAtual.getDate();
    const month = dataAtual.getMonth() + 1;
    const year = dataAtual.getFullYear();

    return [day, month, year];
}

function getHorarioAtual() {
    const dataAtual = new Date();

    const hours = dataAtual.getHours();
    const minutes = dataAtual.getMinutes();
    const seconds = dataAtual.getSeconds();

    return [hours, minutes, seconds];
}

function renderClockSpans(horario) {
    digitalHours.textContent = horario[0];
    digitalMinutes.textContent = horario[1];
    digitalSeconds.textContent = horario[2];
}

function renderTimeSpans(typeTimer, pos0, pos1, pos2 = 0) {
    if (typeTimer === 'cronometro') {
        cronometroHours.textContent = pos0;
        cronometroMinutes.textContent = pos1;
        cronometroSeconds.textContent = pos2;
    } else if (typeTimer === 'pomodoro') {
        pomodoroMinutes.textContent = pos0;
        pomodoroSeconds.textContent = pos1;
    }
}

function changePartTime(typeTimer, toChange, toIncrease) {
    if (typeTimer === 'cronometro') {
        if (toChange > 59) {
            toChange = 0;
            toIncrease++;
        }
    } else if (typeTimer === 'pomodoro') {
        if (toChange < 0) {
            toChange = 59;
            toIncrease--;
        }
    }

    return [toChange, toIncrease];
}

function alterDisplay(none, block) {
    none.style.display = 'none';
    block.style.display = 'block';
}

function renderResetTimer(typeTimer) {
    if (typeTimer === 'cronometro') {
        cronometroHours.textContent = '00';
        cronometroMinutes.textContent = '00';
        cronometroSeconds.textContent = '00';
    } else if (typeTimer === 'pomodoro') {
        pomodoroMinutes.textContent = '00';
        pomodoroSeconds.textContent = '03';
    }
}

function setPropertyRotation(element, value) {
    element.style.setProperty('--rotation', value);
}

function playPomodoro() {

    if(indexPomodoroTotal > pomodoroTotal.length - 1) return;

    
    console.log(pomodoroTotal[indexPomodoroTotal][indexPomodoroSequence][0], 
                pomodoroTotal[indexPomodoroTotal][indexPomodoroSequence][1]);
    
    console.log(`indexTotal = ${indexPomodoroTotal} - indexSequence = ${indexPomodoroSequence}`);
    
    // if(indexPomodoroSequence > pomodoroSequence.length - 1) 

    // console.log([indexPomodoroTotal, indexPomodoroSequence]);
    
    // console.log(pomodoroTotal[1][0]);

    let minutes = pomodoroTotal[indexPomodoroTotal][indexPomodoroSequence][0];
    let seconds = pomodoroTotal[indexPomodoroTotal][indexPomodoroSequence][1];

    // console.log([minutes, seconds]);

    // console.log(`${indexPomodoroTotal} - ${indexPomodoroSequence} = ${minutes}:${seconds}`);

    if (minutes == 0 && seconds == 0) {
        indexPomodoroSequence += 1;

        if (indexPomodoroSequence <= pomodoroSequence.length - 1) {    // 
            let nextInitialValue = verificaUnidade(pomodoroTotal[indexPomodoroTotal][indexPomodoroSequence]);
            renderTimeSpans('pomodoro', nextInitialValue[0], nextInitialValue[1]);
        } else {
            indexPomodoroTotal += 1;
            indexPomodoroSequence = 0;
            pomodoroSequence = [[0, 3], [0, 4], [0, 5], [0, 6]];
        }
        return;
    }

    seconds--;

    const changeMinute = changePartTime('pomodoro', seconds, minutes);
    seconds = changeMinute[0];
    minutes = changeMinute[1];

    pomodoroTotal[indexPomodoroTotal][indexPomodoroSequence] = [minutes, seconds];

    let time = verificaUnidade([minutes, seconds]);
    renderTimeSpans('pomodoro', time[0], time[1]);
}

function playCronometro() {
    let hours = timeAtual[0],
        minutes = timeAtual[1],
        seconds = timeAtual[2];

    seconds++;

    const changeMinute = changePartTime('cronometro', seconds, minutes);
    seconds = changeMinute[0];
    minutes = changeMinute[1];

    const changeHour = changePartTime('cronometro', minutes, hours);
    minutes = changeHour[0];
    hours = changeHour[1];

    timeAtual = [hours, minutes, seconds];
    let time = verificaUnidade(timeAtual);

    renderTimeSpans('cronometro', time[0], time[1], time[2]);
}

function playDigitalClock(horarioAtual) {
    let horario = verificaUnidade(horarioAtual);
    renderClockSpans(horario);
}

function playAnalogicClock(horarioAtual) {
    const hourRotation = 30 * horarioAtual[0] + horarioAtual[1] / 2;
    const minRotation = 6 * horarioAtual[1];
    const secRotation = 6 * horarioAtual[2];

    setPropertyRotation(analogicHours, hourRotation);
    setPropertyRotation(analogicMinutes, minRotation);
    setPropertyRotation(analogicSeconds, secRotation);
}

// POMODORO CONTROLS

pomodoroPlay.addEventListener('click', () => {
    pomodoroPlay.classList.add('active');
    alterDisplay(pomodoroPlay, pomodoroPause);
});

pomodoroPause.addEventListener('click', () => {
    pomodoroPlay.classList.remove('active');
    alterDisplay(pomodoroPause, pomodoroPlay);
});

pomodoroStop.addEventListener('click', () => {
    pomodoroPlay.classList.remove('active');
    alterDisplay(pomodoroPause, pomodoroPlay);
    renderResetTimer('pomodoro');
    pomodoroSequence = [[0, 3], [0, 4], [0, 5], [0, 6]];
    indexPomodoro = 0;
});

// CRONOMETRO CONTROLS

cronometroPlay.addEventListener('click', () => {
    cronometroPlay.classList.add('active');
    alterDisplay(cronometroPlay, cronometroPause);
});

cronometroPause.addEventListener('click', () => {
    cronometroPlay.classList.remove('active');
    alterDisplay(cronometroPause, cronometroPlay);
})

cronometroStop.addEventListener('click', () => {
    timeAtual = [0, 0, 0];
    cronometroPlay.classList.remove('active');
    alterDisplay(cronometroPause, cronometroPlay);
    renderResetTimer('cronometro');
});

cronometroReset.addEventListener('click', () => {
    timeAtual = [0, 0, 0];
    alterDisplay(cronometroPlay, cronometroPause);
    renderTimeSpans('cronometro', '00', '00', '00');
    cronometroPlay.classList.add('active');
});

// SET INTERVALS

setInterval(() => {
    const horarioAtual = getHorarioAtual();
    playAnalogicClock(horarioAtual);
    playDigitalClock(horarioAtual);

    if (cronometroPlay.classList.contains('active')) {
        playCronometro();
    }

    if (pomodoroPlay.classList.contains('active')) {
        if (indexPomodoroTotal <= pomodoroTotal.length - 1) {
            playPomodoro();
        } else {
            // console.log('here');
            pomodoroPlay.classList.remove('active');
            alterDisplay(pomodoroPause, pomodoroPlay);
            renderResetTimer('pomodoro');
            pomodoroSequence = [[0, 3], [0, 4], [0, 5], [0, 6]];
            indexPomodoro = 0;
        }
    }
}, 1000);


// checkbox reset auto pomodoro
// pomodoro timer info


setInterval(() => {
    const dataAtual = getDataAtual();
    const data = verificaUnidade(dataAtual);
    renderDate(data);
}, 1800000);  // 30min