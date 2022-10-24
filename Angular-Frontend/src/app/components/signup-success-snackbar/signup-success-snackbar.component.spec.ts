import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSuccessSnackbarComponent } from './signup-success-snackbar.component';

describe('SignupSuccessSnackbarComponent', () => {
  let component: SignupSuccessSnackbarComponent;
  let fixture: ComponentFixture<SignupSuccessSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupSuccessSnackbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupSuccessSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
