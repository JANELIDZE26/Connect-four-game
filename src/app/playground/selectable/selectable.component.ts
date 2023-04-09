import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Coordinates, Player } from '@models/models';

@Component({
  selector: 'app-selectable',
  templateUrl: './selectable.component.html',
  styleUrls: ['./selectable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectableComponent {
  public readonly PLAYER_TYPE = Player;
  @Input() player!: Player | null;
  @Input() coordinates!: Coordinates;
  @Input() isHovered = false;
  @Input() isSelected = false;
}
