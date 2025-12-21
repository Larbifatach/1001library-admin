import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//
@Component({
  selector: 'library-nums',
  templateUrl: './library-nums.html',
  imports: [CommonModule, FormsModule],
})
export class LibraryNums {

  // Library:: Input
  @Input() library_model: Record<string, any> = { nums: '' };
  @Input() library_has_fltr = false;
  @Input() library_id = 'library_filter_nums';
  @Input() library_name = 'library_filter_nums';

  // Library:: Output
  @Output() library_changed = new EventEmitter<Record<string, any>>();
  @Output() library_clear = new EventEmitter<void>();

}
