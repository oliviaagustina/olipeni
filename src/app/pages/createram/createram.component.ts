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
import { CreateramService } from '../createram/createram.service';
import { RamService } from '../ram/ram.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-createram',
  templateUrl: './createram.component.html',
  styleUrls: ['./createram.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateramComponent implements OnInit {
  formCreateram: FormGroup;
  setValue = {
    Createram: '',
  };

  dataset;
  formram= {
    id: null,
    ram: null,
  };

  constructor(
    private _formBuilder: FormBuilder,
    private ramServ: RamService,
    private _createramServ: CreateramService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _spinnerServ: NgxSpinnerService
  ) {
    this.dataset = this._actRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.formCreateram = this._formBuilder.group({
      nama_ram: ['', Validators.required],
      id_ram: [''],
    });
    this.getDataDetail();
  }

  getDataDetail() {
    if (this.dataset !== 'add') {
      this.ramServ
        .RamRedirectDetail(this.dataset)
        .subscribe((e: any) => {
          this.formCreateram.controls['nama_ram'].setValue(
            e.nama_ram
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
      const formData = this.formCreateram.value;
  
      if (this.dataset === 'add') {
        // Create new data
        const createResponse: any = await this._createramServ
          .CreateramRedirect(formData)
          // .toPromise();
  
        if (createResponse.token) {
          // await localStorage.setItem('token', createResponse.token);
          await this._router.navigateByUrl('/ram');
        }
      } else {
        // Update existing data
        formData.id_ram = this.dataset; // Assuming 'id_kategori' is the ID field
  
        const updateResponse: any = await this._createramServ
          .CreateramRedirect(formData)
          // .toPromise();
  
        if (updateResponse.token) {
          // await localStorage.setItem('token', updateResponse.token);
          await this._router.navigateByUrl('/ram');
        }
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
    }

