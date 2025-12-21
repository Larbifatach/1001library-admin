import { Injectable, OnDestroy, TemplateRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LibraryApi } from '../api/library-api';
import { ToastrService } from 'ngx-toastr';
import { LibraryModals } from '../../helps/temps/library-modals';
import { LibraryPagination } from '../../helps/temps/library-pagination';
//
@Injectable()
export abstract class LibraryCrud implements OnDestroy {
  
  // Library:: Global Vars & Funcs
  public library_records: any[] = [];
  public library_path: string = '';
  public library_loading = true;
  public library_load_btns = false;
  public library_errors_msg = '';
  //
  public library_edit_record: any = {};
  public library_data_record: any = {};
  public library_index: number = 0;

  // Library:: Constructor
  constructor(
    protected _library_api: LibraryApi,
    protected _library_toastr: ToastrService,
    protected _library_modals: LibraryModals,
    protected _library_pagination: LibraryPagination
  ) {
  
  }

  // Library:: Filters
  public library_filters: { nums: string; status: string; extension: string; [key: string]: any; } = { nums: '', status: '', extension: '' };
  public get library_hasfltr() { return this._library_pagination.library_state.has_filter; }
  public library_get_filtred() {
    this.library_loading = true;
    this._library_pagination.library_filter(this.library_filters);
    this.library_get_records(() => this.library_loading = false);
  }
  public library_rmv_filtred() {
    this.library_loading = true;
    this.library_filters = { nums: '', status: '', extension: '' };
    this._library_pagination.library_reset();
    this.library_get_records(() => this.library_loading = false);
  }

  // Library:: Pagination
  public get library_page() { return this._library_pagination.library_state.page; }
  public library_per_page: number = 1; 
  public library_ttl_pages: number = 1; 
  public library_ttl_posts: number = 1; 
  public library_this_page: number = 1;
  public library_pagination(data: string) {
    this.library_loading = true;
    //
    const library_update_records = (d: any, m: any) => {
      this.library_records = d;
      this.library_ttl_posts = m.total;
      this.library_ttl_pages = m.last_page;
      this._library_pagination.library_state.page = m.current_page;
      this.library_loading = false;
    };
    //
    if (data === 'next') this._library_pagination.library_next(this.library_path, this.library_destroy, library_update_records);
    else if (data === 'previous') this._library_pagination.library_prev(this.library_path, this.library_destroy, library_update_records);
    else if (data === 'first') this._library_pagination.library_goto(1, this.library_path, this.library_destroy, library_update_records);
    else if (data === 'last') this._library_pagination.library_goto(this.library_ttl_pages, this.library_path, this.library_destroy, library_update_records);
    else if (!isNaN(Number(data))) this._library_pagination.library_goto(Number(data), this.library_path, this.library_destroy, library_update_records);
  }

  // Library:: Modals
  public library_modal_open(template: TemplateRef<any>, size: 'sm' | 'lg' | 'xl' = 'lg') { this._library_modals.library_open(template, size); }
  public library_modal_close_all() { this._library_modals.library_close_all(); }
 
  // Library:: Toast
  protected library_toast(type: 'good' | 'bad', msg: string) {
    const title = type === 'good' ? 'Done!' : 'Error!';
    type === 'good' ? this._library_toastr.success(msg, title, { closeButton: true, timeOut: 1500 }) : this._library_toastr.error(msg, title, { closeButton: true, timeOut: 1500 });
  }

  // Library:: Create
  public library_modal_create(template: TemplateRef<any>, initCallback?: () => void, size: 'sm' | 'lg' | 'xl' = 'lg') {
    this.library_modal_open(template, size);
    this.library_load_btns = false;
    this.library_errors_msg = '';
    //
    this.library_data_record = {};
    this.library_edit_record = {};
    //
    if (initCallback) initCallback();
  }
  public library_publish_record(record: any, callback?: (newRecord: any) => void) {
    this.library_load_btns = true; this.library_errors_msg = '';
    this._library_api.library_post(this.library_path, structuredClone(record)).pipe(takeUntil(this.library_destroy)).subscribe({
      next: (res) => {
        const body = res.body as any;
        if (body?.data) {
          const newRecord = body.data;
          this.library_records.unshift(newRecord);
          this.library_ttl_posts++;
          this.library_ttl_pages = Math.ceil(this.library_ttl_posts / this.library_per_page);
          //
          this.library_toast('good', 'The item has been added successfully.');
          this.library_modal_close_all();
          if (callback) callback(newRecord);
        } else {
          this.library_toast('bad', 'Unexpected server response!');
        }
        this.library_load_btns = false;
      },
      error: (err) => {
        this.library_errors_msg = err.error.message;
        this.library_load_btns = false;
      }
    });
  }

  // Library:: Edit
  public library_modal_edit(template: TemplateRef<any>, data: any, index: number, size: 'sm' | 'lg' | 'xl' = 'lg') {
    this.library_modal_open(template, size);
    this.library_load_btns = false;
    this.library_errors_msg = '';
    //
    this.library_index = index;
    this.library_data_record = data;
    this.library_edit_record = { ...data };
  }
  public library_update_record(callback?: (record: any) => void) {
    this.library_load_btns = true; this.library_errors_msg = '';
    this._library_api
      .library_edit(`${this.library_path}/${this.library_data_record.id}`, structuredClone(this.library_edit_record)).pipe(takeUntil(this.library_destroy))
      .subscribe({
        next: (res) => {
          const body = res.body as any;
          if (body?.data) {
            const library_final_record = body.data;
            const index = this.library_records.indexOf(this.library_data_record);
            if (index !== -1) this.library_records[index] = library_final_record;
            // 
            this.library_edit_record = {};
            this.library_load_btns = false;
            this.library_toast('good', 'The item has been updated successfully.');
            this.library_modal_close_all();
            // 
            if (callback) callback(library_final_record);
          } else {
            this.library_toast('bad', 'Unexpected server response!');
            this.library_load_btns = false;
          }
        },
        error: (err) => {
          this.library_errors_msg = err.error.message;
          this.library_load_btns = false;
        },
      });
  }
  public library_quick_record(callback?: (record: any) => void) {
    this.library_load_btns = true; this.library_errors_msg = '';
    this._library_api
      .library_edit(`${this.library_path}/quick/${this.library_data_record.id}`, structuredClone(this.library_edit_record)).pipe(takeUntil(this.library_destroy))
      .subscribe({
        next: (res) => {
          const body = res.body as any;
          if (body?.data) {
            const library_final_record = body.data;
            const index = this.library_records.indexOf(this.library_data_record);
            if (index !== -1) this.library_records[index] = library_final_record;
            // 
            this.library_edit_record = {};
            this.library_load_btns = false;
            this.library_toast('good', 'The item has been updated successfully.');
            this.library_modal_close_all();
            // 
            if (callback) callback(library_final_record);
          } else {
            this.library_toast('bad', 'Unexpected server response!');
            this.library_load_btns = false;
          }
        },
        error: (err) => {
          this.library_errors_msg = err.error.message;
          this.library_load_btns = false;
        },
      });
  }

  // Library:: Delete
  public library_modal_delete(template: TemplateRef<any>, data: any, index: number, size: 'sm' | 'lg' | 'xl' = 'sm') {
    this.library_modal_open(template, size);
    this.library_load_btns = false;
    this.library_errors_msg = '';
    //
    this.library_data_record = data;
    this.library_index = index;
  }
  public library_delete_record(id: number, index: number) {
    this.library_load_btns = true;
    this.library_errors_msg = '';
    this._library_api.library_delete(`${this.library_path}/${id}`).pipe(takeUntil(this.library_destroy)).subscribe({
      next: (res) => {
        if (res.status) {
          if (index > -1 && index < this.library_records.length) {
            this.library_records.splice(index, 1);
            this.library_ttl_posts--;
          }
          this.library_toast('good', 'The item has been deleted successfully.');
          this.library_modal_close_all();
        } else {
          this.library_toast('bad', 'Unexpected server response!');
        }
        this.library_load_btns = false;
      },
      error: (err) => { this.library_errors_msg = err.error.message; this.library_load_btns = false; }
    });
  }

  // Library:: Show
  public library_modal_show(template: TemplateRef<any>, data: any, index: number, size: 'sm' | 'lg' | 'xl' = 'lg') {
    this.library_modal_open(template, size);
    this.library_load_btns = false;
    this.library_errors_msg = '';
    //
    this.library_index = index;
    this.library_data_record = data;
    this.library_edit_record = { ...data };
  }

  // Library:: Get Records
  public library_get_records(callback: (data: any, meta: any) => void) {
    this._library_pagination.library_load(this.library_path, this.library_destroy, (data, meta) => {
      this.library_records = data;
      this.library_ttl_posts = meta.total;
      this.library_ttl_pages = meta.last_page;
      this.library_per_page = meta.per_page;
      this.library_this_page = meta.current_page;
      callback(data, meta);
    });
  }

  //
  protected library_destroy = new Subject<void>();
  ngOnDestroy() { this.library_destroy.next(); this.library_destroy.complete(); }

}
