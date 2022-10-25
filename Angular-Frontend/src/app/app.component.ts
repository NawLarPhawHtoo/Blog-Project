import { Component,OnInit } from '@angular/core';
import { NavigationEnd, Router,Event } from '@angular/router';
import { Category } from './model/category';
import { AuthService } from './services/auth.service';
import { HomeService } from './services/home.service';
import { Role } from './model/role';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmComponent } from './components/logout-confirm/logout-confirm.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Angular-Frontend';
  categories: Category[]|any = [];
  loggedInUser: any;
  isUserLoggedIn: boolean = false;
  isUsers: boolean = false;
  isProfile: boolean=false;

  constructor(
    private homeServie: HomeService,
    private authService: AuthService,
    private router: Router,
    private dialog:MatDialog
  ) { }

  ngOnInit() {
    if (localStorage.getItem('loginUser')) {
      this.loggedInUser = JSON.parse(localStorage.getItem('loginUser') || '');
      console.log(this.loggedInUser.data);
    } else {
      this.loggedInUser = '';
    }

    this.router.events.subscribe((event: Event) => {
      if (localStorage.getItem('loginUser')) {
        this.loggedInUser = JSON.parse(localStorage.getItem('loginUser') || '');
      } else {
        this.loggedInUser = '';
      }

      if (event instanceof NavigationEnd) {
        let storeData = localStorage.getItem('isUserLoggedIn');
        if (storeData == 'true') {
          this.isUserLoggedIn = true;
        } else {
          this.isUserLoggedIn = false;
        }

        let isUsers = localStorage.getItem('isUsers');
        if (isUsers == 'true') {
          this.isUsers = true;
        } else {
          this.isUsers = false;
        }

        let isProfile = localStorage.getItem('isProfile');
        if (isProfile == 'true') {
          this.isProfile = true;
        } else {
          this.isProfile = false;
        }
      }
    });

    this.authService.isLoggedIn.subscribe((status: any) => {
      if (status === true) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
    });
    this.homeServie.getCategories().subscribe((res: any) => {
      this.categories = res.data;
      console.log(this.categories);
    });
  }
  logout() {
    this.authService.logout().subscribe((res: any) => {
      this.router.navigate(['/']);
    });
  }

  get isAdmin() {
    return this.loggedInUser && this.loggedInUser.type === Role.Admin;
  }
  openDialog() {
    const dialogRef = this.dialog.open(LogoutConfirmComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.router.navigate(['/']);
    })
  }
  onClickUsers() {
    localStorage.setItem('isUsers', 'true');
    localStorage.setItem('isProfile', 'false');
  }
  onClickProfile() {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isProfile', 'true');
    this.router.navigateByUrl("/profile");
  }
}
