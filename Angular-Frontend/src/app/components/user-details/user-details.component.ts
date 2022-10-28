import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  userDetails: any;

public profile:any;
  public name!: string;
  public email!: string;
  public password!: string;
  public birthday!: string;
  public gender!: string;
  public type!: string;
  public address!: string;
  public phone!: string;
  public skill!: string;
  public experience!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDetailsComponent,
    private userService: UserService
  ) {}

  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];
    console.log(id);

    this.userService.findUser(id,this.data).subscribe(res=>{
      this.userDetails=res.data;
      console.log(this.userDetails);

      if(this.userDetails){
        this.profile='http://localhost:8000/'+ this.userDetails.profile;
        this.name=this.userDetails.basic.name;
        this.email=this.userDetails.basic.email;
        this.password=this.userDetails.basic.password;
        this.birthday=this.userDetails.contact.birthday;
        this.gender=this.userDetails.contact.gender;
        this.type=this.userDetails.contact.type;
        this.address=this.userDetails.contact.address;
        this.phone=this.userDetails.contact.phone;
        this.skill=this.userDetails.education.skill;
        this.experience=this.userDetails.education.experience;
      }

    })
  }
  cancel() {
    this.dialogRef.close();
  }
  goToList() {
    this.router.navigate(['/user-list']);
  }
}
