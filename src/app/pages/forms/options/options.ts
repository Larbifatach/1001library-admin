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
// Library:: Packages
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
//
@Component({
  selector: 'library-options',
  templateUrl: './options.html',
  styleUrl: './options.scss',
  //
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgbTooltipModule],
})
export class Options extends LibraryCrud {

  // Library:: Constructor
  constructor(
    _library_api: LibraryApi,
    _library_toastr: ToastrService,
    _library_modal: NgbModal,
    _library_modals: LibraryModals,
    _library_pagination: LibraryPagination
  ) {
    super(_library_api, _library_toastr, _library_modals, _library_pagination);
    this.library_path = 'options';
  }
  
  // Library:: Valid Edit 
  public library_valid(): boolean {
    if (!this.library_edit_record.value || typeof this.library_edit_record.value !== 'object') {
      this.library_edit_record.value = {};
    }
    const library_v = this.library_edit_record.value;
    return Object.values(library_v).some((library_val: any) => {
      if (library_val === null || library_val === undefined) return true;
      return !String(library_val).trim();
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
    this.library_pagination = null as any;
    this.library_get_records(() => this.library_loading = false);
  }

}
