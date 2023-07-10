import { GameBoardService } from './../game-board/game-board.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckWinnerService {
  constructor(private gameBoardService: GameBoardService) {
    console.log('asdsd')
    this.gameBoardService.gameBoard$.subscribe((gameBoard) => {
      console.log(gameBoard);
    });
  }

  public checkWinner(): boolean {
    return false;
  }
}
