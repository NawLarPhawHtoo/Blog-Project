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
  forgotPasswordUpdateForm!: FormGroup;
  public passwordMatch:boolean=true;
  public errorMessage:string='';
  public userId:string='';
  public token:string='';
  public password:string='';

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.forgotPasswordUpdateForm=new FormGroup({
      userId:new FormControl('',Validators.required),
      token:new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      confirmPassword: new FormControl('',Validators.required)
    });
  }
  
 forgotPasswordUpdate(data:any){
    this.userId=data.userId;
    console.log(this.userId);
    this.token=data.token;
    console.log(this.token);
    this.password=data.password;
    console.log(this.password);

    const payload:any = {
      userId:this.userId,
      token:this.token,
      password: this.password
    }
    console.log(payload);
    this.authService.forgotPasswordUpdate(payload).subscribe((res:any)=>{
      console.log(res);
    })
    this.router.navigate(['/login', {resetEmail: 'success'}]);
  }

  public onClear = () => {

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordUpdateForm.controls[controlName].hasError(errorName);
  }

}
