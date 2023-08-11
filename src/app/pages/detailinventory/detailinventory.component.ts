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
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detailinventory',
  templateUrl: './detailinventory.component.html',
  styleUrls: ['./detailinventory.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailinventoryComponent implements OnInit {
  formDetailinventory: FormGroup;
  setValue = {
    Detailinventory: '',
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
    private _actRoute: ActivatedRoute,
    private _spinnerServ: NgxSpinnerService
  ) {
    this.dataset = this._actRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.formDetailinventory = this._formBuilder.group({
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
          this.formDetailinventory.controls['code_aset'].setValue(
            e.code_aset
          );
          this.formDetailinventory.controls['pic'].setValue(
            e.pic
          );
          this.formDetailinventory.controls['departemen'].setValue(
            e.departemen
          );
          this.formDetailinventory.controls['nama_komputer'].setValue(
            e.nama_komputer
          );
          this.formDetailinventory.controls['nama_merk'].setValue(
            e.id_merk
          );
          this.formDetailinventory.controls['nama_series'].setValue(
            e.nama_series
          );
          this.formDetailinventory.controls['nama_kategori'].setValue(
            e.nama_kategori
          );
          this.formDetailinventory.controls['nama_prosesor'].setValue(
            e.nama_prosesor
          );
          this.formDetailinventory.controls['nama_ram'].setValue(
            e.nama_ram
          );
          this.formDetailinventory.controls['nama_storage'].setValue(
            e.nama_storage
          );
          this.formDetailinventory.controls['nama_lokasi'].setValue(
            e.nama_lokasi
          );
          this.formDetailinventory.controls['ip_dhcp'].setValue(
            e.ip_dhcp
          );
          this.formDetailinventory.controls['ip_static'].setValue(
            e.ip_static
          );
          this.formDetailinventory.controls['mac_addres'].setValue(
            e.mac_addres
          );
          this.formDetailinventory.controls['serial_number'].setValue(
            e.serial_number
          );
          this.formDetailinventory.controls['serial_key_windows'].setValue(
            e.serial_key_windows
          );
          this.formDetailinventory.controls['cost'].setValue(
            e.cost
          );
          this.formDetailinventory.controls['vendor'].setValue(
            e.vendor
          );
          this.formDetailinventory.controls['tgl_beli'].setValue(
            e.tgl_beli
          );
        });
      this._spinnerServ.hide();
    }
  }

  goBack(): void {
    window.history.back();
  }

  save() {}

    }
//   }
// }
