import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Route, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  constructor(
    private splashServ: NgxSpinnerService,
    private _router: Router,
    private _loginServ: LoginService
  ) {}

  ngOnInit(): void {
    this.splashServ.show();
    this.checkToken();
    // setTimeout(() => {
    //   this.splashServ.hide();
    // }, 3000);
  }

  async checkToken() {
    let token = localStorage.getItem('token');
    if (token) {
      this._loginServ.getMe(token).subscribe(async (v: any) => {
        if (v.user) {
          await this.splashServ.hide();
          await this._router.navigateByUrl('/dashboard');
        }
      });
      // this._router.navigateByUrl('/dashboard');
    } else {
      this._router.navigateByUrl('/login');
    }
  }
}
