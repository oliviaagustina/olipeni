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
import { ProcessorService } from '../processor/processor.service';
import { CreateprocessorService } from '../createprocessor/createprocessor.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-createprocessor',
  templateUrl: './createprocessor.component.html',
  styleUrls: ['./createprocessor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateprocessorComponent implements OnInit {
  formCreateprocessor: FormGroup;
  setValue = {
    Createprocessor: '',
  };

  dataset;
  formprocessor= {
    id: null,
    processor: null,
  };

  constructor(
    private _formBuilder: FormBuilder,
    private processorServ: ProcessorService,
    private _createprocessorServ: CreateprocessorService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _spinnerServ: NgxSpinnerService
  ) {
    this.dataset = this._actRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.formCreateprocessor = this._formBuilder.group({
      nama_prosesor: ['', Validators.required],
      id_prosesor: [''],
    });
    this.getDataDetail();
  }

  getDataDetail() {
    if (this.dataset !== 'add') {
      this.processorServ
        .ProcessorRedirectDetail(this.dataset)
        .subscribe((e: any) => {
          this.formCreateprocessor.controls['nama_prosesor'].setValue(
            e.nama_prosesor
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
      const formData = this.formCreateprocessor.value;
  
      if (this.dataset === 'add') {
        // Create new data
        const createResponse: any = await this._createprocessorServ
          .CreateprocessorRedirect(formData)
          // .toPromise();
  
        if (createResponse.token) {
          // await localStorage.setItem('token', createResponse.token);
          await this._router.navigateByUrl('/prosesor');
        }
      } else {
        // Update existing data
        formData.id_prosesor = this.dataset; // Assuming 'id_kategori' is the ID field
  
        const updateResponse: any = await this._createprocessorServ
          .CreateprocessorRedirect(formData)
          // .toPromise();
  
        if (updateResponse.token) {
          // await localStorage.setItem('token', updateResponse.token);
          await this._router.navigateByUrl('/prosesor');
        }
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

 
    }
//   }
// }
