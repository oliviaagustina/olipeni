import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as url from 'src/url';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CreateseriesService {
  constructor(private http: HttpClient) {}

  SeriesRedirect(val) {
    console.log(val);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    console.log(url.urlApi);
    this.http
      .get(url.urlApi + '/series', httpOptions)
      .pipe(map((res) => res))
      .subscribe((data) => {});
  }

  CreateseriesRedirect(data)
  {    
    return new Promise((resolve, reject) =>{
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        })
      };
      this.http.post(url.urlApi + '/series',{data: data},httpOptions).pipe(map(res=>res)).subscribe(data =>{
          resolve(data);
        }, (err)=>{
          reject(err);
        })
    })
  }
}

