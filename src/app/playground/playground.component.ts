import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Player, Scoreboard } from '@models/models';
import { ControllerService } from '../services/controller/controller.service';
import { ScoringService } from '../services/check-winner/scoring.service';
import { GameBoardService } from '../services/game-board/game-board.service';
import { PlayerService } from '../services/player/player.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  providers: [ScoringService, GameBoardService, ControllerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent {
  public readonly PLAYER = Player;
  public scoreboard: Scoreboard | undefined;

  get currentPlayer(): Player {
    return this.controllerService.currentPlayer;
  }

  get hasPlayerWon$(): Observable<boolean> {
    return this.controllerService.playerWon$.asObservable();
  }

  constructor(
    private controllerService: ControllerService
  ) {
    this.scoreboard = this.controllerService.scoreBoard;
  }
}
