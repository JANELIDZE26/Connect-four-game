import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Player, Scoreboard } from '@models/models';
import { ControllerService } from '../services/controller/controller.service';
import { CheckWinnerService } from '../services/check-winner/check-winner.service';
import { GameBoardService } from '../services/game-board/game-board.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  providers: [CheckWinnerService, GameBoardService, ControllerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent {
  public readonly PLAYER = Player;
  public readonly SCOREBOARD: Scoreboard = { playerOne: 0, playerTwo: 0 };
}
