import { Injectable } from '@angular/core';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/user';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCreateForm!: FormGroup;
  basicForm!:FormGroup;
  contactForm!: FormGroup;
  educationForm!: FormGroup;
  profileForm!: FormGroup;
  imgFile:any;

  REST_API: string = 'http://localhost:8000/api/users';

  httpHeaders=new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient,public fb:FormBuilder,public router:Router) { 
    this.userCreateForm=this.fb.group({
      basicForm:this.basicForm,
      contactForm:this.contactForm,
      educationForm:this.educationForm,
      // profileForm:this.profileForm,
    })

    this.basicForm=this.fb.group({
      profile:[''],
          name:[''],
          email:[''],
          password:[''],
          confirmPassword:[''],
    });

    this.contactForm=this.fb.group({
      birthday:[''],
      gender:[''],
      type:[''],
      address:[''],
      phone:[''],
    });

    this.educationForm=this.fb.group({
      skill:[''],
      experience:[''],
    });

    this.profileForm=this.fb.group({
      profile:[''],
    });
  }

  public resetForm(){
    this.basicForm=this.fb.group({
      name:[''],
      email:[''],
      password:[''],
      confirmPassword:[''],
    });

    this.contactForm=this.fb.group({
      birthday:[''],
      gender:[''],
      type:[''],
      address:[''],
      phone:[''],
    });

    this.educationForm=this.fb.group({
      skill:[''],
      experience:[''],
    });

    // this.profileForm=this.fb.group({
    //   profile:[''],
    // });

    this.userCreateForm.controls['basicForm']=this.basicForm;
    this.userCreateForm.controls['contactForm']=this.contactForm;
    this.userCreateForm.controls['educationForm']=this.educationForm
    // this.userCreateForm.controls['profileForm']=this.profileForm;
  }

  //get users
  getUsers() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  //create
  createUser(data:User|any): Observable<any>{
    let API_URL = `${this.REST_API}/create`;
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleError));

  }

   // Get single object
   findUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Update
  updateUser(id: string, data: any) {
    return this.httpClient.put(`${this.REST_API}/update/${id}`, data)
      .pipe(retry(3), catchError(this.handleError));
  }


  // Delete
  deleteUser(id: any) {
    return this.httpClient.delete(`${this.REST_API}/delete/${id}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}

