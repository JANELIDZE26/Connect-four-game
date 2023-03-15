import { Injectable } from '@angular/core';
import { Dimensions, Player, SelectableInfo } from '@models/models';
import { Subject } from 'rxjs';
import { GameBoardService } from '../game-board/game-board.service';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  // Restart.
  // Control Player Turn.
  // Countdown.
  // control score for each player.
  player: Player = Player.playerOne;
  play$ = new Subject<SelectableInfo>();

  constructor(private gameBoardService: GameBoardService) {}

  initGameBoard(): void {
    this.gameBoardService.initGameBoard();
  }

  play(selectableInfo: SelectableInfo): void {
    this.gameBoardService;
  }
}
