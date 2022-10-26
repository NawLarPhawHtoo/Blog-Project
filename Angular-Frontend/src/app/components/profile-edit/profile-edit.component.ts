import { Component, Inject, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  profileEditForm!: FormGroup;
  confirmView:boolean= false;
  profileImage:any;

  userData:any;
  imgFile:any;

  public userID: any;

  typeOption = [{ enum: 'Admin' }, { enum: 'User' }];
  
  gender = [{ enum: 'Male' }, { enum: 'Female' }, { enum: 'Other' }];


  skills = [{ enum: 'Programming' }, { enum: 'Language' }, { enum: 'Others' }];

  experiences = [
    { enum: '1 year under' },
    { enum: '1 year' },
    { enum: '1 year above' },
  ];


  constructor(
    private dialogRef: MatDialogRef<ProfileEditComponent>,
    private router:Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // const id=this.route.snapshot.params['id'];
    // this.profileEditForm=this.fb.group({
    //   profile:[''],
    //   basic:this.fb.group({
    //     name:[''],
    //     email:['']

    //   }),
    //   contact:this.fb.group({
    //     type:[''],
    //     birthday:[''],
    //     gender:[''],
    //     phone:[''],
    //     address:['']
    //   }),
    //   education:this.fb.group({
    //     skill:[''],
    //     experience:['']
    //   })

    // });

    // const payload={};
    // this.userService.findUser(payload,id).subscribe((res:any)=>{
    //   this.userData=res.data;
    //   console.log(this.userData);

    //   if(this.userData){
    //     this.profileEditForm.controls['name'].setValue(this.userData.basic.name);
    //     this.profileEditForm.controls['email'].setValue(this.userData.basic.email);
    //     this.profileEditForm.controls['type'].setValue(this.userData.contact.type);
    //     this.profileEditForm.controls['birthday'].setValue(this.userData.contact.birthday);
    //     this.profileEditForm.controls['gender'].setValue(this.userData.contact.gender);
    //     this.profileEditForm.controls['address'].setValue(this.userData.contact.address);
    //     this.profileEditForm.controls['phone'].setValue(this.userData.contact.phone);
    //     this.profileEditForm.controls['skill'].setValue(this.userData.education.skill);
    //     this.profileEditForm.controls['experience'].setValue(this.userData.education.experience);
    //     this.profileImage='http://localhost:8000/'+this.userData.profile;
    //   }
    // })
   }

  ngOnInit(): void {
    console.log(this.data);
    const id:string=this.route.snapshot.params['id'];
    const payload={};
    this.userService.findUser(payload,id).subscribe((res:any)=>{
      this.userData=res.data;
      console.log(this.userData);
    });

    const data:any=localStorage.getItem('loginUser') || '';
    this.userID=JSON.parse(data);
    console.log(this.userID);

  }

  //form control
  get myForm(){
    return this.profileEditForm.controls;
  }

  //update profile
  public updateProfile(){
    const id:string= this.route.snapshot.params['id'];

    const formData:any=new FormData();
    formData.append('name', this.profileEditForm.value.basic.name);
    formData.append('email', this.profileEditForm.value.basic.email);
    formData.append('password',  this.profileEditForm.value.basic.password);
    formData.append('birthday',this.profileEditForm.value.contact.birthday);
    formData.append('gender', this.profileEditForm.value.contact.gender);
    formData.append('address', this.profileEditForm.value.contact.address);
    formData.append('type', this.profileEditForm.value.contact.type);
    formData.append('phone', this.profileEditForm.value.contact.phone);
    formData.append('experience', this.profileEditForm.value.education.experience);
    formData.append('skill', this.profileEditForm.value.education.skill);
    formData.append('profile', this.imgFile) && this.imgFile;

    this.userService.updateUser(formData,id).subscribe((res:any)=>{
      console.log(res);

    });

  }

  imageUpload(event:any){
    if(event.target.files && event.target.files[0]){
      const file = event.target.files[0];
      this.imgFile=file;

      const reader=new FileReader();
      reader.onload=e=>this.profileImage=reader.result;
      reader.readAsDataURL(file);
    }
  }

}
