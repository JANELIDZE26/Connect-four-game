import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerIndicatorComponent } from './player-indicator/player-indicator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { RouterModule } from '@angular/router';
import { PlaygroundComponent } from './playground.component';
import { SelectableComponent } from './selectable/selectable.component';
import { MenuPopupComponent } from './menu-popup/menu-popup.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    PlayerIndicatorComponent,
    DashboardComponent,
    GameBoardComponent,
    ControlPanelComponent,
    PlaygroundComponent,
    SelectableComponent,
    MenuPopupComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild([{ path: '', component: PlaygroundComponent }]),
  ],
})
export class PlaygroundModule {}
