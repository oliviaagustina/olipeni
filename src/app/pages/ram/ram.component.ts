import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RamService } from './ram.service';
// import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';
// import {  } from './modal-category/modal-category.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-ram',
  templateUrl: './ram.component.html',
  styleUrls: ['./ram.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RamComponent implements OnInit {
  formRam: FormGroup;
  dataRam = [];
  setValue = {
    Ram: '',
  };

  page = 1; // Halaman saat ini
  pageSize = 5; // Jumlah item per halaman
  total = this.dataRam.length; // Total jumlah data dalam inventory (misalnya, panjang dataInventory)
  // page = 1;
  from = {};
  // pageSize = {};
  // total = {};


  constructor(
    private _formBuilder: FormBuilder,
    private _ramServ: RamService,
    private _modalref: NgbModal,
    private _spinnerServ: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.Ram();
    this.formRam = this._formBuilder.group({
      Ram: ['', Validators.required],
    });
  }

  Ram() {
    this._ramServ.RamRedirect(this.page).subscribe(async(x: any) => {
      
        this.dataRam = this.dataRam.concat(x.data);
        this.from = x.from;
        this.pageSize = x.perPage;
        this.total = x.total;
        await this._spinnerServ.hide()
      
    });
  }
  deleteRam(id: number) {
    +this.swalyouSure().then((x) => {
      if (x.isConfirmed) {
        this._ramServ.deleteRam(id).subscribe((b) => {
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
