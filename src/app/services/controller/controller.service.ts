import { ScoringService } from '../check-winner/scoring.service';
import { Injectable } from '@angular/core';
import { GameBoard, Player, Scoreboard, SelectableInfo } from '@models/models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GameBoardService } from '../game-board/game-board.service';
import { PlayerService } from '../player/player.service';

@Injectable()
export class ControllerService {
  public play$ = new Subject<SelectableInfo>();
  public playerWon$ = new BehaviorSubject<boolean>(false);

  constructor(
    private gameBoardService: GameBoardService,
    private playerService: PlayerService,
    private scoringService: ScoringService
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

  private resetScoreBoard(): void {
    this.scoringService.resetScoreBoard();
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
        this.playerWon$.next(true);
      } else {
        this.playerService.switchPlayer();
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
  }

  public restartGame(): void {
    this.gameBoardService.initGameBoard();
    this.playerWon$.next(false);
    this.playerService.player = Player.playerOne;
    this.resetScoreBoard();
  }
}
