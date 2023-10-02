import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogRef, DialogService } from '@ngneat/dialog';
import { ControllerService } from 'src/app/services/controller/controller.service';
import { MenuPopupComponent } from '../menu-popup/menu-popup.component';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlPanelComponent {
  private dialog = inject(DialogService);
  constructor(private controllerService: ControllerService) {}

  public onRestart(): void {
    this.controllerService.restartGame();
  }

  public onMenuClicked(): void {
    this.dialog.open(MenuPopupComponent, {
      closeButton: false,
      enableClose: false,
      data: this.controllerService
    });
  }
}
