import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';
//
@Injectable({ providedIn: 'root' })
export class LibraryApi {

  // Library:: Global Vars
  library_base = 'https://1001library.com/api/v1-adminox/';
  library_base_off() { return this.library_base; }

  // Library:: Constructor
  constructor(private httpClient: HttpClient) { }

  // Library:: Calls
  library_get(source : string) { return this.httpClient.get(this.library_base + source, {observe: 'response'}).pipe(retry(0), catchError(this.library_h_errors)); }
  library_edit(source : string, data: any) { return this.httpClient.put(this.library_base + source, JSON.stringify(data),{observe: 'response'}).pipe(retry(0), catchError(this.library_h_errors)); }
  library_post(source : string, data: any) { return this.httpClient.post(this.library_base + source, JSON.stringify(data),{observe: 'response'}).pipe(retry(0), catchError(this.library_h_errors)); }
  library_delete(source : string) { return this.httpClient.delete(this.library_base + source,{observe: 'response'}).pipe(retry(0), catchError(this.library_h_errors)); }
  library_put(source : string, data: any) { return this.httpClient.put(this.library_base + source, JSON.stringify(data),{observe: 'response'}).pipe(retry(0), catchError(this.library_h_errors)); }
  library_pagination(source : string) { return this.httpClient.get(this.library_base + source, {observe: 'response'}).pipe(retry(0), catchError(this.library_h_errors)); }

  // Library:: Errors
  library_h_errors(err: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = err.error.message;
    } else {
      errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    return throwError(() => err);
  }

}