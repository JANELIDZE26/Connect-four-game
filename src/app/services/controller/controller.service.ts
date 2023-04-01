import { Injectable } from '@angular/core';
import { Player, SelectableInfo } from '@models/models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GameBoardService } from '../game-board/game-board.service';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  // Restart.
  // Control Player Turn.
  // Countdown.
  // control score for each player.
  private _player$ = new BehaviorSubject<Player>(Player.playerOne);
  play$ = new Subject<SelectableInfo>();

  get player$(): Observable<Player> {
    return this._player$.asObservable();
  }

  constructor(private gameBoardService: GameBoardService) {}

  public initGameBoard(): void {
    this.gameBoardService.initGameBoard();
  }

  public play(selectableInfo: SelectableInfo): void {
    this.gameBoardService.updateGameBoardUI(selectableInfo);
    this.switchPlayer();
  }

  private switchPlayer(): void {
    if (this._player$.getValue() === Player.playerOne) {
      this._player$.next(Player.playerTwo);
    } else {
      this._player$.next(Player.playerOne);
    }
  }
}
