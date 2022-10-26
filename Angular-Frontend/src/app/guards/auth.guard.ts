import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService:AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree{
    let url: string = state.url;

    return this.checkLogin(url);

  }
  checkLogin(url: string): any{
    let val:any=localStorage.getItem('isUserLoggedIn');

    if(val=='true'){
      if(url=="/login"){
        this.router.navigate(['/home']);
        return false;
      }else{
        return true;
      }
    }else{
      return this.router.parseUrl('/login');
    }
  }
}
