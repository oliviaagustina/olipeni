import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as url from 'src/url';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loginRedirect(val): Observable<any> {
    return this.http.post(`${url.urlApi}/login`, val);
  }

  getMe(val) {
    return this.http.get(`${url.urlApi}/me`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
}
