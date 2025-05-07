import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTemplateClientComponent } from './dashboard-template-client.component';

describe('DashboardTemplateClientComponent', () => {
  let component: DashboardTemplateClientComponent;
  let fixture: ComponentFixture<DashboardTemplateClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTemplateClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTemplateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
