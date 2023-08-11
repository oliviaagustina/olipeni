import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as url from 'src/url';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class RamService {

  constructor(private http: HttpClient) { }

  RamRedirect(v)
  {    
      return this.http.get(`${url.urlApi}/ram?page=${v}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
      });
  }

  RamRedirectDetail(v) {
    return this.http.get(`${url.urlApi}/ram/${v}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  createramRedirect(data)
  {    
    return new Promise((resolve, reject) =>{
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      this.http.post(url.urlApi + '/ram',{data: data},httpOptions).pipe(map(res=>res)).subscribe(data =>{
          resolve(data);
        }, (err)=>{
          reject(err);
        })
    })
  }

  updateRam(data) {
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      this.http
        .post(url.urlApi + '/ram', { data: data }, httpOptions)
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

  deleteRam(id: number) {
    return this.http.delete(`${url.urlApi}/ram/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
}
