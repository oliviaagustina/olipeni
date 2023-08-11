import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as url from 'src/url';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DetailinventoryService {
  constructor(private http: HttpClient) {}

  DetailinventoryRedirect(val) {
    console.log(val);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    console.log(url.urlApi);
    this.http
      .get(url.urlApi + '/inventory', httpOptions)
      .pipe(map((res) => res))
      .subscribe((data) => {});
  }
}
