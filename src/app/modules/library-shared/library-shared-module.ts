import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//
import { LibraryUpload } from '../../helps/comps/library-upload/library-upload';
//
@NgModule({
  imports: [CommonModule, FormsModule, LibraryUpload],
  exports: [LibraryUpload]
})
export class LibrarySharedModule {}
