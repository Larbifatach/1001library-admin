import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorBlockModule } from 'ngx-color/block';
//
@Component({
  selector: 'library-color',
  standalone: true,
  imports: [CommonModule, ColorBlockModule],
  templateUrl: './library-color.html',
})
export class LibraryColor {

  // Library:: Input
  @Input() library_color: string = '#B5A3A3';
  @Input() library_w_colors: boolean = false;

  // Library:: Output
  @Output() library_changed = new EventEmitter<string>();

  // Library:: Colors
  library_colors = [
    '#2ccce4', '#4A90E2', '#50E3C2', '#B8E986', '#F8E71C',
    '#FF8A65', '#D0021B', '#8B572A', '#7ED321', '#417505',
    '#BD10E0', '#9013FE', '#4A4A4A', '#9B9B9B', '#FFFFFF',
    '#F59A9F', '#E58F6E', '#AC6A40', '#330600', '#fdf762'
  ];

  // Library:: Global Vars
  public library_show = false;

  // Library:: Global Methods
  library_tgle() { this.library_show = !this.library_show; }
  library_onclr(event: any) { this.library_changed.emit(event.color.hex); this.library_show = false; }
  
}
