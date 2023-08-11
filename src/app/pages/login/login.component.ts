import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  setValue = {
    email: '',
    password: '',
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _loginServ: LoginService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signIn() {
    // console.log(this.loginForm);
    this._loginServ.loginRedirect(this.loginForm.value).subscribe(async (v) => {
      if (v.token) {
        await localStorage.setItem('token', v.token);
        await this._router.navigateByUrl('dashboard');
      }
    });
  }
}
