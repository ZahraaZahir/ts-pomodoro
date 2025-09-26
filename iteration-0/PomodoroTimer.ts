import {Timeable} from './Timeable';
import {TimerSettings} from './TimerSettings';
import {TimerStates} from './TimerStates';

export class PomodoroTimer implements Timeable {
  private state: TimerStates;
  private remainingTime: number;
  private timerId: number;

  thirtyMintuesPomodoro: 30;
  fiftyMintuesPomodoro: 50;
  hourPomodoro: 60;
  shortBreak: number;
  longBreak: number;

  
  start(): void {
    if(this.state == TimerStates.Running){
      //do something here
    }
    this.state = TimerStates.Timer;
    this.state = TimerStates.Running;
  }

  pause(): void {
    this.state = TimerStates.Paused;
  }

  reset(): void {
    this.state = TimerStates.Timer;
  }

  setTimerDuration(): void{

  };

  setBreakDuration(): void{

  };

}
