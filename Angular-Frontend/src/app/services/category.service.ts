import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl:string= 'http://localhost:8000/api/category';

  constructor(private httpClient:HttpClient) { }

  getCategories(){
    return this.httpClient.get<Category[]>(`${this.apiUrl}`);
  }

  getCategory(id:string):Observable<Category> {
    return this.httpClient.get<Category>(`${this.apiUrl}/read/${id}`);
  }


  //create
  addCategory(data:Category|any): Observable<any>{
    let API_URL = `${this.apiUrl}/create`;
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleError));

  }

 // Update
 updateCategory(id: string, data: any) {
  return this.httpClient.put(`${this.apiUrl}/update/${id}`, data)
    .pipe(retry(3), catchError(this.handleError));
}


// Delete
deleteCategory(id: any) {
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
