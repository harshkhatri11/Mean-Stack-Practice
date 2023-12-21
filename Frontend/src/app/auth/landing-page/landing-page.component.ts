import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserAuthenticationComponent } from '../user-authentication/user-authentication.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  isSignBtnVisbile: boolean = true;
  constructor(private router: Router, private dialog: MatDialog) {}

  onLogin() {
    this.router.navigate(['/auth/login']);
  }

  onSignup() {
    this.router.navigate(['/auth/signup']);
  }

  handleUserAuthentication() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      backdropClass: 'blurred',
    };
    const dialogRef = this.dialog.open(
      UserAuthenticationComponent,
      dialogConfig
    );
    this.isSignBtnVisbile = false;
    this.dialog.afterAllClosed.subscribe({
      next: () => {
        this.isSignBtnVisbile = true;
      },
    });

    this.router.events.subscribe({
      next: () => {
        dialogRef.close();
      },
    });
  }
}
