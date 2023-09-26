import { Injectable } from '@angular/core';
import {
  Coordinates,
  Dimensions,
  GameBoard,
  Player,
  SelectableInfo,
} from '@models/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class GameBoardService {
  private hoveredSelectable: SelectableInfo | undefined;
  public gameBoard$ = new BehaviorSubject<GameBoard | null>(null);
  public currentColumn: number | undefined;
  public isGamePaused: boolean = false;

  get isSelected(): boolean {
    return this.hoveredSelectable!.isSelected;
  }

  get currentCoordinates(): Coordinates {
    return this.hoveredSelectable!.coordinates;
  }

  constructor() {
    this.initGameBoard();
  }

  public onPlay(): void {
    if (this.isGamePaused) return;
    this.hoveredSelectable!.isSelected = true;
  }

  public activateHoverState(player: Player): void {
    if (this.isGamePaused) return;
    this.hoveredSelectable = { ...this.getFirstAvailableSelectable() };
    if (this.isSelected) return;
    const gameBoard = JSON.parse(JSON.stringify(this.gameBoard$.getValue()));
    const { column, row } = this.hoveredSelectable.coordinates;
    gameBoard[column][row] = this.hoveredSelectable;
    this.hoveredSelectable.isHovered = true;
    this.hoveredSelectable.player = player;
    this.gameBoard$.next(gameBoard);
  }

  public deactivateHoverState(): void {
    this.hoveredSelectable!.isHovered = false;
    if (!this.isSelected) {
      this.hoveredSelectable!.player = null;
    }
    this.currentColumn = undefined;
    const gameBoard = JSON.parse(JSON.stringify(this.gameBoard$.getValue()));
    const { column, row } = this.hoveredSelectable!.coordinates;
    gameBoard[column][row] = this.hoveredSelectable;
    this.gameBoard$.next(gameBoard);
  }

  public initGameBoard(): void {
    this.isGamePaused = false;
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
    this.gameBoard$.next(gameBoard);
  }

  private getFirstAvailableSelectable(): SelectableInfo {
    const gameBoard = this.gameBoard$.getValue();
    const selectedColumn = gameBoard![this.currentColumn!];
    let row = 0;
    for (let i = 1; i < selectedColumn.length; i++) {
      if (selectedColumn[i].isSelected) {
        return gameBoard![this.currentColumn!][row];
      }
      row = i;
    }
    return gameBoard![this.currentColumn!][row];
  }
}
