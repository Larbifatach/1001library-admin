import { Injectable, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
//
@Injectable({ providedIn: 'root' })
export class LibraryModals {

  // Library:: Input
  private library_modal_ref?: NgbModalRef;

  // Library:: Constructor
  constructor(private library_modal: NgbModal) {}

  // Library:: Methods
  library_open(template: TemplateRef<any>, size: 'sm' | 'lg' | 'xl' = 'lg') { this.library_modal_ref = this.library_modal.open(template, { size }); }
  library_close() { if (this.library_modal_ref) { this.library_modal_ref.close(); this.library_modal_ref = undefined; } }
  library_close_all() { this.library_modal.dismissAll(); }

}
