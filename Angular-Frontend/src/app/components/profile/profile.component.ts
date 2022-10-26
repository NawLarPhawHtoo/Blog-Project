import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { Router ,ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loggedInUser: any;
  profileImage: any;
  userData: any;

  public userInfo: any;
  public name!: string;
  public email!: string;
  public type!: string;
  public birthday!:string;
  public gender!: string;
  public phone!: string;
  public address!: string;
  public skill!: string;
  public experience!: string;
  public profile!:string;

  constructor(
    private dialog: MatDialog,
    private router:Router,
    private route:ActivatedRoute,
    private userService:UserService
  ) { }

  

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loginUser') || '');
    // console.log(this.loggedInUser);
    this.profileImage = `http://localhost:8000/${this.loggedInUser.profile}` || "";
    // console.log(this.profileImage);
    const id=this.loggedInUser._id;
    console.log(id);
    const payload:any = {};
    this.userService.findUser(payload,id).subscribe((res:any)=>{
      this.userData=res.data;
      console.log(this.userData);

      if(this.userData){
        this.name=this.userData.basic.name;
        this.email=this.userData.basic.email;
        this.type=this.userData.contact.type;
        this.phone=this.userData.contact.phone;
        this.address=this.userData.contact.address;
        this.gender=this.userData.contact.gender;
        this.birthday=this.userData.contact.birthday;
        this.skill=this.userData.education.skill;
        this.experience=this.userData .education.experience;
      }

    })
    }
    editProfile() {
      const data = localStorage.getItem('loginUser') || "";
      this.userInfo=JSON.parse(data);
      console.log(this.userInfo);
      this.router.navigate(["profile-edit/", this.userInfo._id]);
    }
}
