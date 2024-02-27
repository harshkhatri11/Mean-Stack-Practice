import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Pipe({
  name: 'dynamicMoment',
})
export class DynamicMomentPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: string, format?: string): any {
    format = format ? format : 'MMMM Do YYYY'; // make the moment format configurable
    const initVal = moment(value)?.locale(moment.locale()).format(format); // get the initial value

    // insert the value into a new behaviour subject. If the language changes, the behaviour subject will be
    // updated
    const momentObs = new BehaviorSubject<any>(initVal);

    this.translate.onLangChange.subscribe(() => {
      const currLang = this.translate.currentLang; // format the new date according to the new locale
      const val = moment(value)?.locale(currLang).format(format);
      momentObs.next(val);
    });
    return momentObs; // needs to be piped into the async pipe
  }
}
