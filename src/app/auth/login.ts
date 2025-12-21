import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Library:: Services
import { LibraryLogin } from '../services/auth/library-login';
import { LibraryAuth } from '../services/auth/library-auth';
//
@Component({
  selector: 'library-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  //
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
})
export class Login {

  // Library:: Global Vars & Funcs
  public library__frm: FormGroup;
  public library__frm_show: boolean = false;
  public library__show_error: boolean = false;
  public library__loading_btns: boolean = false;
  protected library_recaptcha: any;

  // Library:: Constructor
  constructor(
    private _library_fb: FormBuilder,
    private _library_login: LibraryLogin,
    private _library_auth: LibraryAuth,
    private router: Router
  ) {
    this.library__frm = this._library_fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    if(this._library_auth.library_is_logged()){ this.router.navigate(['/dashboard']); } else{ this.library__frm_show = true }
  }

  // Library:: Mot de passe
  public library_show_pass: boolean = false;
  public library_show_hide_pass() { this.library_show_pass = !this.library_show_pass; }

  // Library:: Login
  library_form_submit() {
    if (this.library__frm.invalid) return;
    this.library__loading_btns = true;
    this.library__show_error = false;
    //
    const { email, password } = this.library__frm.value;
    this._library_login.library_login(email, password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.library__show_error = false;
        window.location.reload();
      },
      error: (err) => {
        this.library__show_error = true;
        this.library__loading_btns = false;
      }
    });
  }

}
