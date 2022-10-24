import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }],
})
export class UserEditComponent implements OnInit {
  basic: any;
  contact: any;
  education: any;

  constructor(
    private dialogRef: MatDialogRef<UserEditComponent>,
    private userService: UserService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  typeOption = [{ enum: 'Admin' }, { enum: 'User' }];

  profileImage: any = `http://localhost:8000/${this.data.profile}` || '';

  isLinear = false;
  imgFile: any;
  confirmView: Boolean = false;
  _id: any;
  pickDate: any;
  today = new Date();


  gender = [{ enum: 'Male' }, { enum: 'Female' }, { enum: 'Other' }];


  skills = [{ enum: 'Programming' }, { enum: 'Language' }, { enum: 'Others' }];

  experiences = [
    { enum: '1 year under' },
    { enum: '1 year' },
    { enum: '1 year above' },
  ];

  formData!: FormGroup;

  ngOnInit(): void {
    console.log(this.data);
    const id=this.data._id;
    console.log(id);

 const profile=this.data.profile;
 console.log(profile);
    const name=this.data.basic.name;
    console.log(name);
    const email=this.data.basic.email;
    const password=this.data.basic.password;

    const birthday=this.data.contact.birthday;
    const gender=this.data.contact.gender;
    const phone=this.data.contact.phone;
    const address=this.data.contact.address;
    const type=this.data.contact.type;

    const skill=this.data.education.skill;
    const experience=this.data.education.experience;

    this.formData = this.fb.group({
      profile:[this.data.profile],

      basic: this.fb.group({
        name: [name],
        email:[ email],
        password:[password],
        // confirmPwd: this.fb.control('', Validators.required),
      }),
      contact: this.fb.group({
        birthday: [birthday],
        gender: [gender],
        type:[ type],
        phone: [phone],
        address: [address],
      }),
      education: this.fb.group({
        skill:skill,
        experience: experience,
      }),
    });

  }

  onClickUpdateUser() {
    //   if (this.confirmView == true) {
    const id = this.data._id;
    console.log(id);
    console.log(this.formData.value);

    const formData = new FormData();

    formData.append('name', this.formData.value.basic.name);
    formData.append('email', this.formData.value.basic.email);
    formData.append('password',  this.formData.value.basic.password);
    formData.append('birthday',this.formData.value.contact.birthday);
    formData.append('gender', this.formData.value.contact.gender);
    formData.append('address', this.formData.value.contact.address);
    formData.append('type', this.formData.value.contact.type);
    formData.append('phone', this.formData.value.contact.phone);
    formData.append('experience', this.formData.value.education.experience);
    formData.append('skill', this.formData.value.education.skill);
    this.imgFile && formData.append('profile', this.imgFile);

    this.userService.updateUser(id, formData).subscribe(res => {
      console.log(res);
     this.dialogRef.close('update');
    });

  }

  get basicForm() {
    return this.formData.get('basic') as FormGroup;
  }

  get contactForm() {
    return this.formData.get('contact') as FormGroup;
  }

  get educationForm() {
    return this.formData.get('education') as FormGroup;
  }

  imageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.imgFile = file;
      console.log(this.imgFile);
      const reader = new FileReader();
      reader.onload = (e) => (this.profileImage = reader.result);
      reader.readAsDataURL(file);
    }
  }

  get myForm() {
    return this.formData.controls;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  };

  OnDateChange(event: any) {
    this.pickDate = event;
  }

  onCancelClick(): void {
    // this.dialogRef.close();
  }
}
