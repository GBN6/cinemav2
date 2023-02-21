import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorhandlerService } from './error-handler.service';

@Injectable()
export class ErrorhandlerInterceptor implements HttpInterceptor {
  private errorService = inject(ErrorhandlerService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.errorService.errorHide();
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          //Client error
          this.errorService.errorShows();
          errorMsg = `Error: ${error.error.message}`;
        } else {
          //Server error
          this.errorService.errorShows();
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        return throwError(errorMsg);
      })
    );
  }
}
