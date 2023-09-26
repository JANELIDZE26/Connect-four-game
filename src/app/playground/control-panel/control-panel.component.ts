import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControllerService } from 'src/app/services/controller/controller.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlPanelComponent {
  constructor(private controllerService: ControllerService) {}

  public onRestart(): void {
    this.controllerService.restartGame();
  }
}
