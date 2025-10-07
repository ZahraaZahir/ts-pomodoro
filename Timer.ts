import { TimerSettings } from "./TimerSettings";
import { TimerMode } from "./TimerMode";
import { TimerStatus } from "./TimerStatus";

export class Timer {
  public onTick: (time: number) => void;
  public onFinish: () => void;

  private settings: TimerSettings;
  private mode: TimerMode;
  private status: TimerStatus;
  private timeRemaining: number;
  private timerId: number | null;
  private durationMap: Map<TimerMode, number>;

  constructor(settings: TimerSettings) {
    this.settings = settings;
    this.mode = TimerMode.Pomodoro;
    this.status = TimerStatus.Stopped;
    this.timerId = null;

    this.onTick = () => {};
    this.onFinish = () => {};

    this.durationMap = new Map<TimerMode, number>([
      [TimerMode.Pomodoro, this.settings.pomodoro],
      [TimerMode.ShortBreak, this.settings.shortBreak],
      [TimerMode.LongBreak, this.settings.longBreak],
    ]);

    // Set the initial time based on the default mode
    this.timeRemaining = (this.durationMap.get(this.mode) ?? 0) * 60;
  }

  // --- Control Methods ---

  public start(): void {
    if (this.status === TimerStatus.Running) {
      return;
    }
    this.status = TimerStatus.Running;
    this.timerId = window.setInterval(() => {
      this.timeRemaining--;
      this.onTick(this.timeRemaining);

      if (this.timeRemaining <= 0) {
        this.pause();
        this.onFinish();
      }
    }, 1000);
  }

  public pause(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.status = TimerStatus.Paused;
  }

  public reset(): void {
    this.pause();
    this.status = TimerStatus.Stopped;
    const durationInMinutes = this.durationMap.get(this.mode) ?? 0;
    this.timeRemaining = durationInMinutes * 60;
    this.onTick(this.timeRemaining);
  }


  public startPomodoro(): void {
    this.pause();
    this.mode = TimerMode.Pomodoro;
    this.status = TimerStatus.Stopped;
    this.timeRemaining = (this.durationMap.get(this.mode) ?? 0) * 60;
    this.onTick(this.timeRemaining);
  }

  public startShortBreak(): void {
    this.pause();
    this.mode = TimerMode.ShortBreak;
    this.status = TimerStatus.Stopped;
    this.timeRemaining = (this.durationMap.get(this.mode) ?? 0) * 60;
    this.onTick(this.timeRemaining);
  }

  public startLongBreak(): void {
    this.pause();
    this.mode = TimerMode.LongBreak;
    this.status = TimerStatus.Stopped;
    this.timeRemaining = (this.durationMap.get(this.mode) ?? 0) * 60;
    this.onTick(this.timeRemaining);
  }
}