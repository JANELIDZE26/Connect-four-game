import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-indicator',
  templateUrl: './player-indicator.component.html',
  styleUrls: ['./player-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerIndicatorComponent {
  @Input() playerIndicatorText: 'Player 1' | 'Player 2' | undefined;
  @Input() playerIndicatorIconName: 'player-one' | 'player-two' | undefined;
  @Input() playerScore: number = 0;
}
