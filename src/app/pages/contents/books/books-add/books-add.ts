import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from "@angular/router";
// Library:: Services
import { LibraryApi } from '../../../../services/api/library-api';
import { LibrarySelects } from '../../../../helps/comps/library-selects/library-selects';
import { LibraryUpload } from '../../../../helps/comps/library-upload/library-upload';
// Library:: Interfaces
import { LibraryRespo, Book } from '../../../../modules/library-interfaces';
// Library:: Packages
import { ToastrService } from 'ngx-toastr';
//
@Component({
  selector: 'library-books-add',
  templateUrl: './books-add.html',
  styleUrl: './books-add.scss',
  //
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, LibrarySelects, LibraryUpload],
})
export class BooksAdd {

  // Library:: Global Vars & Funcs
  public library_path: string = 'books';
  public library_load_btns: boolean = false;
  public library_errors_msg: string = '';

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
  ) {}

  // Library:: Create Record /////////////////////////////////
  public library_create_record: Book = {} as Book;
  private library_init_record(){
  this.library_create_record = {
      id: 0,
      name_en: '',
      description_en: '',
      cover_url: '',
      //
      isbn_10: '',
      isbn_13: '',
      //
      id_year: null,
      id_publisher: null,
      id_lang: null,
      id_series: null,
      //
      volume: '',
      pages: '',
      edition: '',
      //
      sub_categories: [],
      authors: [],
      //
      is_active: true,
    };
  }

  // Library:: Valid
  get library_validate(): boolean {
    return (
      !this.library_create_record.name_en ||
      !this.library_create_record.description_en ||
      !this.library_create_record.cover_url ||
      //
      !this.library_create_record.id_year ||
      !this.library_create_record.id_publisher ||
      !this.library_create_record.id_lang ||
      //
      !this.library_create_record.pages ||
      //
      this.library_create_record.sub_categories.length === 0 ||
      this.library_create_record.authors.length === 0
    );
  }
  // Library:: Publish
  public library_publish_record() {
    this.library_load_btns = true; this.library_errors_msg = '';
    this._library_api.library_post(this.library_path, JSON.parse(JSON.stringify(this.library_create_record))).subscribe({
      next: (res) => {
        const body = res.body as LibraryRespo;
        if (body?.data) {
          this.router.navigate(['/books']);
        } else {
          this.library_load_btns = false;
          this.library_toast_bad('Unexpected server response!');
        }
      },
      error: (err) => {
        this.library_errors_msg = err.error.message;
        this.library_load_btns = false;
      }
    });
  }

  // Library:: Get Recordes //////////////////////////////////////
  public library_sub_categories: any = [];
  public library_authors: any = [];
  public library_years: any = [];
  public library_publishers: any = [];
  public library_langs: any = [];
  public library_series: any = [];
  ngOnInit(): void {
    this.library_init_record();
  }

}