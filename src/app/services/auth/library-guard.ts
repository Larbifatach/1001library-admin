import { Injectable, inject } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
// Library:: Services
import { LibraryAuth } from '../../services/auth/library-auth';
//
@Injectable({ providedIn: 'root' })
export class LibraryGuard implements CanActivate {

  // Library:: Constructor
  constructor(
    private library_router: Router, 
    private _library_auth: LibraryAuth 
  ) {}

  // Library:: Can Activate
  canActivate(): boolean|UrlTree {
      if (!this._library_auth.library_is_logged()) { this.library_router.navigate(["login"]); return false; }
      return true;
  }
  
}


