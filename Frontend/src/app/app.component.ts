import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AuthService } from './auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public transalte: TranslateService,
    private config: NgSelectConfig
  ) {
    this.config.appendTo = 'body';
  }

  ngOnInit() {
    this.authService.autoAuthUser();

    if (localStorage.getItem('lang')) {
      const currLang = localStorage.getItem('lang');
      this.transalte.use(currLang);
      moment.locale(currLang);
    } else {
      localStorage.setItem('lang', 'en');
      const currLang = localStorage.getItem('lang');
      this.transalte.use(currLang);
    }
  }
}
