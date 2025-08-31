import {Timer} from './Timer';

const timeDisplay = document.getElementById('time-display')!;

const startBtn = document.getElementById('start-btn')!;
const pauseBtn = document.getElementById('pause-btn')!;
const resetBtn = document.getElementById('reset-btn')!;

const pomodoroBtn = document.getElementById('pomodoro-btn')!;
const shortBreakBtn = document.getElementById('short-break-btn')!;
const longBreakBtn = document.getElementById('long-break-btn')!;

const myTimer = new Timer({
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
});

myTimer.onTick = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

startBtn.addEventListener('click', () => {
  myTimer.start();
});

pauseBtn.addEventListener('click', () => {
  myTimer.pause();
});

resetBtn.addEventListener('click', () => {
  myTimer.reset();
});

pomodoroBtn.addEventListener('click', () => {
  myTimer.reset();
  updateActiveButton(pomodoroBtn);
});

shortBreakBtn.addEventListener('click', () => {
  myTimer.startShortBreak();
  updateActiveButton(shortBreakBtn);
});

longBreakBtn.addEventListener('click', () => {
  myTimer.startLongBreak();
  updateActiveButton(longBreakBtn);
});

function updateActiveButton(clickedButton: HTMLElement) {
  let buttonsList = document.querySelectorAll('.mode-button');
  buttonsList.forEach((btn) => btn.classList.remove('active'));
  clickedButton.classList.add('active');
}
