let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function formatTime(ms) {
    const milliseconds = Math.floor((ms % 1000) / 10);
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (running) {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Pause';
    }
    running = !running;
}


function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    running = false;
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = lapTime;
        laps.appendChild(lapElement);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
