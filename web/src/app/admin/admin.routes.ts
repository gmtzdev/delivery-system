import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { LoginAdminComponent } from "./views/login-admin/login-admin.component";

export const routes: Routes = [
    { 
        path: '',
        component: AdminComponent,
        children: [
            { path: 'login', component: LoginAdminComponent }
        ]
    },
    {
        path: '',
        redirectTo: '/admin/login',
        pathMatch: 'full'
    }
];