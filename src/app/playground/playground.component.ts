import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Player, Scoreboard } from '@models/models';
import { Observable } from 'rxjs';
import * as Services from '@services';
@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  providers: [
    Services.ScoringService,
    Services.GameBoardService,
    Services.ControllerService,
    Services.PlayerService,
    Services.TimerService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit {
  public readonly PLAYER = Player;
  public scoreboard: Scoreboard | undefined;
  public time!: number;

  get currentPlayer(): Player {
    return this.controllerService.currentPlayer;
  }

  get hasPlayerWon$(): Observable<boolean> {
    return this.controllerService.playerWon$.asObservable();
  }

  get scoreBoard$() {
    return this.controllerService.scoreBoard$;
  }

  constructor(
    private controllerService: Services.ControllerService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.controllerService.setCountdown();
    this.controllerService.countdown$.subscribe((time) => {
      this.time = time;

      if (time === 0) {
        this.controllerService.timeExpired();
      }
      this.changeDetectionRef.detectChanges();
    });
  }
}
