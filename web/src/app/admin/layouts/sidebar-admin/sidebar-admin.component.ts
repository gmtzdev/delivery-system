import { Component, EnvironmentInjector, inject, ViewChild } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';

@Component({
  selector: 'app-sidebar-admin',
  imports: [
        // Primeng
        DrawerModule, ButtonModule, AvatarModule, MenubarModule, MenuModule, BadgeModule, PanelMenu,
        // Angular
        CommonModule, RouterModule
    ],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.scss'
})
export class SidebarAdminComponent {

    @ViewChild('drawerRef') drawerRef!: Drawer;

    closeCallback(e:any): void {
        this.drawerRef.close(e);
    }

    visible: boolean = false;

    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                icon: 'pi pi-home',
                label: 'Home',
                route: '/admin/home'
            },
            {
                icon: 'pi pi-shopping-cart',
                label: 'Products',
                items: [
                    {
                        label: 'List',
                        icon: 'pi pi-list',
                        expanded: true,
                        route: '/admin/products'
                    },
                    {
                        label: 'New Product',
                        icon: 'pi pi-plus',                        
                        route: '/admin/new-product'
                    }
                ]
            },
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog',
                        shortcut: '⌘+O'
                    },
                    {
                        label: 'Messages',
                        icon: 'pi pi-inbox',
                        badge: '2'
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        shortcut: '⌘+Q'
                    }
                ]
            },
        ];
    }
}
