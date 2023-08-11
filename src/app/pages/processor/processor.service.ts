import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as url from 'src/url';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProcessorService {

  constructor(private http: HttpClient) { }

  ProcessorRedirect(v)
  {    
      return this.http.get(`${url.urlApi}/prosesor?page=${v}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
      });
  }

  ProcessorRedirectDetail(v) {
    return this.http.get(`${url.urlApi}/prosesor/${v}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  createprocessorRedirect(data)
  {    
    return new Promise((resolve, reject) =>{
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      this.http.post(url.urlApi + '/prosesor',{data: data},httpOptions).pipe(map(res=>res)).subscribe(data =>{
          resolve(data);
        }, (err)=>{
          reject(err);
        })
    })
  }

  updateProcessor(data)
  {    
    return new Promise((resolve, reject) =>{
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      this.http.post(url.urlApi + '/prosesor',{data: data},httpOptions).pipe(map(res=>res)).subscribe(data =>{
          resolve(data);
        }, (err)=>{
          reject(err);
        })
    })
  }
  deleteProcessor(id: number) {
    return this.http.delete(`${url.urlApi}/merk/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
}
