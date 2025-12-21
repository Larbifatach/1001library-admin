import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
// Library:: Main
import { LibraryUp } from '../../../services/api/library-up';
//
@Component({
  selector: 'library-upload',
  templateUrl: './library-upload.html',
  imports: [CommonModule],
})
export class LibraryUpload {

  // Library:: Input
  @Input() library_icon: string = 'fi fi-rr-add-image';
  @Input() library_size_lim: number = 2;
  @Input() library_field: string = 'avatar_url';
  @Input() library_class: string = 'lib-avatar';
  @Input() library_exist_url: string = '';
  @Input() library_height: number = 200;
  @Input() library_bg: string = '';
  @Input() library_show_rmv: boolean = true;
  @Input() library_id: string = 'library_upload';

  // Library:: Output
  @Output() library_uploaded = new EventEmitter<string>();

  // Library:: Global Vars
  public library_prev_url: any = '';
  public library_loading = false;
  public library_error = '';

  // Library:: Constructor
  constructor(private _library_up: LibraryUp) {}

  // Library:: File
  library_onchng(event: any) {
    const library_file = event.target.files[0];
    if (!library_file) return;
    //
    this.library_error = '';
    if (library_file.size > this.library_size_lim * 1024 * 1024) {
      this.library_error = `Max allowed size is ${this.library_size_lim}MB`;
      return;
    }
    //
    this.library_loading = true;
    const reader = new FileReader();
    reader.onload = () => this.library_prev_url = reader.result;
    reader.readAsDataURL(library_file);
    //
    this._library_up.library_upload(library_file, this.library_field).subscribe((res: any) => {
      this.library_loading = false;
      this.library_uploaded.emit(res[this.library_field]);
    });
  }
  library_remove() {
    this.library_prev_url = '';
    this.library_uploaded.emit('');
  }

  // Library:: Get
  ngOnInit() { if (this.library_exist_url) this.library_prev_url = this.library_exist_url; }
  
}
