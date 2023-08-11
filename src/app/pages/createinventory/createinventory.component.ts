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
import { InventoryService } from '../inventory/inventory.service';
import { CreateinventoryService } from '../createinventory/createinventory.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-createinventory',
  templateUrl: './createinventory.component.html',
  styleUrls: ['./createinventory.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateinventoryComponent implements OnInit {
  formCreateinventory: FormGroup;
  setValue = {
    Createinventory: '',
  };

  dataset;
  forminventory = {
    code_aset: null,
    pic: null,
    departemen: null,
    nama_komputer: null,
    id_merk: null,
    nama_merk: null,
    id_series: null,
    nama_series: null,
    id_kategori: null,
    nama_kategori: null,
    id_prosesor: null,
    nama_prosesor: null,
    id_ram: null, 
    nama_ram: null,
    id_storage:null,
    nama_storage: null,
    id_lokasi: null,
    nama_lokasi: null,
    ip_dhcp: null,
    ip_static: null,
    mac_addres: null,
    serial_number: null,
    serial_key_windows: null,
    cost: null,
    vendor: null,
    tgl_beli: null,
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _inventoryServ: InventoryService,
    private _createinventoryServ: CreateinventoryService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _spinnerServ: NgxSpinnerService
  ) {
    this.dataset = this._actRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.formCreateinventory = this._formBuilder.group({
      code_aset: ['', Validators.required],
      pic: ['', Validators.required],
      departemen: ['', Validators.required],
      nama_komputer: ['', Validators.required],
      id_merk: [''],
      nama_merk: ['', Validators.required],
      id_series: [''],
      nama_series: ['', Validators.required],
      id_kategori: [''],
      nama_kategori: ['', Validators.required],
      id_prosesor: [''],
      nama_prosesor: ['', Validators.required],
      id_ram: [''], 
      nama_ram: ['', Validators.required],
      id_storage: [''],
      nama_storage: ['', Validators.required],
      id_lokasi: [''],
      nama_lokasi: ['', Validators.required],
      ip_dhcp: ['', Validators.required],
      ip_static: ['', Validators.required],
      mac_addres: ['', Validators.required],
      serial_number: ['', Validators.required],
      serial_key_windows: ['', Validators.required],
      cost: ['', Validators.required],
      vendor: ['', Validators.required],
      tgl_beli: ['', Validators.required],
    });
    this.getDataDetail();
  }

  getDataDetail() {
    if (this.dataset !== 'add') {
      this._inventoryServ
        .InventoryRedirectDetail(this.dataset)
        .subscribe((e: any) => {
          this.formCreateinventory.controls['code_aset'].setValue(
            e.code_aset
          );
          this.formCreateinventory.controls['pic'].setValue(
            e.pic
          );
          this.formCreateinventory.controls['departemen'].setValue(
            e.departemen
          );
          this.formCreateinventory.controls['nama_komputer'].setValue(
            e.nama_komputer
          );
          this.formCreateinventory.controls['nama_merk'].setValue(
            e.id_merk
          );
          this.formCreateinventory.controls['nama_series'].setValue(
            e.id_series
          );
          this.formCreateinventory.controls['nama_kategori'].setValue(
            e.id_kategori
          );
          this.formCreateinventory.controls['nama_prosesor'].setValue(
            e.id_prosesor
          );
          this.formCreateinventory.controls['nama_ram'].setValue(
            e.id_ram
          );
          this.formCreateinventory.controls['nama_storage'].setValue(
            e.id_storage
          );
          this.formCreateinventory.controls['nama_lokasi'].setValue(
            e.id_lokasi
          );
          this.formCreateinventory.controls['ip_dhcp'].setValue(
            e.ip_dhcp
          );
          this.formCreateinventory.controls['ip_static'].setValue(
            e.ip_static
          );
          this.formCreateinventory.controls['mac_addres'].setValue(
            e.mac_addres
          );
          this.formCreateinventory.controls['serial_number'].setValue(
            e.serial_number
          );
          this.formCreateinventory.controls['serial_key_windows'].setValue(
            e.serial_key_windows
          );
          this.formCreateinventory.controls['cost'].setValue(
            e.cost
          );
          this.formCreateinventory.controls['vendor'].setValue(
            e.vendor
          );
          this.formCreateinventory.controls['tgl_beli'].setValue(
            e.tgl_beli
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
      const formData = this.formCreateinventory.value;
  
      if (this.dataset === 'add') {
        // Create new data
        const createResponse: any = await this._createinventoryServ
          .createinventoryRedirect(formData)
          // .toPromise();
  
        if (createResponse.token) {
          // await localStorage.setItem('token', createResponse.token);
          await this._router.navigateByUrl('/inventory');
        }
      } else {
        // Update existing data
        formData.id_inventory = this.dataset; // Assuming 'id_kategori' is the ID field
  
        const updateResponse: any = await this._createinventoryServ
          .createinventoryRedirect(formData)
          // .toPromise();
  
        if (updateResponse.token) {
          // await localStorage.setItem('token', updateResponse.token);
          await this._router.navigateByUrl('/inventory');
        }
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
    }
//   }
// }
