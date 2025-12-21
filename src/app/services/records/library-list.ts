import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
//
@Injectable({ providedIn: 'root' })
export class LibraryList {
  constructor(public router: Router, public route: ActivatedRoute) {}

  initFromRoute(callback: (params: any) => void): Subscription {
    return this.route.queryParams.subscribe(callback);
  }

  updateFilters(filters: any, resetPage = true) {
    if (resetPage) filters['page'] = 1;
    if (filters['page'] === 1) delete filters['page'];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filters,
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  clearFilters(callback?: () => void) {
    this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true }).then(() => callback?.());
  }
}
