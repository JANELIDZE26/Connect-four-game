import { Coordinates, GameBoard, Player, Scoreboard } from 'src/app/models';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { PlayerService } from '../player/player.service';

@Injectable()
export class ScoringService implements OnDestroy {
  private gameBoard!: GameBoard;
  private unsubscribes$: Subject<void> = new Subject();
  private _scoreBoard$ = new BehaviorSubject<Scoreboard>({
    'player-one': 0,
    'player-two': 0,
  });

  public scoreBoard$ = this._scoreBoard$.asObservable();
  public playerWon$ = new Subject<boolean>();

  public get scoreboard(): Scoreboard {
    return this._scoreBoard$.getValue();
  }

  public checkWinner$ = new Subject<{
    gameBoard: GameBoard;
    coordinates: Coordinates;
  }>();

  constructor(private playerService: PlayerService) {
    this.checkWinner$.pipe(takeUntil(this.unsubscribes$)).subscribe((value) => {
      this.gameBoard = value.gameBoard;
      this.checkWinner(value.coordinates.column, value.coordinates.row);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribes$.next();
    this.unsubscribes$.complete();
  }

  public checkWinner(column: number, row: number): void {
    if (
      this.checkVertically(column, row) ||
      this.checkHorizontally(column, row) ||
      this.checkDiagonally(column, row)
    ) {
      this.increaseScore();
      this._scoreBoard$.next(this.scoreboard);
      this.playerWon$.next(true);
    }
    this.playerService.switchPlayer();
  }

  private increaseScore() {
    const scoreBoard = this._scoreBoard$.getValue();

    scoreBoard[this.playerService.player]++;
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
