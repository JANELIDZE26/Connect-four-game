import { Player } from '../enums/player';

export interface Scoreboard {
  [Player.playerOne]: number;
  [Player.playerTwo]: number;
}
