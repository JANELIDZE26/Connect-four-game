import {Injectable} from '@angular/core';
import {Player, SelectableInfo} from '@models/models';
import {Observable, Subject} from 'rxjs';
import {GameBoardService} from '../game-board/game-board.service';
import {PlayerService} from '../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  // Restart.
  // Control Player Turn.
  // Countdown.
  // control score for each player.
  play$ = new Subject<SelectableInfo>();

  constructor(
    private gameBoardService: GameBoardService,
    private playerService: PlayerService
  ) {
  }

  public get currentPlayer(): Player {
    return this.playerService.player;
  }

  public getGameBoard$(): Observable<SelectableInfo[][]> {
    return this.gameBoardService.gameBoard$;
  }

  public play(): void {
    this.gameBoardService.updateGameBoardUI();
    this.playerService.switchPlayer();
  }

  public hoverOnColumn(column: number): void {
    this.gameBoardService.activateHoverState(column);
  }

  public leaveHover(): void {
    this.gameBoardService.deactivateHoverState();
  }
}
