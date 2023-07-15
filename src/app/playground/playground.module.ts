import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerIndicatorComponent } from './player-indicator/player-indicator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ConnectCircleComponent } from './connect-circle/connect-circle.component';
import { RouterModule } from '@angular/router';
import { PlaygroundComponent } from './playground.component';
import { PointerComponent } from './game-board/pointer/pointer.component';
import { SelectableComponent } from './selectable/selectable.component';
import { GameBoardService } from '../services/game-board/game-board.service';
import { ControllerService } from '../services/controller/controller.service';

@NgModule({
  declarations: [
    PlayerIndicatorComponent,
    DashboardComponent,
    GameBoardComponent,
    ControlPanelComponent,
    ConnectCircleComponent,
    PlaygroundComponent,
    PointerComponent,
    SelectableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PlaygroundComponent }]),
  ],
})
export class PlaygroundModule {}
