import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as url from 'src/url';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  constructor(private http: HttpClient) { }

  SeriesRedirect(v)
  {    
      return this.http.get(`${url.urlApi}/series?page=${v}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
      });
  }
  SeriesRedirectDetail(v) {
    return this.http.get(`${url.urlApi}/series/${v}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  createseriesRedirect(data)
  {    
    return new Promise((resolve, reject) =>{
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      this.http.post(url.urlApi + '/series',{data: data},httpOptions).pipe(map(res=>res)).subscribe(data =>{
          resolve(data);
        }, (err)=>{
          reject(err);
        })
    })
  }

  updateSeries(data) {
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      this.http
        .post(url.urlApi + '/series', { data: data }, httpOptions)
        .pipe(map((res) => res))
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  
  deleteSeries(id: number) {
    return this.http.delete(`${url.urlApi}/series/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
}
