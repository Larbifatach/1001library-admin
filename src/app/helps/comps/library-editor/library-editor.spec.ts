import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LibraryUp } from '../../../services/api/library-up';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'library-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, CKEditorModule],
  templateUrl: './library-editor.html'
})
export class LibraryEditor {
  @Input() content: string = '';
  @Output() contentChange = new EventEmitter<string>();

  public Editor = ClassicEditor.default;
  public editorConfig: any;

  constructor(private _library_up: LibraryUp) {
    this.editorConfig = {
      placeholder: 'Écrivez votre article ici...',
      toolbar: [
        'undo', 'redo', '|',
        'heading', '|',
        'bold', 'italic', 'underline', 'strikethrough', '|',
        'link', 'blockQuote', '|',
        'bulletedList', 'numberedList', '|',
        'insertTable', 'imageUpload'
      ],
      extraPlugins: [ this.libraryCustomUploadAdapterPlugin.bind(this) ]
    };
  }

  libraryCustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new LibraryCkeditorUploadAdapter(loader, this._library_up);
    };
  }

  onReady(editor: any) {
    editor.model.document.on('change:data', () => {
      this.contentChange.emit(editor.getData());
    });
  }
}

class LibraryCkeditorUploadAdapter {
  constructor(private loader: any, private _library_up: LibraryUp) {}

  upload() {
    return this.loader.file
      .then((file: File) => {
        return new Promise((resolve, reject) => {
          this._library_up.library_upload(file, 'image_url').subscribe({
            next: (res: any) => resolve({ default: res.image_url }),
            error: err => reject(err)
          });
        });
      });
  }

  abort() {}
}
