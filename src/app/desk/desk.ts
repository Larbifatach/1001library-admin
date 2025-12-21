import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
//
@Component({
  selector: 'app-desk',
  templateUrl: './desk.html',
  styleUrl: './desk.scss',
  standalone: true,
  //
  imports: [CommonModule, RouterModule, Sidebar]
})
export class Desk {

    // Library:: Global Vars
    public library_show_them : boolean = false;

    // Library:: Constructor
    constructor(public router: Router) {
        router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                if (e['url'] == '/login' || e['url'] == '/') {
                    this.library_show_them = false;
                } else {
                    this.library_show_them = true;
                }
            }
        });
    }
    
}