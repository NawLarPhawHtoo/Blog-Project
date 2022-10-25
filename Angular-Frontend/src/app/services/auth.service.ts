import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaderResponse } from '@angular/common/http';
import { catchError, lastValueFrom, Observable, retry, tap, throwError } from 'rxjs';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();
  loggedInStatus: any;
  redirectUrl: any;

  constructor(private http:HttpClient) { }

  apiUrl="http://localhost:8000/api";

  isUserLoggedIn: boolean = false;

  login(email: string, password: string) {
    const data = {
      "email": email,
      "password": password
    }

    return this.http.post(`${this.apiUrl}/login`, data)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

 signup(name:string,email:string,password:string){
  const body={
    "name":name,
    "email":email,
    "password":password
  }
   return this.http.post(`${this.apiUrl}/signup`, body)
  .pipe(retry(3), catchError(this.httpErrorHandler));
 }

  logout(): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/logout`, {})
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
 
  public forgetPassword(payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${this.apiUrl}/forgot-password`, payload));
  }

  public resetPasswordUpdate(id: string, token: string, payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${this.apiUrl}/password-reset-update/${id}/${token}`, payload));
  }

  public passwordChange(id: string, payload: any, token: string): Promise<any> {
    return lastValueFrom(this.http.post(`${this.apiUrl}/password-change/${id}/${token}`, payload));
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

}
