import { Injectable } from '@angular/core';
import {
  Coordinates,
  Dimensions,
  GameBoard,
  SelectableInfo,
} from '@models/models';
import { PlayerService } from '../player/player.service';

@Injectable()
export class GameBoardService {
  private hoveredSelectable: SelectableInfo | undefined;
  private gameBoard: GameBoard = this.initGameBoard();
  public currentColumn: number | undefined;

  get isSelected(): boolean {
    return this.hoveredSelectable!.isSelected;
  }

  get currentCoordinates(): Coordinates {
    return this.hoveredSelectable!.coordinates;
  }

  constructor(private playerService: PlayerService) {}

  public getGameBoard(): GameBoard {
    return [...this.gameBoard];
  }

  public onPlay(): void {
    this.hoveredSelectable!.isSelected = true;
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

  private initGameBoard(): GameBoard {
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
    return gameBoard;
  }

  private getFirstAvailableSelectable(): SelectableInfo {
    const selectedColumn = this.gameBoard[this.currentColumn!];
    let row = 0;
    for (let i = 1; i < selectedColumn.length; i++) {
      if (selectedColumn[i].isSelected) {
        return this.gameBoard[this.currentColumn!][row];
      }
      row = i;
    }
    return this.gameBoard[this.currentColumn!][row];
  }
}
