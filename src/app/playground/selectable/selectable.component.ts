import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Coordinates, Player, SelectableInfo } from '@models/models';

@Component({
  selector: 'app-selectable',
  templateUrl: './selectable.component.html',
  styleUrls: ['./selectable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectableComponent {
  @Input() player!: Player | null;
  @Input() coordinates!: Coordinates;
  @Output() play$ = new EventEmitter<SelectableInfo>();

  @HostListener('click')
  onClick() {
    this.play$.emit({
      player: this.player!,
      coordinates: this.coordinates,
    });
  }
}
