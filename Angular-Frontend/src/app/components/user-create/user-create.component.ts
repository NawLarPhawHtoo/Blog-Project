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
      // confirmPwd: this.fb.control('', Validators.required),
      
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

    // this.outputImage.emit(this.imgFile);

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



  // onSubmit(){
  //   console.log(this.firstFormGroup.value); 
  //   console.log(this.secondFormGroup.value);
  //   console.log(this.thirdFormGroup.value);
  //   console.log(this.imageFormGroup);

  //   const formData= new FormData();
  //   formData.append('form1',this.firstFormGroup.controls['form1'].value);
  //   formData.append('form2',this.secondFormGroup.controls['form2'].value);
  //   formData.append('form3',this.thirdFormGroup.controls['form3'].value);
  //   formData.append('form4',this.imageFormGroup.controls['form3'].value);

  //   this.userService.createUser(formData).subscribe(res=> {
  //     // this.dialogRef.close('create');
  //     this.router.navigateByUrl('/user-list');

  // })
  // }


  // public onClear() {
  //   if (this.confirmView == true) {
  //     this.firstFormGroup.controls['name'].enable();
  //     this.firstFormGroup.controls['email'].enable();
  //     this.firstFormGroup.controls['password'].enable();
  //     this.firstFormGroup.controls['confirmPwd'].enable();
  //     this.firstFormGroup.controls['profile'].enable();
  //     this.secondFormGroup.controls['phone'].enable();
  //     this.secondFormGroup.controls['birthday'].enable();
  //     this.secondFormGroup.controls['gender'].enable();
  //     this.secondFormGroup.controls['address'].enable();
  //     this.secondFormGroup.controls['type'].enable();
  //     this.thirdFormGroup.controls['skill'].enable();
  //     this.thirdFormGroup.controls['experience'].enable();

  //   } else {     this.confirmView = false;

  //     this.firstFormGroup.reset();
  //     this.secondFormGroup.reset();
  //     this.thirdFormGroup.reset();
  //   }
  // }

  // onClickAddUser() {
  //   console.log(this.firstFormGroup.value); 
  //   console.log(this.secondFormGroup.value);
  //   console.log(this.thirdFormGroup.value);
  
  //   const data: any = {...this.firstFormGroup.value, ...this.secondFormGroup.value, ...this.thirdFormGroup.value};
  //   console.log(data);

  //   this.userService.createUser(data).subscribe(res=> {
  //     this.router.navigateByUrl('/user-list');
  //   });
    

  //   if (this.firstFormGroup.valid) {
  //     this.firstFormGroup.controls['name'].disable();
  //     this.firstFormGroup.controls['password'].disable();
  //     this.firstFormGroup.controls['confirmPwd'].disable();
  //     // this.firstFormGroup.controls['profile'].disable();
  //     this.confirmView = true;
  //   }
  //   if (this.secondFormGroup.valid) {
  //     this.secondFormGroup.controls['phone'].disable();
  //     this.secondFormGroup.controls['birthday'].disable();
  //     this.secondFormGroup.controls['gender'].disable();
  //     this.secondFormGroup.controls['address'].disable();
  //     this.secondFormGroup.controls['type'].disable();
  //     this.confirmView = true;
  //   }
  //   if (this.thirdFormGroup.valid) {
  //     this.thirdFormGroup.controls['skill'].disable();
  //     this.thirdFormGroup.controls['experience'].disable();
  //     this.confirmView = true;
  //   }

  // imageUpload(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event?.target?.files[0];

  //     this.imgFile = file;
  //     console.log(this.imgFile.name);

  //     // this.outputImage.emit(this.imgFile);

  //     const reader = new FileReader();
  //     reader.onload = (e) => (this.profileImage = reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // }
  // }


//   getInfo() {
//     const formData1 = new FormData();
//     formData1.append('profile', this.imgFile);
//     formData1.append('name', this.firstFormGroup.controls['name'].value);
//     formData1.append('email', this.firstFormGroup.controls['email'].value);
//     formData1.append(
//       'password',
//       this.firstFormGroup.controls['password'].value
//     );

//     this.getSecondForm();
//   }

//   getSecondForm() {
//     const formData2 = new FormData();
//     formData2.append('phone', this.secondFormGroup.controls['phone'].value);
//     formData2.append(
//       'birthday',
//       this.secondFormGroup.controls['birthday'].value
//     );
//     formData2.append('gender', this.secondFormGroup.controls['gender'].value);
//     formData2.append('address', this.secondFormGroup.controls['address'].value);
//     formData2.append('type', this.secondFormGroup.controls['type'].value);

//     this.getThirdForm();
//   }

//   getThirdForm() {
//     const formData3 = new FormData();
//     formData3.append('skill', this.thirdFormGroup.controls['skill'].value);
//     formData3.append(
//       'experience',
//       this.thirdFormGroup.controls['experience'].value
//     );

//     this.getImage();
//   }

  // imageUpload(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event?.target?.files[0];

  //     this.imgFile = file;
  //     console.log(this.imgFile.name);

  //     // this.outputImage.emit(this.imgFile);

  //     const reader = new FileReader();
  //     reader.onload = (e) => (this.profileImage = reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // }

//   getImage(){
//     const formData= new FormData();
//     console.log(this.imgFile);  
//     formData.append('profile',this.imgFile);
//  }

//   // receiveImage(img:any){
//   //   this.userService.imgFile=img;

//   // }

//   get myForm() {
//     return (
//       this.firstFormGroup.controls ||
//       this.secondFormGroup.controls ||
//       this.thirdFormGroup.controls ||
//       this.imageFormGroup.controls
//     );
//   }

//   public hasError = (controlName: string, errorName: string) => {
//     return this.firstFormGroup.controls[controlName].hasError(errorName);
//   };

