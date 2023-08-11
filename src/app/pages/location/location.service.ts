import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as url from 'src/url';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  LocationRedirect(v) {
    return this.http.get(`${url.urlApi}/lokasi?page=${v}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  LocationRedirectDetail(v) {
    return this.http.get(`${url.urlApi}/lokasi/${v}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  createlocationRedirect(data) {
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      this.http
        .post(url.urlApi + '/lokasi', { data: data }, httpOptions)
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

  updateLocation(data) {
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      this.http
        .post(url.urlApi + '/lokasi', { data: data }, httpOptions)
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

  deleteLocation(id: number) {
    return this.http.delete(`${url.urlApi}/lokasi/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
}
