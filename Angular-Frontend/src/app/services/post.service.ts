import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, retry, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiUrl:string = 'http://localhost:8000/api/posts';

  constructor(private httpClient: HttpClient) { }

  getPosts():Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.apiUrl}`);
  }

  getPost(id:any):Observable<Post> {
    return this.httpClient.get<Post>(`${this.apiUrl}/read/${id}`);
  }


  //create
  addPost(data:Post|any): Observable<any>{
    let API_URL = `${this.apiUrl}/create`;
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleError));
  }

 // Update
 updatePost(id: string, data: any) {
  return this.httpClient.put(`${this.apiUrl}/update/${id}`, data)
    .pipe(retry(3), catchError(this.handleError));
}

// Delete
deletePost(id: any) {
  return this.httpClient.delete(`${this.apiUrl}/delete/${id}`)
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
