import { CheckWinnerService } from './../check-winner/check-winner.service';
import { Injectable } from '@angular/core';
import { GameBoard, Player, SelectableInfo } from '@models/models';
import { Subject } from 'rxjs';
import { GameBoardService } from '../game-board/game-board.service';
import { PlayerService } from '../player/player.service';

@Injectable()
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

  public get gameBoard(): GameBoard {
    return this.gameBoardService.getGameBoard();
  }

  public play(): void {
    if (!this.gameBoardService.isSelected) {
      this.gameBoardService.onPlay();
      this.CheckWinnerService.checkWinner$.next({
        gameBoard: this.gameBoard,
        coordinates: this.gameBoardService.currentCoordinates,
      });
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
