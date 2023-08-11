import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from './storage.service';
// import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';
// import {  } from './modal-category/modal-category.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StorageComponent implements OnInit {
  formStorage: FormGroup;
  dataStorage = [];
  setValue = {
    Storage: '',
  };

  page = 1; // Halaman saat ini
  pageSize = 5; // Jumlah item per halaman
  total = this.dataStorage.length; // Total jumlah data dalam inventory (misalnya, panjang dataInventory)
  // page = 1;
  from = {};
  // pageSize = {};
  // total = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _storageServ: StorageService,
    private _modalref: NgbModal,
    private _spinnerServ: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this._spinnerServ.show();
    this.Storage();
    this.formStorage = this._formBuilder.group({
      Storage: ['', Validators.required],
    });
  }

  Storage() {
    this._storageServ.StorageRedirect(this.page).subscribe(async (x: any) => {
        this.dataStorage = this.dataStorage.concat(x.data);
        this.from =  x.from;
        this.pageSize =  x.perPage;
        this.total =  x.total;
        await this._spinnerServ.hide();
      
    });
  }

  deleteStorage(id: number) {
    +this.swalyouSure().then((x) => {
      if (x.isConfirmed) {
        this._storageServ.deleteStorage(id).subscribe((b) => {
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
