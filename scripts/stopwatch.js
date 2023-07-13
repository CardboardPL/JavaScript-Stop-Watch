const timer = JSON.parse(localStorage.getItem('timer')) || {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};

// Button Elements
const startStopButton = document.querySelector('.js-start-stop-button');
const resetButton = document.querySelector('.js-reset-button')
// Timer Elements
const dayElement = document.querySelector('#js-days-count');
const hoursElement = document.querySelector('#js-hours-count');
const minutesElement = document.querySelector('#js-minutes-count');
const secondsElement = document.querySelector('#js-seconds-count');
let isToggled = false;
let intervalId;

function displayTimer() {
  dayElement.textContent = timer.days.toString().padStart(2, '0');
  hoursElement.textContent = timer.hours.toString().padStart(2, '0');
  minutesElement.textContent = timer.minutes.toString().padStart(2, '0');
  secondsElement.textContent = timer.seconds.toString().padStart(2, '0');
}

displayTimer();

function startTimer() {
  intervalId = setInterval(() => {
    timer.seconds++;

    if (timer.seconds === 60) {
      timer.seconds = 0;
      timer.minutes++;
    }

    if (timer.minutes === 60) {
      timer.minutes = 0;
      timer.hours++;
    }

    if (timer.hours === 24) {
      timer.hours = 0;
      timer.days++;
    }

    if (timer.days === 99) {
      resetTimer();
      isToggled = false
      startStopButton.innerText = 'Start';
    }
    displayTimer();
    localStorage.setItem('timer', JSON.stringify(timer));
  }, 1000)
}

function stopTimer() {
  clearInterval(intervalId);
}

function resetTimer() {
  timer.days = 0;
  timer.hours = 0;
  timer.minutes = 0;
  timer.seconds = 0;
  localStorage.setItem('timer', JSON.stringify(timer));
  startStopButton.innerText = 'Start';
  stopTimer();
  displayTimer();
}

startStopButton.addEventListener('click', () => {
  if (!isToggled) {
    startTimer();
    isToggled = true;
    startStopButton.innerText = 'Stop';
  } else {
    stopTimer();
    isToggled = false;
    startStopButton.innerText = 'Start';
  }
})

resetButton.addEventListener('click', resetTimer);

