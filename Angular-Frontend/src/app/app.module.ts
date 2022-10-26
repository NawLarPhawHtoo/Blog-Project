import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CategoryComponent } from './components/category/category.component';

import { UserService } from './services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './pages/login/login.component';
import {MatDatepickerModule} from  '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from  '@angular/material/form-field';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule} from '@angular/material/card';
import {MatListModule} from  '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table' ;
import { MatDialog,MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { UserDeleteConfirmDialogComponent } from './components/user-delete-confirm-dialog/user-delete-confirm-dialog.component';
import { SignupComponent } from './pages/signup/signup.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SignupSuccessSnackbarComponent } from './components/signup-success-snackbar/signup-success-snackbar.component';
import {MatStepperModule} from '@angular/material/stepper';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoryService } from './services/category.service';
import { MaterialModule } from './material/material/material.module';
import { CategoryDetailsComponent } from './components/category/category-details/category-details.component';
import { CategoryAddComponent } from './components/category/category-add/category-add.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';
import { PostComponent } from './components/post/post.component';
import { PostAddComponent } from './components/post/post-add/post-add.component';
import { PostDetailsComponent } from './components/post/post-details/post-details.component';
import { PostEditComponent } from './components/post/post-edit/post-edit.component';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './components/home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { BycategoryComponent } from './components/bycategory/bycategory.component';
import { DetailsComponent } from './components/details/details.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { ProfileComponent } from './components/profile/profile.component';
import { LogoutConfirmComponent } from './components/logout-confirm/logout-confirm.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ForgotPasswordUpdateComponent } from './pages/forgot-password-update/forgot-password-update.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserEditComponent,
    UserListComponent,
    LoginComponent,
    UserDeleteConfirmDialogComponent,
    SignupComponent,
    SignupSuccessSnackbarComponent,
    UserDetailsComponent,
    CategoryComponent,
    CategoryDetailsComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    PostComponent,
    PostAddComponent,
    PostEditComponent,
    PostDetailsComponent,
    HomeComponent,
    BycategoryComponent,
    DetailsComponent,
    ProfileComponent,
    LogoutConfirmComponent,
    LogoutComponent,
    PasswordChangeComponent,
    ForgotPasswordComponent,
    ForgotPasswordUpdateComponent,
    ProfileEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatRadioModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MaterialModule,
    MatMenuModule,
    MatGridListModule,
    CKEditorModule
  ],
  providers: [
    UserService,
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
