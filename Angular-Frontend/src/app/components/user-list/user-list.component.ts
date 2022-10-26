import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { MatSort,Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { UserDeleteConfirmDialogComponent } from '../user-delete-confirm-dialog/user-delete-confirm-dialog.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit,AfterViewInit{

  users: any;
  console = console;
  displayedColumns: string[] = [
    'profile',
    'name',
    'email',
    'birthday',
    'gender',
    'phone',
    'address',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>();
  // loggedInUser: any;
  actualPaginator?:MatPaginator;
  currentPage=0;
  totalSize=0;
  pageSize=5;
  pageOptions=[5,10,15];

  public dataSubject:any=null;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort=new MatSort();

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.dataSubject=this.userService.dataSubject;
  }

  ngOnInit(): void {
    this.getUsers();
  }
 
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getUsers() {
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe((res: any) => {
      console.log(res);
      this.users=res.data;
      this.dataSource = new MatTableDataSource<any>(this.users);
      // this.dataSource.next(this.dataSource);
      // console.log(this.users)  
      this.dataSource.paginator= this.paginator;
      this.totalSize=this.users.length;
    });
  }

  deleteUser(id: any, i: any) {
    console.log(id);
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe((res) => {
        this.users.splice(i, 1);
      });
    }
  }

  public doFilter = (target: any) => {
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
  }
  
  openUpdateDialog(element: any) {
    const dialogRef = this.dialog.open(UserEditComponent, { data: element });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'update') this.getUsers();
    });
  }
  openDeleteDialog(element: any) {
    const dialogRef = this.dialog.open(UserDeleteConfirmDialogComponent, { data: element });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'delete') this.getUsers();
    })
  }
}
