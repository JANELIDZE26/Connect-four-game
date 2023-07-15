import { Coordinates, GameBoard } from 'src/app/models';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PlayerService } from '../player/player.service';

@Injectable()
export class CheckWinnerService {
  private gameBoard!: GameBoard;

  public checkWinner$ = new Subject<{
    gameBoard: GameBoard;
    coordinates: Coordinates;
  }>();

  constructor(private playerService: PlayerService) {
    this.checkWinner$.subscribe((value) => {
      this.gameBoard = value.gameBoard;
      this.checkWinner(value.coordinates.column, value.coordinates.row);
    });
  }

  public checkWinner(column: number, row: number): boolean {
    if (
      this.checkVertically(column, row) ||
      this.checkHorizontally(column, row) ||
      this.checkDiagonally(column, row)
    ) {
      return true;
    }
    return false;
  }

  private checkHorizontally(column: number, row: number): boolean {
    let count = 0;
    for (
      let c = Math.max(0, column - 3);
      c <= Math.min(this.gameBoard.length - 1, column + 3);
      c++
    ) {
      const selectable = this.gameBoard[c][row];
      if (
        selectable.isSelected &&
        selectable.player === this.playerService.player
      ) {
        count++;

        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }

    return false;
  }

  private checkVertically(column: number, row: number): boolean {
    let count = 0;
    for (
      let r = Math.max(0, row - 3);
      r <= Math.min(this.gameBoard[column].length - 1, row + 3);
      r++
    ) {
      const selectable = this.gameBoard[column][r];
      if (
        selectable.isSelected &&
        selectable.player === this.playerService.player
      ) {
        count++;

        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }

    return false;
  }

  private checkDiagonally(column: number, row: number): boolean {
    const checkFromLeftToRight = (): boolean => {
      let col = Math.max(0, column - 3);
      let rw = Math.min(this.gameBoard[column].length, row + 3);
      let count = 0;

      while (
        col <= Math.min(column + 3, this.gameBoard.length - 1) &&
        rw >= Math.max(row - 3, 0)
      ) {
        const selectable = this.gameBoard[col][rw];
        if (
          selectable &&
          selectable.isSelected &&
          selectable.player === this.playerService.player
        ) {
          count++;

          if (count === 4) {
            return true;
          }
        } else {
          count = 0;
        }

        col++;
        rw--;
      }

      return false;
    };

    const checkFromRightToLeft = (): boolean => {
      let col = Math.min(this.gameBoard.length - 1, column + 3);
      let rw = Math.min(this.gameBoard[column].length - 1, row + 3);
      let count = 0;

      while (col >= Math.max(0, column - 3) && rw >= Math.max(0, row - 3)) {
        const selectable = this.gameBoard[col][rw];
        if (
          selectable &&
          selectable.isSelected &&
          selectable.player === this.playerService.player
        ) {
          count++;

          if (count === 4) {
            return true;
          }
        } else {
          count = 0;
        }

        col--;
        rw--;
      }

      return false;
    };

    return checkFromLeftToRight() || checkFromRightToLeft();
  }
}
