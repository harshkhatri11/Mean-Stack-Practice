import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MessageInterceptor implements HttpInterceptor {
  constructor(private toster: ToastrService) {}

  intercept(
    httpRequest: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return new Observable((observer) => {
      next.handle(httpRequest).subscribe({
        next: (res: HttpResponse<any>) => {
          if (res instanceof HttpResponse) {
            if (res.body.msgDisplay == true) {
              if (res.body.message.length) {
                this.toster.success(res.body.message, 'Success');
              } else if (res.body.error.length) {
                this.toster.error(res.body.error, 'Error');
              }
            }
            observer.next(res);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          if (err.error.msgDisplay == true && err.error.error.length) {
            this.toster.error(err.error.error, 'Error');
          }
        },
      });
    });
  }
}
