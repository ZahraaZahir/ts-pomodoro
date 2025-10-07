import { Timer } from "./Timer";

const timeDisplay = document.getElementById("time-display")!;
const startBtn = document.getElementById("start-btn")!;
const pauseBtn = document.getElementById("pause-btn")!;
const resetBtn = document.getElementById("reset-btn")!;
const pomodoroBtn = document.getElementById("pomodoro-btn")!;
const shortBreakBtn = document.getElementById("short-break-btn")!;
const longBreakBtn = document.getElementById("long-break-btn")!;
const modeButtons = document.querySelectorAll('.mode-button');

const myTimer = new Timer({
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
});

myTimer.onTick = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timeDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

myTimer.onFinish = () => {
  alert("Session finished!");
  pauseBtn.classList.add("hidden");
  startBtn.classList.remove("hidden");
};

startBtn.addEventListener("click", () => {
  myTimer.start();
  startBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
});

pauseBtn.addEventListener("click", () => {
  myTimer.pause();
  pauseBtn.classList.add("hidden");
  startBtn.classList.remove("hidden");
});

resetBtn.addEventListener("click", () => {
  myTimer.reset();
  pauseBtn.classList.add("hidden");
  startBtn.classList.remove("hidden");
});

pomodoroBtn.addEventListener("click", () => {
  myTimer.startPomodoro();
  updateActiveButton(pomodoroBtn);
});

shortBreakBtn.addEventListener("click", () => {
  myTimer.startShortBreak();
  updateActiveButton(shortBreakBtn);
});

longBreakBtn.addEventListener("click", () => {
  myTimer.startLongBreak();
  updateActiveButton(longBreakBtn);
});

function updateActiveButton(clickedButton: HTMLElement) {
  modeButtons.forEach((btn) => btn.classList.remove("active"));
  clickedButton.classList.add("active");
}

myTimer.onTick(25 * 60);