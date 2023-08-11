import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from './category.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryComponent implements OnInit {
  formCategory: FormGroup;
  dataCategory = [];
  setValue = {
    Category: '',
  };

  page = 1; // Halaman saat ini
  pageSize = 5; // Jumlah item per halaman
  total = this.dataCategory.length; // Total jumlah data dalam inventory (misalnya, panjang dataInventory)
  from = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _categoryServ: CategoryService,
    private _modalref: NgbModal,
    private _spinnerServ: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.Category();
    this.formCategory = this._formBuilder.group({
      Category: ['', Validators.required],
    });
  }

  Category() {
    this._categoryServ.CategoryRedirect(this.page).subscribe(async(x: any) => {
      
        this.dataCategory= this.dataCategory.concat(x.data);
        this.from = x.from;
        this.pageSize = x.perPage;
        this.total = x.total;
        await this._spinnerServ.hide()
      
    });
  }

  deleteCategory(id: number) {
    +this.swalyouSure().then((x) => {
      if (x.isConfirmed) {
        this._categoryServ.deleteCategory(id).subscribe((b) => {
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
