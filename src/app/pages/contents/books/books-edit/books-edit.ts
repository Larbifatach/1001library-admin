import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
// Library:: Services
import { LibraryApi } from '../../../../services/api/library-api';
import { LibrarySelects } from '../../../../helps/comps/library-selects/library-selects';
import { LibraryUpload } from '../../../../helps/comps/library-upload/library-upload';
// Library:: Interfaces
import { LibraryRespo } from '../../../../modules/library-interfaces';
// Library:: Packages
import { ToastrService } from 'ngx-toastr';
//
@Component({
  selector: 'library-books-edit',
  templateUrl: './books-edit.html',
  styleUrl: './books-edit.scss',
  //
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, LibrarySelects, LibraryUpload],
})
export class BooksAdd {

  // Library:: Global Vars & Funcs
  public library_path: string = 'books';
  public library_load_btns: boolean = false;
  public library_errors_msg: string = '';
  public library_record_id : any;

  // Library:: Tabs
  public library_tab : string = 'Info';
  library_chenge_tab(data: string): void { this.library_tab = data; }

  // Library:: Toeast
  private library_toastr = inject(ToastrService);
  library_toast_good(library_msg: string) { this.library_toastr.success(library_msg, 'Done!', { closeButton: true }); }
  library_toast_bad(library_msg: string) { this.library_toastr.error(library_msg, 'Error!', { closeButton: true }); }

  // Library:: Constructor
  constructor( 
    private _library_api: LibraryApi,
    public router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(paramMap => { this.library_record_id = paramMap.get('record_id'); });
  }

  // Library:: Edit Record /////////////////////////////////
  public library_edit_record: any = {};
  // Library:: Valid
  get library_validate(): boolean {
    return (
      !this.library_edit_record.name_en ||
      !this.library_edit_record.description_en ||
      !this.library_edit_record.cover_url ||
      //
      !this.library_edit_record.id_year ||
      !this.library_edit_record.id_publisher ||
      !this.library_edit_record.id_lang ||
      //
      !this.library_edit_record.pages ||
      //
      this.library_edit_record.sub_categories.length === 0 ||
      this.library_edit_record.authors.length === 0
    );
  }
  // Library:: Update
  public library_update_record() {
    this.library_load_btns = true; this.library_errors_msg = '';
    this._library_api.library_put(this.library_path+'/'+this.library_record_id, JSON.parse(JSON.stringify(this.library_edit_record))).subscribe({
      next: (res) => {
        const body = res.body as LibraryRespo;
        if (body?.data) {
          this.library_toast_good("Book updated!");
          this.library_get_records();
        } else {
          this.library_toast_bad('Unexpected server response!');
        }
        this.library_load_btns = false; this.library_errors_msg = '';
      },
      error: (err) => {
        this.library_errors_msg = err.error.message;
        this.library_load_btns = false;
      }
    });
  }

  // Library:: Get Recordes //////////////////////////////////////
  public library_book: any = {};
  public library_loading = true;
  //
  public library_sub_categories: any = [];
  public library_authors: any = [];
  public library_year: any = {};
  public library_publisher: any = {};
  public library_lang: any = {};
  public library_series: any = {};
  //
  public library_get_records() {
    this.library_loading = true;
    this._library_api.library_get(this.library_path+'/'+this.library_record_id).subscribe((response: any) => {
      this.library_book = response.body.data;
      // 
      this.library_edit_record = { 
        ...this.library_book,
        id_year: this.library_book.year?.id,
        id_publisher: this.library_book.publisher?.id,
        id_lang: this.library_book.lang?.id,
        id_series: this.library_book.series?.id,
        authors: this.library_book.authors ? this.library_book.authors.map((s: any) => s.id) : [],
        sub_categories: this.library_book.sub_categories ? this.library_book.sub_categories.map((s: any) => s.id) : []
      };
      this.library_year = this.library_book.year ? [this.library_book.year] : [];
      this.library_publisher = this.library_book.publisher ? [this.library_book.publisher] : [];
      this.library_lang = this.library_book.lang ? [this.library_book.lang] : [];
      this.library_series = this.library_book.series ? [this.library_book.series] : [];
      this.library_sub_categories = this.library_book.sub_categories || [];
      this.library_authors = this.library_book.authors || [];
      // 
      this.library_loading = false;
    });
  }
  ngOnInit(): void {
      this.library_get_records();
  }

}