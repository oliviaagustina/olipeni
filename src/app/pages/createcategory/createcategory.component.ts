import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category/category.service';
import { CreatecategoryService } from '../createcategory/createcategory.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.component.html',
  styleUrls: ['./createcategory.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreatecategoryComponent implements OnInit {
  formCreatecategory: FormGroup;
  setValue = {
    Createcategory: '',
  };

  dataset;
  formcategory = {
    id: null,
    category: null,
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _categoryServ: CategoryService,
    private _createcategoryServ : CreatecategoryService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _spinnerServ: NgxSpinnerService
  ) {
    this.dataset = this._actRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.formCreatecategory = this._formBuilder.group({
      nama_kategori: ['', Validators.required],
      id_kategori: [''],
    });
    this.getDataDetail();
  }

  getDataDetail() {
    if (this.dataset !== 'add') {
      this._categoryServ
        .CategoryRedirectDetail(this.dataset)
        .subscribe((e: any) => {
          this.formCreatecategory.controls['nama_kategori'].setValue(
            e.nama_kategori
          );
        });
      this._spinnerServ.hide();
    }
  }

  goBack(): void {
    window.history.back();
  }

  async save() {
    try {
      const formData = this.formCreatecategory.value;
  
      if (this.dataset === 'add') {
        // Create new data
        const createResponse: any = await this._createcategoryServ
          .createcategoryRedirect(formData)
          // .toPromise();
  
        if (createResponse.token) {
          // await localStorage.setItem('token', createResponse.token);
          await this._router.navigateByUrl('/category');
        }
      } else {
        // Update existing data
        formData.id_kategori = this.dataset; // Assuming 'id_kategori' is the ID field
  
        const updateResponse: any = await this._createcategoryServ
          .createcategoryRedirect(formData)
          // .toPromise();
  
        if (updateResponse.token) {
          // await localStorage.setItem('token', updateResponse.token);
          await this._router.navigateByUrl('/category');
        }
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
  

    }

