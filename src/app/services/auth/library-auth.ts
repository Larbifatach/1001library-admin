import { Injectable } from '@angular/core';
//
@Injectable({ providedIn: 'root' })
export class LibraryAuth {
  library_token: string | null = null;
  library_is_logged(): boolean { this.library_token = localStorage.getItem('token'); return !!this.library_token; }
  library_logout(): void { localStorage.clear(); window.location.reload(); }
}
