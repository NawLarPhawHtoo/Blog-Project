import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 email!: string;
 password!: string;
 formData!: FormGroup;

 public showPassword: boolean = false;

constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.formData=new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

//  onClickLogin(data:any){
//    this.email=data.email;
//    console.log(this.email);
//    this.password=data.password;
//    console.log(this.password);
//
//    this.authService.login(this.email,this.password).subscribe((data:any)=>{
//      console.log(data);
//      localStorage.setItem("isUserLoggedIn","true");
//      localStorage.setItem("token",data.token);
//      localStorage.setItem("loginUser",JSON.stringify(data.users));
//
//      this.router.navigate(['/home']);
//    });
//  }
onClickLogin(data: any) {
  this.email = data.email;
  this.password = data.password;

  this.authService.login(this.email, this.password)
    .subscribe((data: any) => {
      console.log(data);
      localStorage.setItem("isUserLoggedIn", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("loginUser", JSON.stringify(data.users));
      this.router.navigate(['/home']);
    });
}

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

 signup() {
    this.router.navigate(['signup']);
  }

}
