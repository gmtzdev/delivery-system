import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';

@Component({
  selector: 'app-admin-home',
  imports: [],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent implements OnInit{
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly breadcrumbService: BreadcrumbService = this.environmentInjector.get(BreadcrumbService);

  ngOnInit(): void {
    const items: MenuItem [] = [{label: 'Home', route: '/admin/home'}];
    this.breadcrumbService.updateBCEmmiter.emit(items);
  }
}
