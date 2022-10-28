import { Component, OnInit, NgZone, Inject, Output, EventEmitter, Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { UserListComponent } from '../user-list/user-list.component';
import { Route, Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import { outputAst } from '@angular/compiler';

export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMMM YYYY',
    dateAllyLabel: 'LL',
    monthYearAllyLabel: 'MMMM YYYY',
  },
};

@Injectable()

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }],
})
export class UserCreateComponent implements OnInit {

  profileImage: any;
  imgFile: any;

  isLinear=false;

  today = new Date();
  typeOption = [{ enum: 'Admin' }, { enum: 'User' }];

  gender = [{ enum: 'Male' }, { enum: 'Female' }, { enum: 'Other' }];

  
  skills = [{ enum: 'Programming' }, { enum: 'Language' }, { enum: 'Others' }];

  experiences = [
    { enum: '1 year under' },
    { enum: '1 year' },
    { enum: '1 year above' },
  ];

  constructor(
    public dialogRef: MatDialogRef<UserCreateComponent>,
    public dialog: MatDialog,
    private userService: UserService,
    public fb: FormBuilder,
    private router:Router,
  ) {}

  ngOnInit(): void { }

  userCreateForm=this.fb.group({

    profile: this.fb.control(''),
    
    basic:this.fb.group({
     
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      
    }),
    contact:this.fb.group({
      birthday:this.fb.control(''),
      gender: this.fb.control(''),
      type: this.fb.control(''),
      phone: this.fb.control(''),
      address: this.fb.control(''),    

    }),
    education:this.fb.group({
      skill:this.fb.control('', Validators.required),
      experience:this.fb.control('', Validators.required),
    }),
     
  });

  get basicForm(){
    return this.userCreateForm.get('basic') as FormGroup;
  }

  get contactForm(){
    return this.userCreateForm.get('contact') as FormGroup;
  }

  get educationForm(){
    return this.userCreateForm.get('education') as FormGroup;
  }


addUser(){

  console.log(this.userCreateForm.value);

  let param: any = {...this.userCreateForm.value};
  console.log('param', param);
  
  let data = new FormData();
  data.append('name', param.basic?.name);
  data.append('email', param.basic?.email);
  data.append('password', param.basic?.password);
  data.append('birthday', param.contact?.birthday);
  data.append('gender', param.contact?.gender);
  data.append('address', param.contact?.address);
  data.append('type', param.contact?.type);
  data.append('phone', param.contact?.phone);
  data.append('experience', param.education?.experience);
  data.append('skill', param.education?.skill);
  data.append('profile', this.imgFile);

  this.userService.createUser(data).subscribe(res=>{
    console.log(res);

    this.router.navigateByUrl('/user-list');
  })
  
}

imageUpload(event: any) {
  if (event.target.files && event.target.files[0]) {
    const file = event?.target?.files[0];

    this.imgFile = file;
    console.log(this.imgFile.name);

    const reader = new FileReader();
    reader.onload = (e) => (this.profileImage = reader.result);
    reader.readAsDataURL(file);
  }
}

get myForm() {
      return (
        this.basicForm.controls ||
        this.contactForm.controls ||
        this.educationForm.controls
      );
    }
}


