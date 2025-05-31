import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarAdminComponent } from "./layouts/sidebar-admin/sidebar-admin.component";
import { ToolbarAdminComponent } from "./layouts/toolbar-admin/toolbar-admin.component";

@Component({
    selector: 'app-admin',
    template: `
        <div class="dashboard-admin">
            <app-sidebar-admin></app-sidebar-admin>
            <div class="layout-content-wrapper bg-[--main-bg] dark:bg-[--main-dark-bg]">
                <app-toolbar-admin></app-toolbar-admin>
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    styles: `
        .dashboard-admin{
            display: grid;
            grid-template-columns: 15rem 1fr;
        }
        .layout-content-wrapper{
            padding: 0.5rem;
        }
    `,
    imports: [RouterOutlet, SidebarAdminComponent, ToolbarAdminComponent]
})
export class AdminComponent{

}