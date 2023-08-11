import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as url from 'src/url';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CreateramService {
  constructor(private http: HttpClient) {}

  RamRedirectDetail(val) {
    console.log(val);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    console.log(url.urlApi);
    this.http
      .get(url.urlApi + '/ram', httpOptions)
      .pipe(map((res) => res))
      .subscribe((data) => {});
  }

  CreateramRedirect(data)
  {    
    return new Promise((resolve, reject) =>{
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        })
      };
      this.http.post(url.urlApi + '/ram',{data: data},httpOptions).pipe(map(res=>res)).subscribe(data =>{
          resolve(data);
        }, (err)=>{
          reject(err);
        })
    })
  }

  
}

