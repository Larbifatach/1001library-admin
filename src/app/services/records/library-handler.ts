import { Injectable } from '@angular/core';
import { LibraryList } from './library-list';
import { LibraryApi } from '../api/library-api';
//
@Injectable({ providedIn: 'root' })
export class LibraryHandler {
  private _lastFilters: any = {};
  private _fromPagination = false;

  constructor(private _api: LibraryApi, private _list: LibraryList) {}

  // Library:: Init
  init(c: any) {
    this._list.initFromRoute((p: any) => {
      const { page, ...filters } = p;
      c.library_page = page ? +page : 1;
      c.library_filters = { ...filters };
      this._lastFilters = { ...filters };
      this.refresh(c);
    });
  }

  // Library:: Refresh
  refresh(c: any) {
    c.library_loading = true;
    c.library_hasfltr = Object.values(c.library_filters || {}).some(v => v !== '' && v !== null && v !== undefined);

    const urlParams: any = {};
    for (const [k, v] of Object.entries(c.library_filters || {})) {
      if (v !== '' && v !== null && v !== undefined) urlParams[k] = v;
    }
    if (c.library_page > 1) urlParams.page = c.library_page;

    const query = Object.entries(urlParams)
      .map(([k, v]) => `${k}=${k === 'name' ? encodeURIComponent(v as string) : v}`)
      .join('&');
    const url = `${c.library_path}${query ? '?' + query : ''}`;

    this._api.library_get(url).subscribe({
      next: (r: any) => {
        const m = r.body.meta;
        Object.assign(c, {
          library_records: r.body.data,
          library_ttl_posts: m.total,
          library_this_page: m.current_page,
          library_per_page: m.per_page,
          library_ttl_pages: m.last_page,
          library_loading: false
        });
        this._fromPagination = false;
      },
      error: e => {
        c.library_errors_msg = e.error.message;
        c.library_loading = false;
        this._fromPagination = false;
      }
    });
  }

  // Library:: Pagination
  pagination(c: any, d: string) {
    if (d === 'next' && c.library_page < c.library_ttl_pages) c.library_page++;
    else if (d === 'previous' && c.library_page > 1) c.library_page--;
    else return;
    this._fromPagination = true;
    this._list.updateFilters({ ...c.library_filters, page: c.library_page }, false);
  }

  // Library:: Apply Filter
  applyFilters(c: any) {
    this._list.updateFilters(c.library_filters, true);
  }

  // Library:: Remove Filter
  removeFilter(c: any) {
    c.library_loading = true;
    c.library_filters = {};
    c.library_page = 1;
    this._list.clearFilters(() => {
      this._api.library_get(c.library_path).subscribe((r: any) => {
        const m = r.body.meta;
        Object.assign(c, {
          library_records: r.body.data,
          library_ttl_posts: m.total,
          library_this_page: m.current_page,
          library_per_page: m.per_page,
          library_ttl_pages: m.last_page,
          library_loading: false,
          library_hasfltr: false
        });
      });
    });
  }
}
