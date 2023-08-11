import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeriesService } from './series.service';
// import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';
// import {  } from './modal-category/modal-category.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SeriesComponent implements OnInit {
  formSeries: FormGroup;
  dataSeries = [];
  setValue = {
    Series: '',
  };

  page = 1; // Halaman saat ini
  pageSize = 5; // Jumlah item per halaman
  total = this.dataSeries.length; // Total jumlah data dalam inventory (misalnya, panjang dataInventory)
  from = {};

  // getCurrentPageData(): any[] {
  //   const startIndex = (this.page - 1) * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   return this.dataSeries.slice(startIndex, endIndex);
  // }

  // onPageChange(pageNumber: number): void {
  //   this.page = pageNumber;
  // }

  constructor(
    private _formBuilder: FormBuilder,
    private _seriesServ: SeriesService,
    private _modalref: NgbModal,
    private _spinnerServ: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.Series();
    this._spinnerServ.show();
    this.formSeries = this._formBuilder.group({
      Series: ['', Validators.required],
    });
  }

  Series() {
    this._seriesServ.SeriesRedirect(this.page).subscribe(async(x: any) => {
        this.dataSeries =  this.dataSeries.concat(x.data);
        this.from =  x.from;
        this.pageSize =  x.perPage;
        this.total =  x.total;
        await this._spinnerServ.hide()
    });
  }
  deleteSeries(id: number) {
    +this.swalyouSure().then((x) => {
      if (x.isConfirmed) {
        this._seriesServ.deleteSeries(id).subscribe((b) => {
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
