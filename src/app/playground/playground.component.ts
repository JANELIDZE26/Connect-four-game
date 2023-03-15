import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Player, SelectableInfo, Scoreboard } from '@models/models';
import { ControllerService } from '../services/controller/controller.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit {
  public readonly PLAYER = Player;
  public readonly SCOREBOARD: Scoreboard = { playerOne: 0, playerTwo: 0 };

  constructor(private controllerService: ControllerService) {}

  ngOnInit(): void {
    // this.controllerService.playerClicked$.subscribe(
    //   (player: PlayerClicked) => {
    //
    //   }
    // );
  }
}

