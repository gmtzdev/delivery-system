import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

import { AvatarModule } from 'primeng/avatar';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, Toolbar, ButtonModule, SplitButton, InputTextModule, IconField, InputIcon, AvatarModule, Menubar, BadgeModule, CommonModule]
})
export class AppComponent {
  title = 'web-delivery';

  // items: MenuItem[] | undefined;

  //   ngOnInit() {
  //       this.items = [
  //           {
  //               label: 'Update',
  //               icon: 'pi pi-refresh'
  //           },
  //           {
  //               label: 'Delete',
  //               icon: 'pi pi-times'
  //           }
  //       ];


  //       // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  //       document.documentElement.classList.toggle(
  //         'my-app-dark',
  //         (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  //       )
  //   }

  //   public toggle: boolean = false;
  //   setLight(){
  //     console.log('si pasaa')
  //     document.documentElement.classList.toggle(
  //       'my-app-dark', this.toggle
  //       // (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  //     )
  //     this.toggle = !this.toggle;
  //   }




    items: MenuItem[] | undefined;
    items2: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home'
            },
            {
                label: 'Features',
                icon: 'pi pi-star'
            },
            {
                label: 'Projects',
                icon: 'pi pi-search',
                items: [
                    {
                        label: 'Components',
                        icon: 'pi pi-bolt'
                    },
                    {
                        label: 'Blocks',
                        icon: 'pi pi-server'
                    },
                    {
                        label: 'UI Kit',
                        icon: 'pi pi-pencil'
                    },
                    {
                        label: 'Templates',
                        icon: 'pi pi-palette',
                        items: [
                            {
                                label: 'Apollo',
                                icon: 'pi pi-palette'
                            },
                            {
                                label: 'Ultima',
                                icon: 'pi pi-palette'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope'
            }
        ]

        this.items2 = [
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
