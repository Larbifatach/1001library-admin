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
import { LibraryTables } from '../../../helps/comps/library-tables/library-tables';
// Library:: Packages
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
//
@Component({
  selector: 'library-contacts',
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
  //
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgbTooltipModule, LibraryNums, LibraryTables],
})
export class Contacts extends LibraryCrud {

  // Library:: Constructor
  constructor(
    _library_api: LibraryApi,
    _library_toastr: ToastrService,
    _library_modal: NgbModal,
    _library_modals: LibraryModals,
    _library_pagination: LibraryPagination
  ) {
    super(_library_api, _library_toastr, _library_modals, _library_pagination);
    this.library_path = 'contacts';
  }

  // Library:: Get Recordes 
  ngOnInit(): void {
    this.library_get_records(() => this.library_loading = false);
  }

}
