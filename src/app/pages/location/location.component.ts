import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from './location.service';
// import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';
// import {  } from './modal-category/modal-category.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LocationComponent implements OnInit {
  formLocation: FormGroup;
  dataLocation = [];
  setValue = {
    Location: '',
  };

  page = 1; // Halaman saat ini
  pageSize = 5; // Jumlah item per halaman
  total = this.dataLocation.length; // Total jumlah data dalam inventory (misalnya, panjang dataInventory)
  from = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _locationServ: LocationService,
    private _modalref: NgbModal,
    private _spinnerServ: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.Location();
    this.formLocation = this._formBuilder.group({
      Location: ['', Validators.required],
    });
  }

  Location() {
    this._locationServ.LocationRedirect(this.page).subscribe(async(x: any) => {
      
        this.dataLocation= this.dataLocation.concat(x.data);
        this.from = x.from;
        this.pageSize = x.perPage;
        this.total = x.total;
        await this._spinnerServ.hide()
      
    });
  }

  deleteLocation(id: number) {
    +this.swalyouSure().then((x) => {
      if (x.isConfirmed) {
        this._locationServ.deleteLocation(id).subscribe((b) => {
          Swal.fire('Saved', '', 'success');
        });
      }
    });
  }

  swalyouSure() {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
  }
}
