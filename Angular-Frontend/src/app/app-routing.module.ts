import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryDetailsComponent } from './components/category/category-details/category-details.component';
import { CategoryAddComponent } from './components/category/category-add/category-add.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';
import { PostComponent } from './components/post/post.component';
import { PostDetailsComponent } from './components/post/post-details/post-details.component';
import { PostAddComponent } from './components/post/post-add/post-add.component';
import { PostEditComponent } from './components/post/post-edit/post-edit.component';
import { AuthGuard } from './guards/auth.guard';
import { BycategoryComponent } from './components/bycategory/bycategory.component';
import { DetailsComponent } from './components/details/details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ForgotPasswordUpdateComponent } from './pages/forgot-password-update/forgot-password-update.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

const routes: Routes = [
  {
    path:'',pathMatch:'full',redirectTo:'/home'
  },
  {
    path: 'home', component: HomeComponent,
    data:{title:'Blog Home'}
  },
  {
    path: 'bycategory/:id',
    component: BycategoryComponent,
    data: { title: 'Post by Category' }
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    data: { title: 'Show Post Details' }
  },
  {
    path:'signup',component: SignupComponent
  },
  {
    path:'login',component: LoginComponent
  },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path:'forgot-password-update',
    component: ForgotPasswordUpdateComponent
  },
  { 
    path: 'password-change/:id',
    component: PasswordChangeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-edit/:id',
    canActivate: [AuthGuard],
    component: ProfileEditComponent
  },
  
  {
    path: 'user-create',
    canActivate: [AuthGuard],
    component: UserCreateComponent,
  },
  {
    path: 'user-list',
    canActivate: [AuthGuard],
    component: UserListComponent,
  },
  {
    path: 'user-edit/:id',
    canActivate: [AuthGuard],
    component: UserEditComponent,
  },
  {
    path: 'user-details/:id',
    canActivate: [AuthGuard],
    component: UserDetailsComponent
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuard],
    data: { title: 'Category' }
  },
  {
    path: 'category/details/:id',
    component: CategoryDetailsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Category Details' }
  },
  {
    path: 'category/add',
    component: CategoryAddComponent,
    canActivate: [AuthGuard],
    data: { title: 'Category Add' }
  },
  {
    path: 'category/edit/:id',
    component: CategoryEditComponent,
    canActivate: [AuthGuard],
    data: { title: 'Category Edit' }
  },
  {
    path: 'post',
    component: PostComponent,
    canActivate: [AuthGuard],
    data: { title: 'Post' }
  },
  {
    path: 'post/details/:id',
    component: PostDetailsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Post Details' }
  },
  {
    path: 'post/add',
    component: PostAddComponent,
    canActivate: [AuthGuard],
    data: { title: 'Post Add' }
  },
  {
    path: 'post/edit/:id',
    component: PostEditComponent,
    canActivate: [AuthGuard],
    data: { title: 'Post Edit' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
