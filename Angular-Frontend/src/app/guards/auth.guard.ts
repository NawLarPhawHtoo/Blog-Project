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
    if (this.authService.loggedInStatus) {
      return true;
    }

    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
//    let val: any = localStorage.getItem('isUserLoggedIn');
//
//    if (val == true) {
//      if (url == "/login") {
//        this.router.parseUrl('/home');
//      } else {
//        return true;
//      }
//    } else {
//      return this.router.parseUrl('/login');
//    }
  }
//    let val:any=localStorage.getItem('isUserLoggedIn');
//    let loggedInUser:any=JSON.parse(localStorage.getItem('loginUser') || '');
//
//    if(val=='true'){
//      if(route.data['roles'] && route.data['roles'].indexOf(loggedInUser.type)=== -1){
//        this.router.navigate(['/']);
//        return false;
//      }
//      return true;
//    }
//    this.router.navigate(['/login'],{queryParams:{returnUrl:url}});
//    return false;
//
//  }
//
//  checkType(url:string):any{
//    let val:any=localStorage.getItem('isUserLoggedIn');
//    let loggedInUser:any=JSON.parse(localStorage.getItem('loginUser') ||'');
//  }

}
