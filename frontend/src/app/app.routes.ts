import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DonationComponent } from './pages/donation/donation.component';
import { CrisisComponent } from './pages/crisis/crisis.component';
import { VolunteerComponent } from './pages/volunteer/volunteer.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { AccountComponent } from './pages/account/account.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DonationListComponent } from './components/donation-list/donation-list.component';
import { VolunteerListComponent } from './components/volunteer-list/volunteer-list.component';
import { CrisisListComponent } from './components/crisis-list/crisis-list.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'donation',
    component:DonationComponent
  },
  {
    path:'crisis',
    component:CrisisComponent
  },
  {
    path:'volunteer',
    component:VolunteerComponent
  },
  {
    path:'inventory',
    component:InventoryComponent
  },
  {
    path:'account',
    component:AccountComponent
  },
  {
    path:'admin',
    component:AdminComponent,
    children:[
      {
        path:'donation',
        component:DonationListComponent,
      },
      {
        path:'crisis',
        component:CrisisListComponent,
      },
      {
        path:'volunteer',
        component:VolunteerListComponent,
      }
    ]
  }
];
