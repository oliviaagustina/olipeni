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
import { StorageService } from '../storage/storage.service';
import { CreatestorageService } from '../createstorage/createstorage.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-createstorage',
  templateUrl: './createstorage.component.html',
  styleUrls: ['./createstorage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreatestorageComponent implements OnInit {
  formCreatestorage: FormGroup;
  setValue = {
    Createstorage: '',
  };

  dataset;
  formstorage = {
    id: null,
    storage: null,
  };

  constructor(
    private _formBuilder: FormBuilder,
    private storageServ: StorageService,
    private _createstorageServ: CreatestorageService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _spinnerServ: NgxSpinnerService
  ) {
    this.dataset = this._actRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.formCreatestorage = this._formBuilder.group({
      nama_storage: ['', Validators.required],
      id_storage: [''],
    });
    this.getDataDetail();
  }

  getDataDetail() {
    if (this.dataset !== 'add') {
      this.storageServ
        .StorageRedirectDetail(this.dataset)
        .subscribe((e: any) => {
          this.formCreatestorage.controls['storage_name'].setValue(
            e.nama_storage
          );
        });
      this._spinnerServ.hide();
    }
  }

  createData() {
    if (this.dataset == 'add') {
      this.storageServ
        .StorageRedirect(this.dataset)
        .subscribe((e: any) => {
          this.formCreatestorage.controls['storage_name'].setValue(
            e.nama_storage
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
      const formData = this.formCreatestorage.value;
  
      if (this.dataset === 'add') {
        // Create new data
        const createResponse: any = await this._createstorageServ
          .createstorageRedirect(formData)
          // .toPromise();
  
        if (createResponse.token) {
          // await localStorage.setItem('token', createResponse.token);
          await this._router.navigateByUrl('/storage');
        }
      } else {
        // Update existing data
        formData.id_storage = this.dataset; // Assuming 'id_kategori' is the ID field
  
        const updateResponse: any = await this._createstorageServ
          .createstorageRedirect(formData)
          // .toPromise();
  
        if (updateResponse.token) {
          // await localStorage.setItem('token', updateResponse.token);
          await this._router.navigateByUrl('/storage');
        }
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

}
