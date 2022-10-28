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
  isLinear = false;
  today = new Date();
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
    private router:Router,
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
   
    const data:any=localStorage.getItem('loginUser') || '';
    this.userData=JSON.parse(data);
    console.log(this.userData);

    const profile=this.userData.profile;
    console.log(profile);
    const name=this.userData.basic.name;
    console.log(name);
    const email=this.userData.basic.email;
    const password=this.userData.basic.password;

    const birthday=this.userData.contact.birthday;
    const gender=this.userData.contact.gender;
    const phone=this.userData.contact.phone;
    const address=this.userData.contact.address;
    const type=this.userData.contact.type;

    const skill=this.userData.education.skill;
    const experience=this.userData.education.experience;

    this.profileEditForm = this.fb.group({
      profile:[this.userData.profile],

      basic: this.fb.group({
        name: [name],
        email:[email],
        password:[password],
        // confirmPwd: this.fb.control('', Validators.required),
      }),
      contact: this.fb.group({
        birthday: [birthday],
        gender: [gender],
        type:[type],
        phone: [phone],
        address: [address],
      }),
      education: this.fb.group({
        skill:[skill],
        experience: [experience]
      }),
    });
  }

  //form control
  get myForm(){
    return this.profileEditForm.controls;
  }

  get basicForm() {
    return this.profileEditForm.get('basic') as FormGroup;
  }

  get contactForm() {
    return this.profileEditForm.get('contact') as FormGroup;
  }

  get educationForm() {
    return this.profileEditForm.get('education') as FormGroup;
  }

  //update profile
   updateProfile(){
    const data:any=localStorage.getItem('loginUser') || '';
    this.userData=JSON.parse(data);
    const id=this.userData._id;
    console.log(id);
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
    this.imgFile && formData.append('profile', this.imgFile);

    this.userService.updateUser(id,formData).subscribe((res:any)=>{
      console.log(res.data);
      this.router.navigateByUrl('/user-list');
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
