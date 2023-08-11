import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcessorService } from './processor.service';
// import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';
// import {  } from './modal-category/modal-category.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProcessorComponent implements OnInit {
  formProcessor: FormGroup;
  dataProsesor = [];
  setValue = {
    Processor: '',
  };

  page = 1; // Halaman saat ini
  pageSize = 5; // Jumlah item per halaman
  total = this.dataProsesor.length; // Total jumlah data dalam inventory (misalnya, panjang dataInventory)

  getCurrentPageData(): any[] {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataProsesor.slice(startIndex, endIndex);
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
    private _processorServ: ProcessorService,
    private _modalref: NgbModal,
    private _spinnerServ: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.Processor();
    this.formProcessor = this._formBuilder.group({
      Processor: ['', Validators.required],
    });
  }

  Processor() {
    this._processorServ.ProcessorRedirect(this.page).subscribe(async(x: any) => {
      
        this.dataProsesor = this.dataProsesor.concat(x.data);
        this.from = x.from;
        this.pageSize = x.perPage;
        this.total = x.total;
        await this._spinnerServ.hide()
      
    });
  }

  deleteProcessor(id: number) {
    +this.swalyouSure().then((x) => {
      if (x.isConfirmed) {
        this._processorServ.deleteProcessor(id).subscribe((b) => {
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
