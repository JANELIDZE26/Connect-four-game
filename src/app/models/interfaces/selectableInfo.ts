import { Coordinates, Player } from '@models/models';

export interface SelectableInfo {
  player: Player | null;
  coordinates: Coordinates;
  isHovered: boolean
}
