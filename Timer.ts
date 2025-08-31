import {TimerSettings} from './TimerSettings';
import {TimerStates} from './TimerStates';

export class Timer {
  private currentState: TimerStates;
  private timerId: number | null;
  private timeRemaining: number;
  public onTick: (time: number) => void;

  private settings: TimerSettings;

  constructor(settings: TimerSettings) {
    this.settings = settings;
    this.currentState = TimerStates.Stopped;
    this.timerId = null;
    this.timeRemaining = this.settings.pomodoro * 60;
    this.onTick = () => {};
  }

  public start(): void {
    if (this.timerId !== null) {
      return;
    }
    this.currentState = TimerStates.Running;
    this.timerId = window.setInterval(() => {
      this.timeRemaining--;
      this.onTick(this.timeRemaining);
    }, 1000);
  }

  public pause(): void {
    if (this.timerId !== null) {
      /* here, we have created a type guard for this
      clear interval function as it was complaining
      that the type didn't match
      (because what if the timerId was null?)
      so we fixed that by wrapping it with a safe gaurd!)
      */
      clearInterval(this.timerId);
      this.currentState = TimerStates.Paused;
      this.timerId = null;
    }
  }

  public reset(): void {
    this.pause();
    this.currentState = TimerStates.Stopped;
    this.timeRemaining = this.settings.pomodoro * 60;
    this.onTick(this.timeRemaining);
  }

  public startShortBreak(): void {
    this.pause();
    this.currentState = TimerStates.Break;
    this.timeRemaining = this.settings.shortBreak * 60;
    this.onTick(this.timeRemaining);
  }

  public startLongBreak(): void {
    this.pause();
    this.currentState = TimerStates.Break;
    this.timeRemaining = this.settings.longBreak * 60;
    this.onTick(this.timeRemaining);
  }
}

