import { Timer } from "./Timer";
import { TimerMode } from "./TimerMode";
import { api } from "./api";

const authSection = document.getElementById("auth-section")!;
const timerSection = document.getElementById("timer-section")!;
const loginTab = document.getElementById("login-tab")!;
const registerTab = document.getElementById("register-tab")!;
const loginForm = document.getElementById("login-form")! as HTMLFormElement;
const registerForm = document.getElementById("register-form")! as HTMLFormElement;
const authError = document.getElementById("auth-error")!;

const timeDisplay = document.getElementById("time-display")!;
const startBtn = document.getElementById("start-btn")!;
const pauseBtn = document.getElementById("pause-btn")!;
const resetBtn = document.getElementById("reset-btn")!;
const pomodoroBtn = document.getElementById("pomodoro-btn")!;
const shortBreakBtn = document.getElementById("short-break-btn")!;
const longBreakBtn = document.getElementById("long-break-btn")!;
const modeButtons = document.querySelectorAll(".mode-button");
const logoutBtn = document.getElementById("logout-btn")!;
const sessionsList = document.getElementById("sessions-list")!;

let currentMode: TimerMode = TimerMode.Pomodoro;

function modeToString(mode: TimerMode): string {
  switch (mode) {
    case TimerMode.Pomodoro: return "Pomodoro";
    case TimerMode.ShortBreak: return "ShortBreak";
    case TimerMode.LongBreak: return "LongBreak";
  }
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString();
}

function showAuth() {
  authSection.classList.remove("hidden");
  timerSection.classList.add("hidden");
}

function showTimer() {
  authSection.classList.add("hidden");
  timerSection.classList.remove("hidden");
}

// ---- Auth tabs ----

function switchAuthTab(tab: "login" | "register") {
  document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));
  loginForm.classList.add("hidden");
  registerForm.classList.add("hidden");
  authError.classList.add("hidden");

  if (tab === "login") {
    loginTab.classList.add("active");
    loginForm.classList.remove("hidden");
  } else {
    registerTab.classList.add("active");
    registerForm.classList.remove("hidden");
  }
}

loginTab.addEventListener("click", () => switchAuthTab("login"));
registerTab.addEventListener("click", () => switchAuthTab("register"));

// ---- Auth form submissions ----

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  authError.classList.add("hidden");
  const email = (loginForm.elements[0] as HTMLInputElement).value;
  const password = (loginForm.elements[1] as HTMLInputElement).value;
  try {
    const res = await api.login(email, password);
    api.setToken(res.accessToken);
    initTimer();
  } catch (err: any) {
    authError.textContent = err.message;
    authError.classList.remove("hidden");
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  authError.classList.add("hidden");
  const email = (registerForm.elements[0] as HTMLInputElement).value;
  const password = (registerForm.elements[1] as HTMLInputElement).value;
  try {
    const res = await api.register(email, password);
    api.setToken(res.accessToken);
    initTimer();
  } catch (err: any) {
    authError.textContent = err.message;
    authError.classList.remove("hidden");
  }
});

logoutBtn.addEventListener("click", () => {
  api.setToken(null);
  showAuth();
});

// ---- Timer logic ----

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
  pauseBtn.classList.add("hidden");
  startBtn.classList.remove("hidden");

  const totalSeconds = 25 * 60;
  if (currentMode !== TimerMode.ShortBreak && currentMode !== TimerMode.LongBreak) {
    api.createSession(modeToString(currentMode), totalSeconds).catch(() => {});
  }

  loadSessions();
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
  currentMode = TimerMode.Pomodoro;
  myTimer.startPomodoro();
  updateActiveButton(pomodoroBtn);
});

shortBreakBtn.addEventListener("click", () => {
  currentMode = TimerMode.ShortBreak;
  myTimer.startShortBreak();
  updateActiveButton(shortBreakBtn);
});

longBreakBtn.addEventListener("click", () => {
  currentMode = TimerMode.LongBreak;
  myTimer.startLongBreak();
  updateActiveButton(longBreakBtn);
});

function updateActiveButton(clickedButton: HTMLElement) {
  modeButtons.forEach((btn) => btn.classList.remove("active"));
  clickedButton.classList.add("active");
}

async function loadSessions() {
  try {
    const sessions = await api.getSessions();
    if (sessions.length === 0) {
      sessionsList.innerHTML = '<p class="empty-state">No sessions yet. Start your first Pomodoro!</p>';
      return;
    }
    sessionsList.innerHTML = sessions.map(s => `
      <div class="session-item">
        <span class="session-mode">${s.mode}</span>
        <span class="session-duration">${formatDuration(s.durationSeconds)}</span>
        <span class="session-time">${formatDateTime(s.completedAt)}</span>
      </div>
    `).join("");
  } catch {
    sessionsList.innerHTML = '<p class="empty-state">Failed to load sessions.</p>';
  }
}

function initTimer() {
  showTimer();
  currentMode = TimerMode.Pomodoro;
  myTimer.onTick(25 * 60);
  loadSessions();
}

// ---- Bootstrap ----

if (api.getToken()) {
  initTimer();
} else {
  showAuth();
}
