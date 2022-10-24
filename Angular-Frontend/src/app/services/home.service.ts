import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,of, throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { Category } from '../model/category';
import { Post } from '../model/post';



@Injectable({
  providedIn: 'root'
})
export class HomeService {

 apiUrl:string = 'http://localhost:8000/api';

  constructor(private httpClient:HttpClient) { }

  getCategories(): Observable<Category[] | any>{
    let API_URL = `${this.apiUrl}/category`;
    return this.httpClient.get<Category[]>(API_URL).pipe(
      tap(_ => console.log('Fetched Categories')),
      catchError(this.handleError)
      );
  }

  getPosts(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getPost(id:string): Observable<Post>{
    return this.httpClient.get<Post>(`${this.apiUrl}/posts/read/${id}`);
  }

  getPostByCategory(id:any): Observable<Post[]>{
    return this.httpClient.get<Post[]>(`${this.apiUrl}/posts/findByCategory/${id}`);
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
