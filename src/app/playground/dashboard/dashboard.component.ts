import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from '@models/models';
import { ControllerService } from 'src/app/services/controller/controller.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public readonly PLAYER = Player;
  @Input() countdown!: number;
  @Input() player: Player = Player.playerOne;
  @Input() hasPlayerWon: boolean = false;

  constructor(private controllerService: ControllerService) {}

  playAgain(): void {
    this.controllerService.playAgain();
  }
}
