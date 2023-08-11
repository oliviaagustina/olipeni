import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as url from 'src/url';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MerkService {

  constructor(private http: HttpClient) { }

  MerkRedirect(v)
  {    
      return this.http.get(`${url.urlApi}/merk?page=${v}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
      });
  }

  MerkRedirectDetail(v) {
    return this.http.get(`${url.urlApi}/merk/${v}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  createmerkRedirect(data)
  {    
    return new Promise((resolve, reject) =>{
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      this.http.post(url.urlApi + '/merk',{data: data},httpOptions).pipe(map(res=>res)).subscribe(data =>{
          resolve(data);
        }, (err)=>{
          reject(err);
        })
    })
  }

  updateMerk(data)
  {    
    return new Promise((resolve, reject) =>{
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      this.http.post(url.urlApi + '/merk',{data: data},httpOptions).pipe(map(res=>res)).subscribe(data =>{
          resolve(data);
        }, (err)=>{
          reject(err);
        })
    })
  }

  deleteMerk(id: number) {
    return this.http.delete(`${url.urlApi}/merk/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
}
