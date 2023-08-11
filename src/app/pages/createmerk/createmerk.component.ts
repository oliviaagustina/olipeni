import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerkService } from '../merk/merk.service';
import { CreatemerkService } from '../createmerk/createmerk.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-createmerk',
  templateUrl: './createmerk.component.html',
  styleUrls: ['./createmerk.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreatemerkComponent implements OnInit {
  formCreatemerk: FormGroup;
  dataset: string;

  constructor(
    private _formBuilder: FormBuilder,
    private merkServ: MerkService,
    private _createmerkServ: CreatemerkService,
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _spinnerServ: NgxSpinnerService
  ) {}


  ngOnInit() {
    this.dataset = this._actRoute.snapshot.params['id'];

    this.formCreatemerk = this._formBuilder.group({
      nama_merk: ['', Validators.required],
      id_merk: [''],
    });

    this.getDataDetail();
  }

  getDataDetail() {
    if (this.dataset !== 'add') {
      this.merkServ.MerkRedirectDetail(this.dataset).subscribe(
        (e: any) => {
          this.formCreatemerk.controls['nama_merk'].setValue(e.nama_merk);
        },
        (error) => {
          console.error('Error fetching merk detail:', error);
        }
      );
      this._spinnerServ.hide();
    }
  }

  goBack(): void {
    window.history.back();
  }

  async save() {
    try {
      const formData = this.formCreatemerk.value;
  
      if (this.dataset === 'add') {
        // Create new data
        const createResponse: any = await this._createmerkServ
          .createmerkRedirect(formData)
          // .toPromise();
  
        if (createResponse.token) {
          // await localStorage.setItem('token', createResponse.token);
          await this._router.navigateByUrl('/merk');
        }
      } else {
        // Update existing data
        formData.id_merk = this.dataset; // Assuming 'id_kategori' is the ID field
  
        const updateResponse: any = await this._createmerkServ
          .createmerkRedirect(formData)
          // .toPromise();
  
        if (updateResponse.token) {
          // await localStorage.setItem('token', updateResponse.token);
          await this._router.navigateByUrl('/merk');
        }
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

}
