import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordUpdateComponent } from './forgot-password-update.component';

describe('ForgotPasswordUpdateComponent', () => {
  let component: ForgotPasswordUpdateComponent;
  let fixture: ComponentFixture<ForgotPasswordUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
