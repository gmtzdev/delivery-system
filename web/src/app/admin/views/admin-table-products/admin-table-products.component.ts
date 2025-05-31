import { Component, EnvironmentInjector, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Product, Representative } from '@/domain/product.interface';
import { ProductService } from '@/service/product.service';
import { Tag } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
// import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Slider } from 'primeng/slider';
import { ProgressBar } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-table-products',
  imports: [TableModule, Tag, ButtonModule, InputIcon, IconField, CommonModule, MultiSelectModule, InputTextModule, DropdownModule, Slider, ProgressBar, FormsModule],
  templateUrl: './admin-table-products.component.html',
  styleUrl: './admin-table-products.component.scss'
})
export class AdminTableProductsComponent {
    private readonly environmentInject = inject(EnvironmentInjector); 
    private readonly customerService: ProductService = this.environmentInject.get(ProductService);
    private readonly breadcrumbService: BreadcrumbService = this.environmentInject.get(BreadcrumbService);

    customers!: Product[];

    selectedCustomers!: Product[];

    representatives!: Representative[];

    statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];
    searchValue:any;

    constructor() {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.loading = false;

            this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));
        });

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];


        const items: MenuItem[] = [{ label: 'Products' }, { label: 'All', route: '/admin/products'}]
        this.breadcrumbService.updateBCEmmiter.emit(items);
    }

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warn';

            case 'renewal':
                return null;

            default:
                return null;
        }
    }
}
