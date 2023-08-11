import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as url from 'src/url';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private http: HttpClient) {}

  StorageRedirect(v) {
    return this.http.get(`${url.urlApi}/storage?page=${v}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  StorageRedirectDetail(v) {
    return this.http.get(`${url.urlApi}/storage/${v}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  createStorage(data)
  {    
    return new Promise((resolve, reject) =>{
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      this.http.post(url.urlApi + '/storage',{data: data},httpOptions).pipe(map(res=>res)).subscribe(data =>{
          resolve(data);
        }, (err)=>{
          reject(err);
        })
    })
  }

  updateStorage(data) {
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      this.http
        .post(url.urlApi + '/storage', { data: data }, httpOptions)
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

  deleteStorage(id: number) {
    return this.http.delete(`${url.urlApi}/storage/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
}
