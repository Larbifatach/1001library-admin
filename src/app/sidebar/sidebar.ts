import { Component, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// Library:: Packages
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Library:: Services
import { LibraryAuth } from '../services/auth/library-auth';
import { LibraryApi } from '../services/api/library-api';
import { LibraryUpload } from '../helps/comps/library-upload/library-upload';
//
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.scss',
    standalone: true,
    //
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, LibraryUpload],
})
export class Sidebar {

    // Library:: Global Vars & Funcs
    public library_load_btns: boolean = false;
    public library_errors_msg: string = '';
    public library_logout() { this._library_auth.library_logout(); }

    // Library:: Constructor
    constructor(
        private _library_auth: LibraryAuth,
        private _library_api: LibraryApi,
        public router: Router,
        private _library_modal: NgbModal
    ) {}

    // Library:: Toeast
    private library_toastr = inject(ToastrService);
    library_toast_good(library_msg: string) { this.library_toastr.success(library_msg, 'Done!', { closeButton: true }); }

    // Library:: Settings
    library_edit_user : any = {};
    library_modal_settings(template: TemplateRef<any>) {
		this._library_modal.open(template, { size: 'lg' });
        this.library_edit_user = this.library_user;
	}
    library_update_user() {
        this._library_api.library_edit('admin-settings', JSON.parse(JSON.stringify(this.library_edit_user))).subscribe( (response: any) => {
            this.library_user = this.library_edit_user;
            this.library_edit_user = {};
            this.library_toast_good('Profile updated successfully!');
            this._library_modal.dismissAll();
        });
    }

    // Library:: Notifs
    public library_notifs: any = [];
    public library_data_loading = true;
    library_get_notifs() {
        this._library_api.library_get('notifs').subscribe( (response: any) => {
            this.library_notifs = response.body.data;
            this.library_loading = false;
            if(this.library_user.library_notifs != 0){
                this._library_api.library_get('notifs-updates').subscribe();
            }
        });
    }
    library_delete_notifs() {
        this.library_notifs = [];
        this.library_user.notifs_count = 0;
        this.library_toast_good('Notifications deleted successfully!');
        this._library_api.library_delete('notifs-delete').subscribe();
    }
    library_modal_notifs( template: TemplateRef<any>) {
		this._library_modal.open(template, { size: 'lg' });
        this.library_edit_user = this.library_user;
        this.library_get_notifs();
    }

    // Library:: Get User
    public library_user: any = {};
    public library_loading = true;
    library_get_user() {
        this._library_api.library_get('admin').subscribe( (response: any) => {
            this.library_user = response.body.data;
            this.library_loading = false;
        }, err => {
            this._library_auth.library_logout(); 
        });
    }
    ngOnInit(): void {
        this.library_get_user();
    }

}
