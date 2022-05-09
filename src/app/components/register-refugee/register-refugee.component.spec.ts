import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRefugeeComponent } from './register-refugee.component';

describe('RegisterRefugeeComponent', () => {
  let component: RegisterRefugeeComponent;
  let fixture: ComponentFixture<RegisterRefugeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterRefugeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRefugeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
