import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerkService } from './merk.service';
// import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';
// import {  } from './modal-category/modal-category.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-merk',
  templateUrl: './merk.component.html',
  styleUrls: ['./merk.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MerkComponent implements OnInit {
  formMerk: FormGroup;
  dataMerk = [];
  setValue = {
    Merk: '',
  };

  page = 1; // Halaman saat ini
  pageSize = 5; // Jumlah item per halaman
  total = this.dataMerk.length; // Total jumlah data dalam inventory (misalnya, panjang dataInventory)

  getCurrentPageData(): any[] {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataMerk.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.page = pageNumber;
  }
  // page = 1;
  from = {};
  // pageSize = {};
  // total = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _MerkServ: MerkService,
    private _modalref: NgbModal,
    private _spinnerServ: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.Merk();
    this.formMerk= this._formBuilder.group({
      nama_merk: ['', Validators.required],
    });
  }

  async createMerk() {
    if (this.formMerk.valid) {
      const merkName = this.formMerk.value.Merk;
      
      try {
        const response: any = await this._MerkServ.MerkRedirect({ name: merkName }).toPromise();
        Swal.fire('Success', 'Merk created successfully!', 'success');
        this.formMerk.reset();
      } catch (error) {
        Swal.fire('Error', 'An error occurred while creating merk.', 'error');
      }
    }
  }
  

  Merk() {
    this._MerkServ.MerkRedirect(this.page).subscribe(async(x: any) => {
     
        this.dataMerk= this.dataMerk.concat(x.data);
        this.from = x.from;
        this.pageSize = x.perPage;
        this.total = x.total;
        await this._spinnerServ.hide()
      
    });
  }

  deleteMerk(id: number) {
    +this.swalyouSure().then((x) => {
      if (x.isConfirmed) {
        this._MerkServ.deleteMerk(id).subscribe((b) => {
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
