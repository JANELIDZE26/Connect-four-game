import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Dimensions, SelectableInfo } from '@models/models';
import { ControllerService } from '../../services/controller/controller.service';
import { GameBoardService } from '../../services/game-board/game-board.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameBoardComponent implements OnInit {
  public gameBoard$ = this.gameBoardService.gameBoard$;

  constructor(
    private controllerService: ControllerService,
    private gameBoardService: GameBoardService
  ) {}

  onPlay(selectableInfo: SelectableInfo): void {
    this.controllerService.play(selectableInfo);
  }

  ngOnInit(): void {}
}
