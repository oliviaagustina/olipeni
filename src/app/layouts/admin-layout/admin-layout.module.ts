import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { InventoryComponent } from '../../pages/inventory/inventory.component';
import { CategoryComponent } from '../../pages/category/category.component';
import { MerkComponent } from '../../pages/merk/merk.component';
import { SeriesComponent } from '../../pages/series/series.component';
import { LocationComponent } from '../../pages/location/location.component';
import { ProcessorComponent } from '../../pages/processor/processor.component';
import { RamComponent } from '../../pages/ram/ram.component';
import { StorageComponent } from '../../pages/storage/storage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateinventoryComponent } from '../../pages/createinventory/createinventory.component';
import { CreatecategoryComponent } from '../../pages/createcategory/createcategory.component';
import { CreatemerkComponent } from '../../pages/createmerk/createmerk.component';
import { CreateseriesComponent } from '../../pages/createseries/createseries.component';
import { CreatelocationComponent } from '../../pages/createlocation/createlocation.component';
import { CreateprocessorComponent } from '../../pages/createprocessor/createprocessor.component';
import { CreateramComponent } from '../../pages/createram/createram.component';
import { CreatestorageComponent } from '../../pages/createstorage/createstorage.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { DetailinventoryComponent } from '../../pages/detailinventory/detailinventory.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  declarations: [
    DashboardComponent,
    InventoryComponent,
    CreateinventoryComponent,
    CategoryComponent,
    CreatecategoryComponent,
    MerkComponent,
    CreatemerkComponent,
    SeriesComponent,
    CreateseriesComponent,
    LocationComponent,
    CreatelocationComponent,
    ProcessorComponent,
    CreateprocessorComponent,
    RamComponent,
    CreateramComponent,
    StorageComponent,
    CreatestorageComponent,
    UserProfileComponent,
    DetailinventoryComponent 
  ],
})
export class AdminLayoutModule {}
