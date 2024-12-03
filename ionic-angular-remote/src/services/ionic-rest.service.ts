import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IonicRestService {
  User_URL: string = 'https://jsonplaceholder.typicode.com/users';
  Post_URL: string = 'https://jsonplaceholder.typicode.com/posts';
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) {}

  // subscribe
  getStudentList(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.User_URL}/`).pipe(
      tap((Student) => console.log('Student fetched!')),
      catchError(this.handleError<any[]>('Get student', []))
    );
  }

  // addStudent(student: Student): Observable<any> {
  //   return this.http
  //     .post<Student>(`${URL}/`, student, this.httpHeader)
  //     .pipe(catchError(this.handleError<Student>('Add Student')));
  // }

  // promises
  async fetchPosts(): Promise<any> {
    let request = this.httpClient.get(this.Post_URL).pipe(take(2));
    return await lastValueFrom<any>(request);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
