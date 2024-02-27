import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { AuthService } from 'src/app/auth/auth.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { TranslateService } from '@ngx-translate/core';
import { SettingComponent } from '../setting/setting.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  currentUserDetails: any;
  lastLogin: any;
  avatarImgBaseUrl: string =
    'https://ui-avatars.com/api/?rounded=true&bold=true&background=ffffff&size=36&name=';
  avatarImg: any;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe({
      next: (isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      },
    });

    setTimeout(() => {
      this.avatarImg =
        this.avatarImgBaseUrl +
        `${this.currentUserDetails?.basicDetails?.firstName}+${this.currentUserDetails?.basicDetails?.lastName}`;
    }, 300);
    this.getUserInfo();
  }
  getUserInfo() {
    let currentUserId = this.authService.getUserId();
    this.authService.currentUserLoggedIn(currentUserId).subscribe({
      next: (res: any) => {
        this.currentUserDetails = res.data;
        // console.log(this.currentUserDetails);
        this.lastLogin = this.currentUserDetails?.lastLogin;
      },
    });
    // this.lastLogin = moment(this.currentUserDetails?.lastLogin).format(
    //   'MMMM Do YYYY, h:mm:ss a'
    // );
  }

  handleEditAction(values: any) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      data: {
        action: 'Edit',
        value: values,
      },
      backdropClass: 'blurred',
    };

    const dialogRef = this.dialog.open(UserProfileComponent, dialogConfig);
    this.router.events.subscribe({
      next: () => {
        dialogRef.close();
      },
    });

    dialogRef.componentInstance.onEditUser.subscribe({
      next: () => {
        this.getUserInfo();
      },
    });
  }

  setting() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      backdropClass: 'blurred',
      width: '850px',
    };
    this.dialog.open(SettingComponent, dialogConfig);
  }

  onLogout() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      data: {
        message: 'Logout',
      },
      backdropClass: 'blurred',
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    dialogRef.componentInstance.onEmitStatusChange.subscribe({
      next: (res) => {
        this.authService.logout();
        dialogRef.close();
      },
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
