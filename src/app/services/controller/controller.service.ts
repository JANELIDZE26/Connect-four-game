import { Injectable } from '@angular/core';
import { Player, SelectableInfo } from '@models/models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GameBoardService } from '../game-board/game-board.service';
import { PlayerService } from '../player/player.service';

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
  ) {}



  public play(selectableInfo: SelectableInfo): void {
    this.gameBoardService.updateGameBoardUI(selectableInfo);
    this.playerService.switchPlayer();
  }
}
