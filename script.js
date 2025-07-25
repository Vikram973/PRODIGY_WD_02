let startTime, updatedTime, difference, timerInterval;
let running = false;

let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let milliseconds = document.getElementById('milliseconds');
let laps = document.getElementById('laps');

function startTimer() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateTime, 10);
    running = true;
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  running = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  minutes.textContent = '00';
  seconds.textContent = '00';
  milliseconds.textContent = '00';
  laps.innerHTML = '';
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let min = Math.floor(difference / (1000 * 60));
  let sec = Math.floor((difference % (1000 * 60)) / 1000);
  let ms = Math.floor((difference % 1000) / 10);

  minutes.textContent = (min < 10) ? '0' + min : min;
  seconds.textContent = (sec < 10) ? '0' + sec : sec;
  milliseconds.textContent = (ms < 10) ? '0' + ms : ms;
}

function recordLap() {
  if (running) {
    const lapTime = `${minutes.textContent}:${seconds.textContent}:${milliseconds.textContent}`;
    const li = document.createElement('li');
    li.textContent = `Lap: ${lapTime}`;
    laps.appendChild(li);
  }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
