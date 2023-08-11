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
import { SeriesService } from '../series/series.service';
import { CreateseriesService } from '../createseries/createseries.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreatecategoryService } from '../createcategory/createcategory.service';

@Component({
  selector: 'app-createseries',
  templateUrl: './createseries.component.html',
  styleUrls: ['./createseries.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateseriesComponent implements OnInit {
  formCreateseries: FormGroup;
  setValue = {
    Createseries: '',
  };

  dataset;
  formseries= {
    id: null,
    storage: null,
  };

  constructor(
    private _formBuilder: FormBuilder,
    private seriesServ: SeriesService,
    private _createseriesServ : CreateseriesService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _spinnerServ: NgxSpinnerService
  ) {
    this.dataset = this._actRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.formCreateseries = this._formBuilder.group({
      nama_series: ['', Validators.required],
      id_series: [''],
    });
    this.getDataDetail();
  }

  getDataDetail() {
    if (this.dataset !== 'add') {
      this.seriesServ
        .SeriesRedirectDetail(this.dataset)
        .subscribe((e: any) => {
          this.formCreateseries.controls['series_name'].setValue(
            e.nama_series
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
      const formData = this.formCreateseries.value;
  
      if (this.dataset === 'add') {
        // Create new data
        const createResponse: any = await this._createseriesServ
          .CreateseriesRedirect(formData)
          // .toPromise();
  
        if (createResponse.token) {
          // await localStorage.setItem('token', createResponse.token);
          await this._router.navigateByUrl('/series');
        }
      } else {
        // Update existing data
        formData.id_series = this.dataset; // Assuming 'id_kategori' is the ID field
  
        const updateResponse: any = await this._createseriesServ
          .CreateseriesRedirect(formData)
          // .toPromise();
  
        if (updateResponse.token) {
          // await localStorage.setItem('token', updateResponse.token);
          await this._router.navigateByUrl('/series');
        }
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
    }

