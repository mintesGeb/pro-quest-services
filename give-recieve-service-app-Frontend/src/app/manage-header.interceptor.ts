import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ManageHeaderInterceptor implements HttpInterceptor {
  constructor(private ar: ActivatedRoute) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let newRequest = request.clone({
      headers: request.headers.set('Content-Type', 'application/json'),
    });
    let token = localStorage.getItem('token');
    if (token) {
      newRequest = newRequest.clone({
        headers: request.headers.append('authorization', 'bearer ' + token),
      });
    }

    return next.handle(newRequest);
  }
}
