import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
//
@Component({
  selector: 'library-deletes',
  templateUrl: './library-deletes.html',
  imports: [CommonModule],
})
export class LibraryDeletes {

  // Library:: Input
  @Input() library_title = 'Delete';
  @Input() library_name = '';
  @Input() library_text = 'Are you sure';
  @Input() library_load = false;
  @Input() library_error = '';

  // Library:: Output
  @Output() library_confirm = new EventEmitter<void>();
  @Output() library_close = new EventEmitter<void>();

  // Library:: Methods
  onConfirm() { this.library_confirm.emit(); }
  onClose() { this.library_close.emit(); }

}
