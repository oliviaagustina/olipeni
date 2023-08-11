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
import { LocationService } from '../location/location.service';
import { CreatelocationService } from '../createlocation/createlocation.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-createlocation',
  templateUrl: './createlocation.component.html',
  styleUrls: ['./createlocation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreatelocationComponent implements OnInit {
  formCreatelocation: FormGroup;
  setValue = {
    Createlocation: '',
  };

  dataset;
  formlocation= {
    id: null,
    lokasi: null,
  };

  constructor(
    private _formBuilder: FormBuilder,
    private locationServ: LocationService,
    private _createlocationServ: CreatelocationService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _spinnerServ: NgxSpinnerService
  ) {
    this.dataset = this._actRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.formCreatelocation = this._formBuilder.group({
      nama_lokasi: ['', Validators.required],
      id_lokasi: [''],
    });
    this.getDataDetail();
  }

  getDataDetail() {
    if (this.dataset !== 'add') {
      this.locationServ
        .LocationRedirectDetail(this.dataset)
        .subscribe((e: any) => {
          this.formCreatelocation.controls['nama_lokasi'].setValue(
            e.nama_lokasi
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
      const formData = this.formCreatelocation.value;
  
      if (this.dataset === 'add') {
        // Create new data
        const createResponse: any = await this._createlocationServ
          .createlocationRedirect(formData)
          // .toPromise();
  
        if (createResponse.token) {
          // await localStorage.setItem('token', createResponse.token);
          await this._router.navigateByUrl('/lokasi');
        }
      } else {
        // Update existing data
        formData.id_lokasi = this.dataset; // Assuming 'id_kategori' is the ID field
  
        const updateResponse: any = await this._createlocationServ
          .createlocationRedirect(formData)
          // .toPromise();
  
        if (updateResponse.token) {
          // await localStorage.setItem('token', updateResponse.token);
          await this._router.navigateByUrl('/lokasi');
        }
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
    }
//   }
// }
