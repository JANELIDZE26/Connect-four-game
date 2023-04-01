import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Dimensions, SelectableInfo } from '@models/models';
import { ControllerService } from '../../services/controller/controller.service';


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameBoardComponent implements OnInit {
  public board: { [index: string]: number[] } = {
    columns: new Array(Dimensions.columns).fill(0).map((x, i) => i + 1),
    rows: new Array(Dimensions.rows).fill(0).map((x, i) => i + 1),
  };

  constructor(
    private controllerService: ControllerService,
  ) {}

  onPlay(selectableInfo: SelectableInfo): void {
    this.controllerService.play(selectableInfo);
  }

  ngOnInit(): void {
    this.controllerService.initGameBoard();
  }
}
