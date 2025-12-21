import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
//
export const libraryInterceptor: HttpInterceptorFn = ( req: HttpRequest<any>, next: HttpHandlerFn ): Observable<HttpEvent<any>> => {
  const library__token = localStorage.getItem('token');
  if (library__token) {
    const cloned = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + library__token).set('Content-Type', 'application/json') });
    return next(cloned);
  }
  return next(req);
};