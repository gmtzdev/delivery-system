import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { LoginAdminComponent } from "./views/login-admin/login-admin.component";
import { AdminHomeComponent } from "./views/admin-home/admin-home.component";
import { AdminTableProductsComponent } from "./views/admin-table-products/admin-table-products.component";
import { NewProductComponent } from "./views/new-product/new-product.component";

export const routes: Routes = [
    { 
        path: '',
        component: AdminComponent,
        children: [
            // { path: 'login', component: LoginAdminComponent }
            
            // Home
            { path: 'home', component: AdminHomeComponent },
            
            // Products
            { path: 'products', component: AdminTableProductsComponent },
            { path: 'new-product', component: NewProductComponent }
        ]
    },
    {
        path: '',
        redirectTo: '/admin/login',
        pathMatch: 'full'
    }
];