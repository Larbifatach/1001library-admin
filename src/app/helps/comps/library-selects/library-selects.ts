import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Library:: Package
import { NgSelectModule } from '@ng-select/ng-select';
// Library:: Main
import { LibraryApi } from '../../../services/api/library-api';
//
@Component({
  selector: 'library-selects',
  imports: [CommonModule, NgSelectModule, FormsModule],
  templateUrl: './library-selects.html',
  standalone: true,
})
export class LibrarySelects {

  // Library:: Input
  @Input() library_path: string = '';
  @Input() library_is_multi: boolean = true;
  @Input() library_value: any;
  @Input() library_label_key: string = 'title';
  @Input() library_value_key: string = 'id';
  @Input() library_img_key: string = '';
  @Input() library_placeholder: string = 'Select items';
  @Input() library_preload: any[] = [];

  // Library:: Output
  @Output() library_valueChange = new EventEmitter<any>(); 
  @Output() library_changed = new EventEmitter<any>();

  // Library:: Global Vars
  public library_items: any[] = [];
  private library_search_deb: any;

  // Library:: Constructor
  constructor(private _library_api: LibraryApi) {}

  // Library:: Global Methods
  library_on_search(input: any) {
    const library_term = typeof input === 'string' ? input : input?.term || '';
    clearTimeout(this.library_search_deb);
    if (library_term.length < 3) { this.library_items = []; return; }
    this.library_search_deb = setTimeout(() => {
      this._library_api.library_get(`${this.library_path}?name=${library_term}`).subscribe((res: any) => {
        this.library_items = res?.body.data || [];
      });
    }, 300);
  }
  library_on_change() {
    this.library_valueChange.emit(this.library_value);
    this.library_changed.emit(this.library_value);
  }

  // Library:: Get
  ngOnInit() { if (this.library_preload.length) { this.library_items = this.library_preload;  } }

}
