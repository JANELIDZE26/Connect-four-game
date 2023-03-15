import { Injectable } from '@angular/core';
import {
  Coordinates,
  Dimensions,
  Player,
  SelectableInfo,
} from '@models/models';

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  gameBoard!: SelectableInfo[][];
  constructor() {}

  public updateGameBoardUI(selectableInfo: SelectableInfo): void {

  }

  public initGameBoard(): void {
    this.gameBoard = Array.from({ length: Dimensions.rows }, (_, I: number) =>
      Array.from({ length: Dimensions.columns }, (_, J: number) => ({
        player: null,
        coordinates: { row: I + 1, column: J + 1 },
      }))
    );
  }
}
