import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//
import { ColorBlockModule } from 'ngx-color/block';
//
@NgModule({
  imports: [CommonModule, FormsModule, ColorBlockModule],
  exports: [ColorBlockModule]
})
export class LibraryColorModule {}
