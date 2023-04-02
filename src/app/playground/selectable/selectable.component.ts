import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Coordinates, Player, SelectableInfo } from '@models/models';
import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'app-selectable',
  templateUrl: './selectable.component.html',
  styleUrls: ['./selectable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectableComponent {
  public player!: Player | null;
  public readonly PLAYER_TYPE = Player;
  @Input() coordinates!: Coordinates;
  @Output() play$ = new EventEmitter<SelectableInfo>();

  constructor(private playerService: PlayerService) {}

  onClick() {
    if (this.player) return;
    this.player = this.playerService.player;
    this.play$.emit({
      player: this.player,
      coordinates: { ...this.coordinates },
      isHovered: false,
    });
  }

  onHover() {
    console.log(this.coordinates);
  }
}
