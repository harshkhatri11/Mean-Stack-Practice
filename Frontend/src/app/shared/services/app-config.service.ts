import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  public appConfig: any;

  constructor(public http: HttpClient) { }

  loadAppConfig() {
    this.http.get('../../../assets/config/env.json').subscribe({
      next: (res: any) => {
        this.appConfig = res;
        // console.log(this.appConfig);
      }
    });
    return this.appConfig;
  }

  get apiBaseUrl(): string {
    return this.appConfig?.baseURL;
  }

  get forbiddenReqUrl(): string {
    return this.appConfig?.forbiddenReq;
  }
}
