import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControllerService } from '../../services/controller/controller.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameBoardComponent {
  public gameBoard$ = this.controllerService.getGameBoard$();

  constructor(private controllerService: ControllerService) {}

  public onMouseenter(column: number): void {
    this.controllerService.setColumn(column);
    this.controllerService.OnHoverColumn();
  }

  public onMouseLeave(): void {
    this.controllerService.leaveHover();
  }

  public onClickColumn(): void {
    this.controllerService.play();
  }
}
