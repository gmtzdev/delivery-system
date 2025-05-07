/* Angular */
import { Routes } from "@angular/router";
import { ClientComponent } from "./client.component";
import { LoginClientComponent } from "./views/login-client/login-client.component";
import { loggedGuard } from "./core/guards/logged.guard";

export const routes: Routes = [
    { 
        path: '', 
        component: ClientComponent,
        canActivate: [loggedGuard],
        children: [
            { path: '', component: LoginClientComponent },
        ]
    },
    { 
        path: 'login', 
        component: LoginClientComponent },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
]