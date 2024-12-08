import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { LandingComponent } from './components/landing/landing.component';
import { authorizedUsers } from './AuthGuards/authorizedUsers.guard';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { unauthorizedUsers } from './AuthGuards/unauthorizedUsers.guard';

export const routes: Routes = [
    {
        path: '',
        title: 'Landing Page',
        component: LandingComponent,
        canActivate: [unauthorizedUsers] //authed users still dont see left nav
    },
    {
        path: 'user',
        title: 'Account Management',
        component: RegisterLoginComponent,
        canActivate: [unauthorizedUsers]
    },
    {
        path: 'home',
        title: 'Home',
        component: HomeComponent,
        canActivate: [authorizedUsers]
    },
    {
        path: 'inventory',
        title: 'Inventory',
        component: InventoryComponent,
        canActivate: [authorizedUsers]
    },
    {
        path: 'inventory',
        title: 'Inventory',
        component: InventoryComponent,
        canActivate: [authorizedUsers]
    },
    {
        path: 'list-view',
        title: 'List View',
        component: ListViewComponent,
        canActivate: [authorizedUsers]
    }
];
