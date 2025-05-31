import { EventEmitter, Injectable, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  constructor() { }

  @Output() updateBCEmmiter: EventEmitter<MenuItem[]> = new EventEmitter();
}
