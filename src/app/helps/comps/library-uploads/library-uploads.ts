import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryUp } from '../../../services/api/library-up';

@Component({
  selector: 'library-uploads',
  templateUrl: './library-uploads.html',
  imports: [CommonModule],
})
export class LibraryUploads {

  // Library:: Input
  @Input() library_icon: string = 'fi fi-rr-add-image';
  @Input() library_size_lim: number = 2;
  @Input() library_field: string = 'gallery';
  @Input() library_class: string = 'lib-image';
  @Input() library_exist_url: string[] = [];
  @Input() library_height: number = 200;
  @Input() library_bg: string = '';
  @Input() library_show_rmv: boolean = true;
  @Input() library_id: string = 'library_uploads';

  // Library:: Output
  @Output() library_uploaded = new EventEmitter<string[]>();

  // Library:: Global Vars
  public library_prev_urls: any[] = [];
  public library_loading: { [key: number]: boolean } = {};
  public library_error = '';

  // Library:: Methods
  library_remove(idx: number) {
    this.library_prev_urls.splice(idx, 1);
    this.library_update();
  }
  library_update() {
    const gallery = this.library_prev_urls.filter(x => x.remote).map(x => x.remote);
    this.library_uploaded.emit(gallery);
  }

  // Library:: Constructor
  constructor(private _library_up: LibraryUp) {}

  // Library:: File
  library_onchng(event: any) {
    const files: File[] = Array.from(event.target.files);
    if (!files.length) return;
    //
    files.forEach((library_file, idx) => {
      if (library_file.size > this.library_size_lim * 1024 * 1024) {
        this.library_error = `Max allowed size is ${this.library_size_lim}MB`;
        return;
      }
      this.library_error = '';
      const localIdx = this.library_prev_urls.length;
      this.library_loading[localIdx] = true;
      //
      const reader = new FileReader();
      reader.onload = () => {
        this.library_prev_urls.push({ local: reader.result, remote: '' });
      };
      reader.readAsDataURL(library_file);
      //
      this._library_up.library_upload(library_file, this.library_field).subscribe((res: any) => {
        this.library_loading[localIdx] = false;
        this.library_prev_urls[localIdx].remote = res[this.library_field];
        this.library_update();
      });
    });
  }

  // Library:: Get
  ngOnInit() { if (this.library_exist_url?.length) { this.library_prev_urls = this.library_exist_url.map(url => ({ local: url, remote: url })); } }

}
