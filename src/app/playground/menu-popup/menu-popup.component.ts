import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { DialogRef, DialogService } from '@ngneat/dialog';
import { ControllerService } from '@services';

@Component({
  selector: 'app-menu-popup',
  templateUrl: './menu-popup.component.html',
  styleUrls: ['./menu-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPopupComponent implements OnInit {
  private dialog = inject(DialogService);
  private dialogRef = inject(DialogRef);
  private controllerService: ControllerService = this.dialogRef.data;

  constructor(private router: Router) {}

  ngOnInit() {
    this.controllerService.pauseCountdown();
  }

  public onContinueGame(): void {
    this.dialog.closeAll();
    this.controllerService.setCountdown();
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
