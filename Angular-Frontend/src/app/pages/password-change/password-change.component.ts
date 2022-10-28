import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/validators/must-match.validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  today=new Date();
  passwordForm!:FormGroup;

  ngOnInit(): void {
    const data= JSON.parse(localStorage.getItem('loginUser') || '');
    console.log(data);
    this.passwordForm = this.fb.group({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }
    );
  }

  get myForm(){
    return this.passwordForm.controls;
  }

  onClickSave(formValue:any){
    console.log(this.passwordForm.value);
    
    const data:any=localStorage.getItem('loginUser') || '';
    const id=JSON.parse(data)._id;
    console.log(id);
    const token:any =localStorage.getItem('token');
    const payload={
      oldPassword:this.passwordForm.controls['oldPassword'].value,
      newPassword:this.passwordForm.controls['newPassword'].value
    }

      this.authService.passwordChange(id, payload,token).subscribe((res:any) => {
        console.log(res.data);
        this.authService.logout().subscribe((res:any)=>{
          localStorage.removeItem('id');
          localStorage.clear();
          
          this.router.navigateByUrl('/login');

        })
      });
}
}


