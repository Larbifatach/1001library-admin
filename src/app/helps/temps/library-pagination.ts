import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs';
import { LibraryApi } from '../../services/api/library-api';
import { Router, NavigationStart } from '@angular/router';
//
@Injectable({ providedIn: 'root' })
export class LibraryPagination {

  // Library:: Global Vars & Funcs
  public library_state = {
    path: '',
    page: 1,
    per_page: 10,
    total_pages: 1,
    total_items: 0,
    has_filter: false,
    filters: {} as Record<string, any>,
  };
  private library_storage_key = 'library_state_default';

  // Library:: Constructor
  constructor(private _library_api: LibraryApi, private _router: Router) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.library_hard_reset();
      }
    });
  }

  // Library:: Reset
  private library_hard_reset() {
    Object.keys(sessionStorage).filter(k => k.startsWith('library_state_')).forEach(k => sessionStorage.removeItem(k));
    this.library_state = {
      path: '',
      page: 1,
      per_page: 10,
      total_pages: 1,
      total_items: 0,
      has_filter: false,
      filters: {},
    };
  }

  // Library:: Init
  private library_init_storage(path: string) {
    this.library_state.path = path;
    this.library_storage_key = `library_state_${path.replace(/\//g, '_')}`;
    const saved = sessionStorage.getItem(this.library_storage_key);
    if (saved) this.library_state = JSON.parse(saved);
  }

  // Library:: Save State
  private library_save() {
    sessionStorage.setItem(this.library_storage_key, JSON.stringify(this.library_state));
  }

  // Library:: Load
  public library_load(path: string, library_destroy: any, callback: (data: any, meta: any) => void) {
    if (!path) return;
    this.library_init_storage(path);
    //
    const library_params = new URLSearchParams({
      page: this.library_state.page.toString(),
      ...Object.entries(this.library_state.filters).reduce((library_acc, [library_key, library_value]) => {
        if (library_value !== '' && library_value != null) library_acc[library_key] = library_value;
        return library_acc;
      }, {} as Record<string, string>)
    }).toString();
    //
    const library_url = `${path}?${library_params}`;
    this._library_api.library_pagination(library_url).pipe(takeUntil(library_destroy)).subscribe((res: any) => {
      const meta = res.body.meta;
      this.library_state.total_items = meta.total;
      this.library_state.total_pages = meta.last_page;
      //
      this.library_save();
      //
      callback(res.body.data, meta);
    });
  }

  // Library:: Reset
  public library_reset() {
    this.library_state.page = 1;
    this.library_state.filters = {};
    this.library_state.has_filter = false;
    this.library_save();
  }

  // Library:: Next / Prev
  public library_next(path: string, library_destroy: any, callback: (data: any, meta: any) => void) {
    if (this.library_state.page < this.library_state.total_pages) {
      this.library_state.page++;
      this.library_save();
      this.library_load(path, library_destroy, callback);
    }
  }
  public library_prev(path: string, library_destroy: any, callback: (data: any, meta: any) => void) {
    if (this.library_state.page > 1) {
      this.library_state.page--;
      this.library_save();
      this.library_load(path, library_destroy, callback);
    }
  }
  public library_first(path: string, library_destroy: any, callback: (data: any, meta: any) => void) {
    if (this.library_state.page > 1) {
      this.library_state.page = 1;
      this.library_save();
      this.library_load(path, library_destroy, callback);
    }
  }
  public library_last(path: string, library_destroy: any, callback: (data: any, meta: any) => void) {
    if (this.library_state.page < this.library_state.total_pages) {
      this.library_state.page = this.library_state.total_pages;
      this.library_save();
      this.library_load(path, library_destroy, callback);
    }
  }
  public library_goto(page: number, path: string, library_destroy: any, callback: (data: any, meta: any) => void) {
    if (page >= 1 && page <= this.library_state.total_pages) {
      this.library_state.page = page;
      this.library_save();
      this.library_load(path, library_destroy, callback);
    }
  }

  // Library:: Filter
  public library_filter(filters: Record<string, any>) {
    this.library_state.page = 1;
    this.library_state.filters = filters;
    this.library_state.has_filter = Object.values(filters).some(v => v !== '' && v != null);
    this.library_save();
  }

}
