import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DashboardTemplateClientComponent } from "./layouts/dashboard-template-client/dashboard-template-client.component";

@Component({
    selector: 'app-client',
    template: `
        <app-dashboard-template-client></app-dashboard-template-client>
        <router-outlet></router-outlet>
    `,
    imports: [RouterOutlet, DashboardTemplateClientComponent]
})
export class ClientComponent implements OnInit{
    ngOnInit(): void {
        console.log('aquii')
    }
}