import { Injectable } from '@angular/core';
import {
  Coordinates,
  Dimensions,
  Player,
  SelectableInfo,
} from '@models/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  private gameBoard!: SelectableInfo[][];
  private _gameBoard$ = this.initGameBoard();

  get gameBoard$(): Observable<SelectableInfo[][]> {
    return this._gameBoard$.asObservable();
  }

  public updateGameBoardUI(selectableInfo: SelectableInfo): void {
    console.log(selectableInfo);
  }

  private initGameBoard(): BehaviorSubject<SelectableInfo[][]> {
    const gameBoard = Array.from({ length: Dimensions.columns }, (_, i: number) =>
      Array.from({ length: Dimensions.rows }, (_, j: number) => ({
        player: null,
        coordinates: { row: j + 1, column: i + 1 },
        isHovered: false,
      }))
    );
    console.log(gameBoard);
    return new BehaviorSubject<SelectableInfo[][]>(gameBoard);
  }

  public activateHoverState(coordinates: SelectableInfo['coordinates']) {
    const hoverActivatedSelectable = this.getFirstAvailableSelectable(
      coordinates.row,
      coordinates.column
    );
    this.updateGameBoard(hoverActivatedSelectable);
  }

  private getFirstAvailableSelectable(
    row: number,
    column: number
  ): SelectableInfo {
    let tempSelectable: SelectableInfo | undefined = undefined;
    for (let i = row + 1; i < this.gameBoard.length; i++) {
      const selectable = this.gameBoard[i][column];
      if (!selectable.player) {
        tempSelectable = selectable;
      } else if (tempSelectable) {
        return tempSelectable;
      } else {
        // If first next element in column is already selected return selected element
        return this.gameBoard[row][column];
      }
    }
    return tempSelectable!;
  }

  private updateGameBoard(selectable: SelectableInfo): void {
    const updatedGameBoard = {
      ...this.gameBoard,
    };

    updatedGameBoard[selectable.coordinates.row][
      selectable.coordinates.column
    ] = { ...selectable };

    this.gameBoard = updatedGameBoard;
  }
}
