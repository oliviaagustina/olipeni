import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from './inventory.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  formInventory: FormGroup;
  dataInventory = [];
  setValue = {
    inventory: '',
  };

  currentPage: number = 1;
  itemsPerPage: number = 10; // Jumlah item per halaman
  totalItems: number; // Total jumlah item dari data Anda


  inventoryItems: any[] = [];
  page = '';
  pageSize = 5;
  total = 0; // Jumlah total data dalam inventory
  from: any = {}; // Inisialisasi dari object

  constructor(
    private _formBuilder: FormBuilder,
    private _InventoryServ: InventoryService,
    private _modalref: NgbModal,
    private _spinnerServ: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.Inventory();
    this.formInventory = this._formBuilder.group({
      inventory: ['', Validators.required],
    });
  }

  getItemsForCurrentPage(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.dataInventory.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.Inventory();
    }
  }
  
  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  Inventory() {
    this._InventoryServ.inventoryRedirect(this.page).subscribe(async (x: any) => {
      this.dataInventory = this.dataInventory.concat(x.data);
      this.from = x.from;
      this.pageSize = x.perPage;
      this.total = x.total;
      this.currentPage = x.pageSize;
      await this._spinnerServ.hide();
    });
  }

  deleteInventory(id: number) {
    this.swalyouSure().then((result) => {
      if (result.isConfirmed) {
        this._InventoryServ.deleteInventory(id).subscribe(() => {
          this.Inventory();
          Swal.fire('Deleted', '', 'success');
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

  getInventory() {
  
    this._InventoryServ.getInventoryPage(this.currentPage).subscribe(
      (response: any) => {
        this.dataInventory = response.data;
        this.totalItems = response.total;
        this.from = response.from;
        this.pageSize = response.perPage;
        this.total = response.total;
  
      },
      (error) => {
        console.error('Error fetching inventory:', error);
      
      }
    );
  }
  
}
