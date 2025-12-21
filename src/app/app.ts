import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
// Library:: Commps
import { Desk } from './desk/desk';
//
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  imports: [CommonModule, Desk],
})
export class App implements OnInit {

  // Library:: Global Vars & Funcs
  public library_show_all: string = 'library-all';
  private library_router = inject(Router);

  // Library:: Call
  ngOnInit(): void {
    this.library_router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url.includes('login') || e.url === '/') {
          this.library_show_all = 'library-all';
        } else {
          this.library_show_all = '';
        }
      }
    });
  }

}
