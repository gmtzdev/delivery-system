import { Component, EnvironmentInjector, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { Breadcrumb } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from 'src/app/core/services/theme.service';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';

@Component({
  selector: 'app-toolbar-admin',
  imports: [Toolbar, Button, Avatar, Breadcrumb, RouterModule, CommonModule],
  templateUrl: './toolbar-admin.component.html',
  styleUrl: './toolbar-admin.component.scss'
})
export class ToolbarAdminComponent {
  private environmentInjector = inject(EnvironmentInjector);
  private themeService: ThemeService = this.environmentInjector.get(ThemeService);
  private readonly breadcrumbService: BreadcrumbService = this.environmentInjector.get(BreadcrumbService);

  public icon = '';

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

    ngOnInit() {
      // Consult the icon to use in toogle button
      this.icon = this.themeService.icon;
        // this.items = [
        //     { label: 'Electronics' },
        //     { label: 'Computer' },
        //     { label: 'Accessories' },
        //     { label: 'Keyboard' },
        //     { label: 'Wireless' }
        // ];

        
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        // this.items = [{ label: 'home', route: '/installation' }, { label: 'Components' }, { label: 'Form' }, { label: 'InputText', route: '/inputtext' }];
        this.items = [{ label: 'Home', route: '/admin/home' }];

        this.breadcrumbService.updateBCEmmiter.subscribe({
          next: (MenuItems: MenuItem[]) => {
            this.items = MenuItems;
          }
        })
    }

    toggleDarkMode() {
      this.themeService.toogleTheme();
      this.icon = this.themeService.icon;
    }
}
