import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password-update',
  templateUrl: './forgot-password-update.component.html',
  styleUrls: ['./forgot-password-update.component.scss']
})
export class ForgotPasswordUpdateComponent implements OnInit {
  forgetPasswordUpdateForm!: FormGroup;
  public passwordMatch:boolean=true;
  public errorMessage:string='';
  public userId:string='';
  public token:string='';

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.userId=this.route.snapshot.params['userId'];
    this.token=this.route.snapshot.params['token'];

    this.forgetPasswordUpdateForm=new FormGroup({
      password: new FormControl('',Validators.required),
      confirmPassword: new FormControl('',Validators.required)
    });
  }

  public resetPassword(){
    if (this.forgetPasswordUpdateForm.controls['password'].value && this.forgetPasswordUpdateForm.controls['confirmPassword'].value &&
    this.forgetPasswordUpdateForm.controls['password'].value !== this.forgetPasswordUpdateForm.controls['confirmPassword'].value) {
    this.errorMessage = "Password and Password confirmation are not matched";
  } else {
    const payload = {
      password: this.forgetPasswordUpdateForm.controls['password'].value
    }
    this.authService.resetPasswordUpdate(this.userId, this.token, payload)
    this.router.navigate(['/login', {resetEmail: 'success'}]);
  }
  }

  public onClear = () => {

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.forgetPasswordUpdateForm.controls[controlName].hasError(errorName);
  }

}
