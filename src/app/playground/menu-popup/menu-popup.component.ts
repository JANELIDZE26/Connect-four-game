import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DialogRef, DialogService } from '@ngneat/dialog';
import { ControllerService } from 'src/app/services/controller/controller.service';

@Component({
  selector: 'app-menu-popup',
  templateUrl: './menu-popup.component.html',
  styleUrls: ['./menu-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPopupComponent {
  private dialog = inject(DialogService);
  private dialogRef = inject(DialogRef)
  private controllerService = this.dialogRef.data;

  constructor(
    private router: Router
  ) {}

  public onContinueGame(): void {
    this.dialog.closeAll();
  }

  public onRestartClicked(): void {
    this.dialog.closeAll();
    this.controllerService.restartGame();
  }

  public onExitGame(): void {
    this.dialog.closeAll();
    this.router.navigate(['./main-menu']);
  }
}
