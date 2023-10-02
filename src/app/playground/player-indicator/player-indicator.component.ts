import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from '@models/models';

@Component({
  selector: 'app-player-indicator',
  templateUrl: './player-indicator.component.html',
  styleUrls: ['./player-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerIndicatorComponent {
  public readonly _PLAYER = Player;
  @Input() player!: Player;
  @Input() playerIndicatorText: Player | undefined;
  @Input() playerIndicatorIconName: Player | undefined;
  @Input() playerScore: number = 0;
}
