import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
//
@Component({
  selector: 'library-cards',
  templateUrl: './library-cards.html',
  imports: [CommonModule],
})
export class LibraryCards {

  // Library:: Input
  @Input() library_loads = false;
  @Input() library_total = 0;
  @Input() library_page = 1;
  @Input() library_pages = 1;

  // Library:: Output
  @Output() library_paginate = new EventEmitter<any>();

}
