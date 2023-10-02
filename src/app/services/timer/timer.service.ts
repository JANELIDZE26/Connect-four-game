import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class TimerService implements OnDestroy {
  private time = 30;
  private _countdown$ = new BehaviorSubject<number>(this.time);
  private interval: undefined | NodeJS.Timer;

  public get countdown$(): Observable<number> {
    return this._countdown$.asObservable();
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

  public clearInterval(): void {
    clearInterval(this.interval);
  }

  public resetInterval(): void {
    this.time = 30;
    this._countdown$.next(this.time);
    this.setCountdown();
  }

  public setCountdown(): void {
    if (this.interval) {
      this.clearInterval();
    }

    this.interval = setInterval(() => {
      this.time--;
      this._countdown$.next(this.time);

      if (this.time === 0) {
        this.clearInterval();
      }
    }, 1000);
  }
}
