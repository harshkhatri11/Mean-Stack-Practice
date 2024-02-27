import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { AppConfigService } from '../services/app-config.service';
import { Router } from '@angular/router';

@Injectable()
export class httpInterceptor implements HttpInterceptor {
  constructor(
    private appConfigService: AppConfigService,
    private router: Router
  ) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      //navigate /delete cookies or whatever
      this.router.navigateByUrl(this.appConfigService?.forbiddenReqUrl);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const baseURL = this.appConfigService?.apiBaseUrl;
    if (request.url.charAt(0) == '/') {
      const url = request.clone({ url: `${baseURL}${request.url}` });
      return next
        .handle(url)
        .pipe(catchError((err) => this.handleAuthError(err)));
      // return next.handle(url);
    } else {
      return next.handle(request);
    }
  }
}
