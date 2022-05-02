import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefugeeDashboardComponent } from './refugee-dashboard.component';

describe('RefugeeDashboardComponent', () => {
  let component: RefugeeDashboardComponent;
  let fixture: ComponentFixture<RefugeeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefugeeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefugeeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
