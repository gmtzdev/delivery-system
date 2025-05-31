import { Component, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';

import { AvatarModule } from 'primeng/avatar';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-template-client',
  templateUrl: './dashboard-template-client.component.html',
  styleUrl: './dashboard-template-client.component.scss',
  imports: [ ButtonModule, InputTextModule, AvatarModule, Menubar, BadgeModule, CommonModule]
})
export class DashboardTemplateClientComponent implements OnInit{

  public items: any[] = [];
  
  ngOnInit(): void {
    this.items = [
      {
          label: 'Home',
          icon: 'pi pi-home',
      },
      {
          label: 'Projects',
          icon: 'pi pi-search',
          badge: '3',
          items: [
              {
                  label: 'Core',
                  icon: 'pi pi-bolt',
                  shortcut: '⌘+S',
              },
              {
                  label: 'Blocks',
                  icon: 'pi pi-server',
                  shortcut: '⌘+B',
              },
              {
                  separator: true,
              },
              {
                  label: 'UI Kit',
                  icon: 'pi pi-pencil',
                  shortcut: '⌘+U',
              },
          ],
      },
  ];
  }
}
