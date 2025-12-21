import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Library:: Services
import { LibraryUp } from '../../../services/api/library-up';
// Library:: Packages
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
//
@Component({
  selector: 'library-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxEditorModule],
  templateUrl: './library-editor.html'
})
export class LibraryEditor implements OnInit, OnDestroy {

  // Library :: Constructor
  constructor(private _library_up: LibraryUp) {}

  // Library:: Input
  @Input() library_content: any = '';

  // Library:: Output
  @Output() library_changed = new EventEmitter<string>();

  // Library:: Global Vars
  library_editor!: Editor;
  library_toolbar: Toolbar = [
    [{ heading: ['h1', 'h2', 'h3'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['undo', 'redo']
  ];

  // Library :: Upload Image
  library_file_trigger(library_file_input: HTMLInputElement) { library_file_input.click(); }
  library_file_selected(event: any) {
    const library_file = event.target.files[0];
    if (!library_file) return;
    this._library_up.library_upload(library_file, 'image_url').subscribe((library_res: any) => {
      if (library_res?.image_url) {
        const { schema, view } = this.library_editor;
        const library_node = schema.nodes['image'].create({ src: library_res.image_url, alt: 'Library' });
        const library_transaction = view.state.tr.replaceSelectionWith(library_node).scrollIntoView();
        view.dispatch(library_transaction);
      }
    });
  }

  // Library:: Global Methods
  ngOnInit() { this.library_editor = new Editor(); }
  ngOnDestroy() { this.library_editor.destroy(); }

}
