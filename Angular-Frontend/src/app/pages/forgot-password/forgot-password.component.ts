import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgetPasswordForm!: FormGroup;
  emailErr="";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: new FormControl('', Validators.required)
    });
    this.route.paramMap.subscribe((params:ParamMap)=>{
      if(params.get('forgetPassword') ==="failed"){
        this.emailErr = "Your token has expired. Please try again";
      }
    })
  }

  get forgetForm(){
    return this.forgetPasswordForm.controls;
  }

  public forgetPassword(){
    let payload={
      email:this.forgetPasswordForm.controls['email'].value
    };
    this.authService.forgetPassword(payload).then((res:any)=>{
      console.log(res);
      this.emailErr="Email sent with password reset instructions.";
      this.router.navigateByUrl('/forgot-password-update');
    }).catch((err:any)=>{
      this.emailErr="Email does not exist";
    });
  }

}
