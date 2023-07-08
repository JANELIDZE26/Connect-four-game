import {Coordinates, Player} from '@models/models';

export interface SelectableInfo {
  player: Player | null;
  readonly coordinates: Coordinates;
  isHovered: boolean,
  isSelected: boolean,
}
