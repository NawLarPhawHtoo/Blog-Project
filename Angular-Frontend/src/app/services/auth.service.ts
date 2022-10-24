import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaderResponse } from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();
  loggedInStatus: any;
  redirectUrl: any;

  constructor(private http:HttpClient) { }

  loginUrl="http://localhost:8000/api";
  signupUrl="http://localhost:8000/api";

  isUserLoggedIn: boolean = false;

  login(email: string, password: string) {
    const data = {
      "email": email,
      "password": password
    }

    return this.http.post(`${this.loginUrl}/login`, data)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

 signup(name:string,email:string,password:string){
  const body={
    "name":name,
    "email":email,
    "password":password
  }
   return this.http.post(`${this.signupUrl}/signup`, body)
  .pipe(retry(3), catchError(this.httpErrorHandler));
 }


 private httpErrorHandler(error:HttpErrorResponse){
  if(error.error instanceof HttpErrorResponse) {
    console.error("A client side error occurred. The error message is: " + error.error.message);
  }else{
    alert("User name , password wrong!");
    console.error(" A server side error occurred. The error message is: " + error.error.message);
  }
  return throwError ("Error occurred");
}

  logout(): Observable<any>{
    return this.http.post<any>(`${this.loginUrl}/logout`, {})
      .pipe(
        tap(_ => {
          this.isLoggedIn.emit(false);
          this.isUserLoggedIn = false;
          localStorage.removeItem('isUserLoggedIn');
          localStorage.removeItem('loginUser');
        }),
        catchError(this.httpErrorHandler)
      );
  }
  //logout() {
  //  this.isUserLoggedIn = false;
  //  localStorage.removeItem('isUserLoggedIn');
  //  localStorage.removeItem('token');
  //  localStorage.removeItem('loginUser');
  //}

}
