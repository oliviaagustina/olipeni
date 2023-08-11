import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { InventoryComponent} from '../../pages/inventory/inventory.component';
import { CreateinventoryComponent } from 'src/app/pages/createinventory/createinventory.component';
import { CategoryComponent } from '../../pages/category/category.component';
import { CreatecategoryComponent } from '../../pages/createcategory/createcategory.component';
import { MerkComponent } from '../../pages/merk/merk.component';
import { CreatemerkComponent } from '../../pages/createmerk/createmerk.component';
import { SeriesComponent } from '../../pages/series/series.component';
import { CreateseriesComponent } from '../../pages/createseries/createseries.component';
import { LocationComponent} from '../../pages/location/location.component';
import { CreatelocationComponent} from '../../pages/createlocation/createlocation.component';
import { ProcessorComponent } from '../../pages/processor/processor.component';
import { CreateprocessorComponent } from '../../pages/createprocessor/createprocessor.component';
import { RamComponent } from '../../pages/ram/ram.component';
import { CreateramComponent } from '../../pages/createram/createram.component';
import { StorageComponent } from '../../pages/storage/storage.component';
import { CreatestorageComponent } from '../../pages/createstorage/createstorage.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { DetailinventoryComponent } from '../../pages/detailinventory/detailinventory.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',            component: DashboardComponent },
    { path: 'inventory',            component: InventoryComponent },
    { path: 'createinventory/:id',  component: CreateinventoryComponent },
    { path: 'category',             component: CategoryComponent },
    { path: 'createcategory/:id',   component: CreatecategoryComponent },
    { path: 'merk',                 component: MerkComponent},
    { path: 'createmerk/:id',       component: CreatemerkComponent},
    { path: 'series',               component: SeriesComponent},
    { path: 'createseries/:id',     component: CreateseriesComponent},
    { path: 'location',             component: LocationComponent},
    { path: 'createlocation/:id',   component: CreatelocationComponent},
    { path: 'processor',            component: ProcessorComponent},
    { path: 'createprocessor/:id',  component: CreateprocessorComponent},
    { path: 'ram',                  component: RamComponent},
    { path: 'createram/:id',        component: CreateramComponent},
    { path: 'storage',              component: StorageComponent},
    { path: 'createstorage/:id',    component: CreatestorageComponent},
    { path: 'user-profile',         component: UserProfileComponent},
    { path: 'detailinventory',      component: DetailinventoryComponent}
];
