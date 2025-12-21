import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
// Library:: Services
import { LibraryApi } from '../api/library-api';
//
@Injectable({ providedIn: 'root' })
export class LibraryLogin {
  constructor( private _library_api: LibraryApi, private http: HttpClient ) {}
  //
  library_login(email: string, password: string) {
    return this.http.post<any>( this._library_api.library_base_off() + 'login-admin', { email, password }).pipe(
      retry(0),
      catchError(this.library_h_errors)
    );
  }
  library_h_errors(err: any) { return throwError(() => err); }
}
