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
    private playerService: PlayerService
  ) {}

  public get currentPlayer(): Player {
    return this.playerService.player;
  }

  public getGameBoard$(): Observable<SelectableInfo[][]> {
    return this.gameBoardService.gameBoard$;
  }

  public play(): void {
    if (!this.gameBoardService.isSelected) {
      this.playerService.switchPlayer();
      this.gameBoardService.onPlay();
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
