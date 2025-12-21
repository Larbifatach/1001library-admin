import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
// Library:: Services
import { LibraryApi } from './library-api';
//
@Injectable({ providedIn: 'root' })
export class LibraryUp {

  // Library:: Global Vars
  private library__up_path : any;
  public library__up_type : any;

  // Library:: Global Vars
  constructor(
      private _library_api: LibraryApi,
      private _library_ttp_clnt: HttpClient,
      httpBackend: HttpBackend,
  ) { 
    this._library_ttp_clnt = new HttpClient(httpBackend); 
  }

  // Library:: Call Upload
  library_upload(library__file_sele: any, library__file_type: string ) {

    // Library:: Vars
    const library__token = localStorage.getItem('token');
    const library__up_data = new FormData();
    
    // Library:: File Types
    if(library__file_type =='avatar_url'){ this.library__up_type = 'upload-avatar';
    } else if(library__file_type =='cover_url'){ this.library__up_type = 'upload-cover';
    } else if(library__file_type =='bg_url'){ this.library__up_type = 'upload-bg';
    } else if(library__file_type =='image_url'){ this.library__up_type = 'upload-image'; }
    //
    library__up_data.append(library__file_type, library__file_sele); this.library__up_path = this._library_api.library_base_off() + this.library__up_type;

    // Library:: Call
    const library__ttp_opts = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + library__token, 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' }) };
    return this._library_ttp_clnt.post(this.library__up_path, library__up_data, library__ttp_opts).pipe(retry(0), catchError(this._library_api.library_h_errors));
    
  }

}
