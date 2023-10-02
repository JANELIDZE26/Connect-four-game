import { Coordinates, GameBoard, Player, Scoreboard } from 'src/app/models';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class ScoringService implements OnDestroy {
  private unsubscribes$: Subject<void> = new Subject();
  private readonly DEFAULT_SCORE_BOARD = {
    'player-one': 0,
    'player-two': 0,
  };
  private _scoreBoard$ = new BehaviorSubject<Scoreboard>(
    this.DEFAULT_SCORE_BOARD
  );

  public get scoreBoard$(): Observable<Scoreboard> {
    return this._scoreBoard$.asObservable();
  }

  ngOnDestroy(): void {
    this.unsubscribes$.next();
    this.unsubscribes$.complete();
  }

  public checkWinner(
    gameBoard: GameBoard,
    coordinates: Coordinates,
    player: Player
  ): boolean {
    if (
      this.checkVertically(gameBoard, coordinates, player) ||
      this.checkHorizontally(gameBoard, coordinates, player) ||
      this.checkDiagonally(gameBoard, coordinates, player)
    ) {
      this.increaseScore(player);
      return true;
    }
    return false;
  }

  public resetScoreBoard(): void {
    this._scoreBoard$.next(this.DEFAULT_SCORE_BOARD);
  }

  private increaseScore(player: Player) {
    const scoreBoard = { ...this._scoreBoard$.getValue() };
    scoreBoard[player]++;
    this._scoreBoard$.next(scoreBoard);
  }

  private checkHorizontally(
    gameBoard: GameBoard,
    coordinates: Coordinates,
    player: Player
  ): boolean {
    const { column, row } = coordinates;
    let count = 0;
    for (
      let c = Math.max(0, column - 3);
      c <= Math.min(gameBoard.length - 1, column + 3);
      c++
    ) {
      const selectable = gameBoard[c][row];
      if (selectable.isSelected && selectable.player === player) {
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

  private checkVertically(
    gameBoard: GameBoard,
    coordinates: Coordinates,
    player: Player
  ): boolean {
    const { column, row } = coordinates;
    let count = 0;
    for (
      let r = Math.max(0, row - 3);
      r <= Math.min(gameBoard[column].length - 1, row + 3);
      r++
    ) {
      const selectable = gameBoard[column][r];
      if (selectable.isSelected && selectable.player === player) {
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

  private checkDiagonally(
    gameBoard: GameBoard,
    coordinates: Coordinates,
    player: Player
  ): boolean {
    const { column, row } = coordinates;
    const checkFromLeftToRight = (): boolean => {
      let col = Math.max(0, column - 3);
      let rw = Math.min(gameBoard[column].length, row + 3);
      let count = 0;

      while (
        col <= Math.min(column + 3, gameBoard.length - 1) &&
        rw >= Math.max(row - 3, 0)
      ) {
        const selectable = gameBoard[col][rw];
        if (
          selectable &&
          selectable.isSelected &&
          selectable.player === player
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
      let col = Math.min(gameBoard.length - 1, column + 3);
      let rw = Math.min(gameBoard[column].length - 1, row + 3);
      let count = 0;

      while (col >= Math.max(0, column - 3) && rw >= Math.max(0, row - 3)) {
        const selectable = gameBoard[col][rw];
        if (
          selectable &&
          selectable.isSelected &&
          selectable.player === player
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
