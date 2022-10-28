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
  forgotPasswordForm!: FormGroup;
  public userInfo:any;
  emailErr="";
  public id:any
  public token:any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

   
    this.forgotPasswordForm = this.fb.group({
      email: new FormControl('', Validators.required)
    });
    this.route.paramMap.subscribe((params:ParamMap)=>{
      if(params.get('forgetPassword') ==="failed"){
        this.emailErr = "Your token has expired. Please try again";
      }
    })
  }

  get forgotForm(){
    return this.forgotPasswordForm.controls;
  }

  public forgotPassword(){
    let payload={
      email:this.forgotPasswordForm.controls['email'].value
    };
    console.log(payload);
    this.authService.forgotPassword(payload).subscribe((res:any)=>{
      console.log(res.data);
      this.emailErr="Email sent with password reset instructions.";
      this.router.navigate(["/forgot-password-update"]);
    }),((err:any)=>{
      this.emailErr="Email does not exist";
    });
  }

}
