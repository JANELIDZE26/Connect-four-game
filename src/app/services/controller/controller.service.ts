import { Injectable } from '@angular/core';
import { GameBoard, Player, Scoreboard, SelectableInfo } from '@models/models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as Services from '@services';

@Injectable()
export class ControllerService {
  public play$ = new Subject<SelectableInfo>();
  public playerWon$ = new BehaviorSubject<boolean>(false);

  constructor(
    private gameBoardService: Services.GameBoardService,
    private playerService: Services.PlayerService,
    private scoringService: Services.ScoringService,
    private timerService: Services.TimerService
  ) {}

  public get currentPlayer(): Player {
    return this.playerService.player;
  }

  public get gameBoard$(): BehaviorSubject<GameBoard | null> {
    return this.gameBoardService.gameBoard$;
  }

  public get scoreBoard$(): Observable<Scoreboard> {
    return this.scoringService.scoreBoard$;
  }

  public get countdown$(): Observable<number> {
    return this.timerService.countdown$;
  }

  private resetScoreBoard(): void {
    this.scoringService.resetScoreBoard();
  }

  public setCountdown(): void {
    this.timerService.setCountdown();
  }

  public pauseCountdown(): void {
    this.timerService.clearInterval();
  }
  

  public timeExpired(): void {
    this.playerService.switchPlayer();
    this.timerService.resetInterval();
    this.gameBoardService.activateHoverState(this.currentPlayer);
  }

  public play(): void {
    if (!this.gameBoardService.isSelected) {
      this.gameBoardService.onPlay();
      const playerWon: boolean = this.scoringService.checkWinner(
        this.gameBoard$.getValue()!,
        this.gameBoardService.currentCoordinates,
        this.playerService.player
      );
      if (playerWon) {
        this.gameBoardService.isGamePaused = true;
        this.timerService.clearInterval();
        this.playerWon$.next(true);
      } else {
        this.playerService.switchPlayer();
        this.timerService.resetInterval();
      }
      this.OnHoverColumn();
    }
  }

  public setColumn(column: number): void {
    this.gameBoardService.currentColumn = column;
  }

  public OnHoverColumn(): void {
    this.gameBoardService.activateHoverState(this.currentPlayer);
  }

  public leaveHover(): void {
    this.gameBoardService.deactivateHoverState();
  }

  public playAgain(): void {
    this.gameBoardService.initGameBoard();
    this.playerWon$.next(false);
    this.playerService.switchPlayer();
    this.timerService.resetInterval();
  }

  public restartGame(): void {
    this.gameBoardService.initGameBoard();
    this.playerWon$.next(false);
    this.playerService.player = Player.playerOne;
    this.resetScoreBoard();
    this.timerService.resetInterval();
  }
}
