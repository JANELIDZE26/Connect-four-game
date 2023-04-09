import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Player} from '@models/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public readonly PLAYER = Player;
  public timer: number | undefined;
  @Input() player: Player = Player.playerOne;
}
