import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTableProductsComponent } from './admin-table-products.component';

describe('AdminTableProductsComponent', () => {
  let component: AdminTableProductsComponent;
  let fixture: ComponentFixture<AdminTableProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTableProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTableProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
