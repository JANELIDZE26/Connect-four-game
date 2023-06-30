import { Injectable } from '@angular/core';
import { Dimensions, SelectableInfo } from '@models/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  private hoveredSelectable: SelectableInfo | undefined;

  private _gameBoard$: BehaviorSubject<SelectableInfo[][]> =
    this.initGameBoard();

  get gameBoard$(): Observable<SelectableInfo[][]> {
    return this._gameBoard$.asObservable();
  }

  constructor(private playerService: PlayerService) {}

  public updateGameBoardUI(): void {
    this.hoveredSelectable!.isSelected = true;
  }

  public activateHoverState(column: number): void {
    this.hoveredSelectable = this.getFirstAvailableSelectable(column);
    if (!this.hoveredSelectable) return;
    this.hoveredSelectable.isHovered = true;
    this.hoveredSelectable.player = this.playerService.player;
  }

  public deactivateHoverState(): void {
    this.hoveredSelectable!.isHovered = false;
  }

  private initGameBoard(): BehaviorSubject<SelectableInfo[][]> {
    const gameBoard = Array.from(
      { length: Dimensions.columns },
      (_, i: number) =>
        Array.from({ length: Dimensions.rows }, (_, j: number) => ({
          player: null,
          coordinates: { row: j, column: i },
          isHovered: false,
          isSelected: false,
        }))
    );
    return new BehaviorSubject<SelectableInfo[][]>(gameBoard);
  }

  private getFirstAvailableSelectable(column: number): SelectableInfo {
    const gameBoard = this._gameBoard$.getValue();
    const selectedColumn = gameBoard[column];
    let row = 0;
    for (let i = 1; i < selectedColumn.length; i++) {
      if (selectedColumn[i].isSelected) {
        return gameBoard[column][row];
      }
      row = i;
    }
    return gameBoard[column][row];
  }

  private updateHoverState(selectable: SelectableInfo): void {
    const gameBoard = this._gameBoard$.getValue();
    const updatedGameBoard = [...gameBoard];

    updatedGameBoard[selectable.coordinates.column][
      selectable.coordinates.row
    ] = { ...selectable, isHovered: true };

    this._gameBoard$.next(updatedGameBoard);
  }
}
