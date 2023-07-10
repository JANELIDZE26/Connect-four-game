import { Injectable } from '@angular/core';
import { Dimensions, SelectableInfo } from '@models/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  private hoveredSelectable: SelectableInfo | undefined;
  private _currentColumn: number | undefined;

  private _gameBoard$: BehaviorSubject<SelectableInfo[][]> =
    this.initGameBoard();

  get currentColumn(): number | undefined {
    return this._currentColumn;
  }

  set currentColumn(column: number | undefined) {
    this._currentColumn = column;
  }

  get gameBoard$(): Observable<SelectableInfo[][]> {
    return this._gameBoard$.asObservable();
  }

  get isSelected(): boolean {
    return this.hoveredSelectable!.isSelected;
  }

  constructor(private playerService: PlayerService) {}

  public onPlay(): void {
    this.hoveredSelectable!.isSelected = true;
    this._gameBoard$.next(this._gameBoard$.getValue());
  }

  public activateHoverState(): void {
    this.hoveredSelectable = this.getFirstAvailableSelectable();
    if (this.isSelected) return;
    this.hoveredSelectable.isHovered = true;
    this.hoveredSelectable.player = this.playerService.player;
  }

  public deactivateHoverState(): void {
    this.hoveredSelectable!.isHovered = false;
    if (!this.isSelected) {
      this.hoveredSelectable!.player = null;
    }
    this.currentColumn = undefined;
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

  private getFirstAvailableSelectable(): SelectableInfo {
    const gameBoard = this._gameBoard$.getValue();
    const selectedColumn = gameBoard[this.currentColumn!];
    let row = 0;
    for (let i = 1; i < selectedColumn.length; i++) {
      if (selectedColumn[i].isSelected) {
        return gameBoard[this.currentColumn!][row];
      }
      row = i;
    }
    return gameBoard[this.currentColumn!][row];
  }
}
