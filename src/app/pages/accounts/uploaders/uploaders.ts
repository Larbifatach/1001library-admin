import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Library:: Services
import { LibraryApi } from '../../../services/api/library-api';
import { LibraryCrud } from '../../../services/records/library-crud';
// Library:: Helps
import { LibraryModals } from '../../../helps/temps/library-modals';
import { LibraryPagination } from '../../../helps/temps/library-pagination';
// Library:: Comps
import { LibraryNums } from '../../../helps/comps/library-nums/library-nums';
import { LibraryDeletes} from '../../../helps/comps/library-deletes/library-deletes';
import { LibraryTables } from '../../../helps/comps/library-tables/library-tables';
// Library:: Interfaces
import { Uploader } from '../../../modules/library-interfaces';
// Library:: Packages
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
//
@Component({
  selector: 'library-uploaders',
  templateUrl: './uploaders.html',
  styleUrl: './uploaders.scss',
  //
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgbTooltipModule, LibraryNums, LibraryTables, LibraryDeletes, NgxMaskDirective],
  providers: [provideNgxMask()],
})
export class Uploaders extends LibraryCrud {

  // Library:: Mot de passe
  public library_show_pass: boolean = false;
  public library_show_hide_pass() { this.library_show_pass = !this.library_show_pass; }

  // Library:: Constructor
  constructor(
    _library_api: LibraryApi,
    _library_toastr: ToastrService,
    _library_modal: NgbModal,
    _library_modals: LibraryModals,
    _library_pagination: LibraryPagination
  ) {
    super(_library_api, _library_toastr, _library_modals, _library_pagination);
    this.library_path = 'uploaders';
  }

  // Library:: Create Record 
  public library_create_record: Uploader = {} as Uploader;
  public library_init_record() {
    this.library_create_record = {
      id: 0,
      full_name: '',
      email: '',
      phone: '',
      password: '',
      much: 0.00,
      is_active: true,
    };
  }
  get library_create_validate(): boolean {
    return (
      !this.library_create_record.full_name ||
      !this.library_create_record.email ||
      !this.library_create_record.password ||
      //
      !this.library_create_record.much ||
      this.library_create_record.is_active === null || this.library_create_record.is_active === undefined
    );
  }
  public library_publish_btn() {
    this.library_publish_record(this.library_create_record, (newRecord) => {
      console.log('New Record Created:', newRecord);
    });
  }

  // Library:: Edit Record 
  get library_edit_validate(): boolean {
    return (
      !this.library_edit_record.full_name ||
      !this.library_edit_record.email ||
      //
      !this.library_edit_record.much ||
      this.library_edit_record.is_active === null || this.library_edit_record.is_active === undefined
    );
  }
  public library_update_btn() {
    this.library_update_record((updated) => {
      console.log('✅ Updated Record:', updated);
    });
  }

  // Library:: Get Recordes 
  ngOnInit(): void {
    this.library_get_records(() => this.library_loading = false);
  }

}
