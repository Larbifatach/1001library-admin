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
import { LibraryDeletes} from '../../../helps/comps/library-deletes/library-deletes';
import { LibraryNums } from '../../../helps/comps/library-nums/library-nums';
import { LibraryTables } from '../../../helps/comps/library-tables/library-tables';
import { LibraryUpload } from '../../../helps/comps/library-upload/library-upload';
// Library:: Interfaces
import { Author } from '../../../modules/library-interfaces';
// Library:: Packages
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
//
@Component({
  selector: 'library-authors',
  templateUrl: './authors.html',
  styleUrl: './authors.scss',
  //
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgbTooltipModule, LibraryDeletes, LibraryNums, LibraryTables, LibraryUpload],
})
export class Authors extends LibraryCrud {

  // Library:: Global Vars & Funcs
  public library_to_slug(value: string): string { 
    return value.toLowerCase().replace(/[\s\W-]+/g, '-') .replace(/^-+|-+$/g, '');
  }

  // Library:: Constructor
  constructor(
    _library_api: LibraryApi,
    _library_toastr: ToastrService,
    _library_modal: NgbModal,
    _library_modals: LibraryModals,
    _library_pagination: LibraryPagination
  ) {
    super(_library_api, _library_toastr, _library_modals, _library_pagination);
    this.library_path = 'authors';
  }

  // Library:: Create Record 
  public library_create_record: Author = {} as Author;
  public library_init_record() {
    this.library_create_record = {
      id: 0,
      name_en: '',
      name_fr: '',
      name_ar: '',
      description_en: '',
      description_fr: '',
      description_ar: '',
      avatar_url: '',
    };
  }
  public library_publish_btn() {
    this.library_publish_record(this.library_create_record, (newRecord) => {
      console.log('New record created:', newRecord);
    });
  }

  // Library:: Edit Record 
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
