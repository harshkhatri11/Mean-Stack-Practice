import { Component } from '@angular/core';

import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-forbidden-page',
  templateUrl: './forbidden-page.component.html',
  styleUrls: ['./forbidden-page.component.scss']
})
export class ForbiddenPageComponent {

  unauthroizedMessage:string = GlobalConstants.unauthroized;

  goBack() {
    history.back();
  }
}
