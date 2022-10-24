import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router:Router
  ) { }

  loggedInUser: any;
  profileImage: string = '';

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loginUser') || '');
    console.log(this.loggedInUser);
    this.profileImage = `http://localhost:8081/${this.loggedInUser.profile}` || "";
  }

  openUpdateProfileDialog() {
    const dialogRef = this.dialog.open(UserEditComponent, { data: this.loggedInUser });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'update') this.router.navigate(['/logout']);
    })
  }
}
