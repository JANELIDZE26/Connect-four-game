import { Injectable } from '@angular/core';
import { Player } from '@models/models';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private _player = Player.playerOne;

  get player(): Player {
    return this._player;
  }

  set player(newPlayer: Player) {
    this._player = newPlayer;
  }

  constructor() {}

  public switchPlayer(): void {
    if (this.player === Player.playerOne) {
      this.player = Player.playerTwo;
    } else {
      this.player = Player.playerOne;
    }
  }
}
