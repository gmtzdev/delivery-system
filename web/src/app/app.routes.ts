import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./client/client.routes').then((m) => m.routes) },
    { path: 'admin', loadChildren: () => import('./admin/admin.routes').then((m) => m.routes) }
];
