import { Routes } from '@angular/router';
// Library:: Services
import { LibraryGuard } from './services/auth/library-guard';
//
export const appRoutes: Routes = [

  // Library:: Welcom
  { path: 'login', loadChildren: () => import('./auth/login.routes').then(m => m.routes) },
  { path: 'options', loadChildren: () => import('./pages/forms/options/options.routes').then(m => m.routes), canActivate : [LibraryGuard] },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.routes), canActivate : [LibraryGuard] },

  // Library:: Accounts
  { path: 'members', loadChildren: () => import('./pages/accounts/members/members.routes').then(m => m.routes), canActivate : [LibraryGuard] },
  { path: 'uploaders', loadChildren: () => import('./pages/accounts/uploaders/uploaders.routes').then(m => m.routes), canActivate : [LibraryGuard] },
  { path: 'moderators', loadChildren: () => import('./pages/accounts/moderators/moderators.routes').then(m => m.routes), canActivate : [LibraryGuard] },

  // Library:: Elements
  { path: 'categories', loadChildren: () => import('./pages/elems/categories/categories.routes').then(m => m.routes), canActivate : [LibraryGuard] },
  { path: 'subcategories', loadChildren: () => import('./pages/elems/subcategories/subcategories.routes').then(m => m.routes), canActivate : [LibraryGuard] },
  { path: 'languages', loadChildren: () => import('./pages/elems/langs/langs.routes').then(m => m.routes), canActivate : [LibraryGuard] },
  { path: 'years', loadChildren: () => import('./pages/elems/years/years.routes').then(m => m.routes), canActivate : [LibraryGuard] },
  { path: 'series', loadChildren: () => import('./pages/elems/series/series.routes').then(m => m.routes), canActivate : [LibraryGuard] },

  // Library:: Content
  { path: 'authors', loadChildren: () => import('./pages/contents/authors/authors.routes').then(m => m.routes), canActivate : [LibraryGuard] },
  { path: 'reviews', loadChildren: () => import('./pages/contents/reviews/reviews.routes').then(m => m.routes), canActivate : [LibraryGuard] },

  // Library:: Books
  { path: 'books', loadChildren: () => import('./pages/contents/books/books.routes').then(m => m.routes), canActivate : [LibraryGuard] },
  { path: 'books/add', loadChildren: () => import('./pages/contents/books/books-add/books-add.routes').then(m => m.routes), canActivate : [LibraryGuard] },
  { path: 'books/edit/:record_id', loadChildren: () => import('./pages/contents/books/books-edit/books-edit.routes').then(m => m.routes), canActivate : [LibraryGuard] },

  // Library:: Forms
  { path: 'contacts', loadChildren: () => import('./pages/forms/contacts/contacts.routes').then(m => m.routes), canActivate : [LibraryGuard] },
  { path: 'reports', loadChildren: () => import('./pages/forms/problems/problems.routes').then(m => m.routes), canActivate : [LibraryGuard] },
  { path: 'suggestions', loadChildren: () => import('./pages/forms/suggests/suggests.routes').then(m => m.routes), canActivate : [LibraryGuard] },

  // Library:: Downloads
  { path: 'downloads', loadChildren: () => import('./pages/downloads/downlinks/downlinks.routes').then(m => m.routes), canActivate : [LibraryGuard] },
  { path: 'invalids', loadChildren: () => import('./pages/downloads/invalids/invalids.routes').then(m => m.routes), canActivate : [LibraryGuard] },

  // Library:: Full
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];


