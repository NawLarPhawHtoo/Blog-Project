import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { SignupSuccessSnackbarComponent } from 'src/app/components/signup-success-snackbar/signup-success-snackbar.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  name!:string;
  email!:string;
  password!:string;
  formData!:FormGroup;
  message!:string;
  durationInSeconds=5;

  public showPassword:boolean = false;

  constructor(private authService:AuthService,private router:Router,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.formData = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    });
  }

  onClickSignup(data:any): void {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;

    this.authService.signup(this.name, this.email, this.password).subscribe((res:any) => {
      this.message = res.message;
      if(this.message=='Created User Successfully!'){
        this.snackBar.openFromComponent(SignupSuccessSnackbarComponent,{
          duration:this.durationInSeconds * 1000
        });
      }
      this.router.navigate(['/login']);
    });

  }


  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
