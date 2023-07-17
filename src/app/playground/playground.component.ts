import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Player, Scoreboard } from '@models/models';
import { ControllerService } from '../services/controller/controller.service';
import { ScoringService } from '../services/check-winner/scoring.service';
import { GameBoardService } from '../services/game-board/game-board.service';
import { PlayerService } from '../services/player/player.service';

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
    return this.playerService.player;
  }

  constructor(
    private scoringService: ScoringService,
    private playerService: PlayerService
  ) {
    this.scoringService.scoreBoard$.subscribe((scoreBoard) => {
      this.scoreboard = scoreBoard;
    });
  }
}
