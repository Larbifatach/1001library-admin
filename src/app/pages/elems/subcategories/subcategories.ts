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
import { LibrarySelects } from '../../../helps/comps/library-selects/library-selects';
import { LibraryDeletes} from '../../../helps/comps/library-deletes/library-deletes';
import { LibraryNums } from '../../../helps/comps/library-nums/library-nums';
import { LibraryTables } from '../../../helps/comps/library-tables/library-tables';
// Library:: Interfaces
import { SubCategory } from '../../../modules/library-interfaces';
// Library:: Packages
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
//
@Component({
  selector: 'library-subcategories',
  templateUrl: './subcategories.html',
  styleUrl: './subcategories.scss',
  //
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, LibrarySelects, NgbTooltipModule, LibraryDeletes, LibraryNums,  LibraryTables],
})
export class Subcategories extends LibraryCrud {

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
    this.library_path = 'subcategories';
  }

  // Library:: Create Record 
  public library_create_record: SubCategory = {} as SubCategory;
  public library_init_record() {
    this.library_create_record = {
      id: 0,
      name_en: '',
      name_fr: '',
      name_ar: '',
      id_category: null,
    };
  }
  public library_publish_btn() {
    this.library_publish_record(this.library_create_record, (newRecord) => {
      console.log('New record created:', newRecord);
    });
  }

  // Library:: Edit Record 
  public library_categories_preload: any[] = [];
  public override library_modal_edit(template: any, data: any, index: number, size: 'sm' | 'lg' | 'xl' = 'lg') {
    super.library_modal_edit(template, data, index, size);
    this.library_edit_record.id_category = data.category?.id ?? null;
    this.library_categories_preload = data.category ? [data.category] : [];
  }
  public library_update_btn() {
    this.library_update_record((updated) => {
      console.log('✅ Updated Record:', updated);
    });
  }

  // Library:: Get Recordes 
  public library_categories: any = [];
  ngOnInit(): void {
    this.library_get_records(() => this.library_loading = false);
  }

}
