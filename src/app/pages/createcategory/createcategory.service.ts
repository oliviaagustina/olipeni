import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as url from 'src/url';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CreatecategoryService {
  constructor(private http: HttpClient) {}

  CategoryRedirectDetail(val) {
    console.log(val);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    console.log(url.urlApi);
    this.http
      .get(url.urlApi + '/category', httpOptions)
      .pipe(map((res) => res))
      .subscribe((data) => {});
  }

  createcategoryRedirect(data)
  {    
    return new Promise((resolve, reject) =>{
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        })
      };
      this.http.post(url.urlApi + '/category',{data: data},httpOptions).pipe(map(res=>res)).subscribe(data =>{
          resolve(data);
        }, (err)=>{
          reject(err);
        })
    })
  }

}
