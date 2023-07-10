import { CheckWinnerService } from './../check-winner/check-winner.service';
import { Injectable } from '@angular/core';
import { Player, SelectableInfo } from '@models/models';
import { Observable, Subject } from 'rxjs';
import { GameBoardService } from '../game-board/game-board.service';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  play$ = new Subject<SelectableInfo>();

  constructor(
    private gameBoardService: GameBoardService,
    private playerService: PlayerService,
    private CheckWinnerService: CheckWinnerService
  ) {}

  public get currentPlayer(): Player {
    return this.playerService.player;
  }

  public getGameBoard$(): Observable<SelectableInfo[][]> {
    return this.gameBoardService.gameBoard$;
  }

  public play(): void {
    if (!this.gameBoardService.isSelected) {
      this.gameBoardService.onPlay();
      // TODO check if the player won.
      this.playerService.switchPlayer();
      this.OnHoverColumn();
    }
  }

  public setColumn(column: number): void {
    this.gameBoardService.currentColumn = column;
  }

  public OnHoverColumn(): void {
    this.gameBoardService.activateHoverState();
  }

  public leaveHover(): void {
    this.gameBoardService.deactivateHoverState();
  }
}
