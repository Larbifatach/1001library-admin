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
import { LibraryCards } from '../../../helps/comps/library-cards/library-cards';
// Library:: Packages
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
//
@Component({
  selector: 'library-books',
  templateUrl: './books.html',
  styleUrl: './books.scss',
  //
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgbTooltipModule, LibraryDeletes, LibraryNums,  LibraryCards],
})
export class Books extends LibraryCrud {

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
    this.library_path = 'books';
  }

  // Library:: Edit Record 
  public library_quick_btn() {
    this.library_quick_record((updated) => {
      console.log('✅ Updated Record:', updated);
    });
  }

  // Library:: Get Recordes 
  ngOnInit(): void {
    this.library_get_records(() => this.library_loading = false);
  }

}
